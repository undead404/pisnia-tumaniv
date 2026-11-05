#!/usr/bin/env python3
"""Cache-first public YouTube captions; network dependency loaded only on a miss."""
import argparse
import hashlib
import importlib.metadata
import json
import re
import sys
import tempfile
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


def video_id(value):
    if re.fullmatch(r'[A-Za-z0-9_-]{11}', value):
        return value
    u = urlsplit(value)
    host = (u.hostname or '').lower()
    if host in ('youtu.be', 'www.youtu.be'):
        candidate = u.path.strip('/')
    elif host in ('youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com'):
        candidate = (parse_qs(u.query).get('v', [''])[0] if u.path == '/watch'
                     else u.path.split('/')[-1] if u.path.startswith(('/shorts/', '/embed/', '/live/')) else '')
    else:
        candidate = ''
    if not re.fullmatch(r'[A-Za-z0-9_-]{11}', candidate):
        raise ValueError('Expected a YouTube video URL or 11-character video ID')
    return candidate


def validate_xml(raw):
    root = ET.fromstring(raw)
    cues = list(root.iter('text')) or list(root.iter('p'))
    text = [c for c in cues if ''.join(c.itertext()).strip()]
    if root.tag not in ('transcript', 'timedtext') or not text:
        raise ValueError('Empty or unrecognized caption payload')
    for cue in text:
        start = float(cue.attrib.get('start', cue.attrib.get('t', '-1')))
        if start < 0:
            raise ValueError('Missing or invalid caption timestamps')
    return len(text)


def cached(base, vid, lang):
    for path in sorted(base.glob('*/metadata.json'), key=lambda p: ('automatic' in p.parent.name, str(p))):
        try:
            m = json.loads(path.read_text())
            if not (m.get('complete') is True and m.get('status') == 'available'
                    and m.get('video_id') == vid and m.get('language') == lang):
                continue
            filename = m['raw_filename']
            if Path(filename).name != filename:
                continue
            raw = (path.parent / filename).read_bytes()
            if hashlib.sha256(raw).hexdigest() != m['sha256']:
                continue
            validate_xml(raw)
            return path
        except (OSError, ValueError, KeyError, TypeError, ET.ParseError):
            continue
    return None


def result(path, hit):
    m = json.loads(path.read_text())
    print(json.dumps({'cache_hit': hit, 'metadata': str(path),
                      'raw': str(path.parent / m['raw_filename']),
                      'segments': m['segments'], 'first_start_seconds': m['first_start_seconds'],
                      'last_end_seconds': m['last_end_seconds']}, ensure_ascii=False))


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('url')
    p.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[4])
    p.add_argument('--language', default='uk')
    p.add_argument('--cache-only', action='store_true')
    p.add_argument('--refresh', action='store_true')
    a = p.parse_args()
    vid = video_id(a.url)
    if not re.fullmatch(r'[A-Za-z0-9-]+', a.language):
        raise ValueError('Invalid language code')
    root = a.root.resolve()
    base = root / '.cache' / 'transcripts' / vid / a.language
    hit = cached(base, vid, a.language)
    if hit and (not a.refresh or a.cache_only):
        result(hit, True)
        return
    if a.cache_only:
        raise ValueError('No valid cached transcript; no network request made')
    try:
        from requests import Session
        from youtube_transcript_api import YouTubeTranscriptApi
    except ImportError:
        raise ValueError('Missing youtube-transcript-api; run this skill’s setup.sh after installation is authorized')

    class CapturingSession(Session):
        raw = None

        def request(self, method, url, **kwargs):
            kwargs.setdefault('timeout', 30)
            response = super().request(method, url, **kwargs)
            parsed = urlsplit(url)
            if parsed.path == '/api/timedtext' and parse_qs(parsed.query).get('v') == [vid]:
                self.raw = response.content
            return response

    with CapturingSession() as session:
        track = YouTubeTranscriptApi(http_client=session).list(vid).find_transcript([a.language])
        fetched = track.fetch(preserve_formatting=True)
        raw = session.raw
    if fetched.video_id != vid or fetched.language_code != a.language or not len(fetched) or not raw:
        raise ValueError('Caption identity or payload validation failed')
    validate_xml(raw)
    snippets = fetched.to_raw_data()
    if any(s['start'] < 0 or s['duration'] < 0 for s in snippets):
        raise ValueError('Invalid caption timing')
    now = datetime.now(timezone.utc)
    # Versioned directories preserve valid earlier sources and failed attempts.
    kind = 'automatic' if track.is_generated else 'manual'
    dest = base / (kind + '-' + now.strftime('%Y%m%dT%H%M%S%fZ'))
    base.mkdir(parents=True, exist_ok=True)
    episode = None
    for article in (root / 'content' / 'episodes').rglob('*.md'):
        if vid in article.read_text():
            episode = str(article.relative_to(root))
            break
    metadata = dict(video_id=vid, source_url='https://www.youtube.com/watch?v=' + vid,
                    episode_article_path=episode or 'unknown', language=a.language,
                    track_identifier=dest.name, automatic=track.is_generated,
                    retrieved_at_utc=now.isoformat(), format='xml',
                    retrieval_tool='youtube-transcript-api',
                    retrieval_tool_version=importlib.metadata.version('youtube-transcript-api'),
                    local_filenames=['captions.xml', 'working.json'], raw_filename='captions.xml',
                    sha256=hashlib.sha256(raw).hexdigest(), status='available', complete=True,
                    completeness_basis='Successful HTTP response, parsed timed captions; audiovisual coverage not independently verified',
                    segments=len(snippets), first_start_seconds=min(s['start'] for s in snippets),
                    last_end_seconds=max(s['start'] + s['duration'] for s in snippets))
    with tempfile.TemporaryDirectory(prefix='.pending-', dir=base) as staging:
        stage = Path(staging) / 'track'
        stage.mkdir()
        (stage / 'captions.xml').write_bytes(raw)
        (stage / 'working.json').write_text(json.dumps(snippets, ensure_ascii=False, indent=2))
        (stage / 'metadata.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2))
        stage.rename(dest)
    result(dest / 'metadata.json', False)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(f'{type(error).__name__}: {error}', file=sys.stderr)
        sys.exit(1)
