# Content enrichment instructions

These instructions apply throughout this repository, including every content creation,
expansion, correction, recap, and automated enrichment task.

## Purpose and publication boundary

This Ukrainian encyclopedia documents the lore and plot of the actual-play TTRPG
campaign «Кавалерія: Пісня туманів», as published in this YouTube playlist:
https://www.youtube.com/playlist?list=PL2zoJ5Mco28pMShErqXngbEWYwr65IDCb

Help players and viewers recall the published events of season 1 before season 2.
Season 1 is still being published. Never describe it as complete, assume a finale,
or treat the highest episode number in this checkout as the final episode or proof
of the latest published episode. Verify publication status against the playlist
when updating coverage. Do not invent inaccessible or unpublished episode content.
If verification is unavailable, report that limitation and identify the episodes
actually covered by the work.

## Sources and factual accuracy

- Existing articles take precedence over episode transcripts. Transcripts are
  discovery aids and may contain transcription errors; preserve established names
  and terminology rather than copying conflicting transcript spellings.
- Use the published recordings to verify ambiguous names, numbers, relationships,
  and consequential events. If clearly verified audio conflicts with an existing
  article, flag the discrepancy for user review; do not silently overwrite it.
- Do not use Kavaleriia's rulebook, external setting lore, or other campaigns as
  sources. Include only lore established in this series, keeping the published
  episodes a work in their own right.
- Never invent details to fill gaps. Preserve unknown identities, motives,
  relationships, outcomes, and unresolved mysteries.
- Distinguish established facts from characters' beliefs, rumours, accusations,
  legends, and unreliable accounts. Attribute each account to its speaker or
  source. Do not present interpretations as canon.
- Distinguish audience knowledge from what individual player characters know
  whenever that difference affects the account.
- Distinguish episode order from in-world chronology. Explicitly identify
  flashbacks, recollections, visions, predictions, and historical accounts.
- Add timestamp links to supporting scenes in chronicle entries where practical.
  Verify timestamps against the recording; never guess them. Track unresolved
  evidence and source conflicts in the review report, not as invented facts in
  published prose.

## Language, identity, and structure

- Write all reader-facing content in Ukrainian. Preserve Obsidian Markdown,
  including wikilinks, embeds, frontmatter, and callouts where used.
- Before creating or expanding an article, inspect sibling articles and follow
  their structure, frontmatter conventions, tone, and level of detail, subject to
  these instructions.
- Campaign-specific names and terms absent from a modern Ukrainian dictionary
  must have articles under the appropriate content branch. Familiar words with
  a special in-world meaning also need articles. Ordinary vocabulary does not
  require standalone articles. Do not invent definitions for unexplained terms;
  document only their established context.
- Maintain one canonical article per entity. Search existing titles, aliases,
  and mentions before creating a page. Use frontmatter `aliases` for verified
  alternate names, titles, nicknames, and spellings. Do not make transcription
  errors into canonical names or aliases without verification.
- Link entities to their canonical articles using valid Obsidian wikilinks.
  Preserve existing paths unless a task requires reorganization; update affected
  references when moving or renaming an article.
- Introductions describe the latest established state within the explicitly
  covered published episodes. Chronicles preserve how that state developed.
  Distinguish dead, missing, presumed dead, and unknown. Do not imply that the
  latest known state is the state at a season finale.

## Entity chronicles

Entity articles under `content/cataphract/` and `content/setting/` must contain
the exact level-two heading `## 📅 Хроніка`. Directory landing pages (`index.md`)
are navigation pages and do not need fictional appearance entries.

Use one level-three subsection per episode in which the entity appears or is
meaningfully mentioned, ordered by episode. Use the canonical episode path and
its exact title in the link label, following this form:

```markdown
## 📅 Хроніка

### [[episodes/season01/S01E07|S01E07 Древня лабораторія]]

Опис участі сутності, згадки про неї або встановлених у цьому епізоді змін.
```

Check the actual episode article for its title; the example is not a title
source for other episodes. Describe the entity's involvement, discoveries, and
changes, without duplicating the entire episode recap. Do not fabricate an
appearance to populate a chronicle.

## Episode articles and recaps

- `content/episodes/` contains season directories, with one article per episode
  inside the corresponding season. Keep season landing pages separate from
  episode articles and preserve existing episode identifiers.
- Every episode article must have `## Дивитися`. That section contains only the
  episode's YouTube link, with no commentary, embeds, or additional links.
- Verify that each video belongs to the intended episode in the source playlist.
- Every episode article recounts significant actions and events in sequence,
  including consequential decisions, revelations, conflicts, and outcomes.
  Label noncontemporary scenes and uncertain accounts explicitly.
- Episode recaps describe the episode as a whole; entity chronicles describe
  that entity's involvement. Keep both consistent when enriching either.
- Maintain a season overview in the season landing page when enriching season
  coverage. State its episode coverage explicitly, summarize established story
  arcs, the party's latest known situation and relationship changes, and open
  plot threads, with supporting episode and entity links. Until publication is
  complete and verified, call this an overview of published episodes, not a
  complete season recap. Do not invent resolutions or a finale.

## Enrichment workflow and review

1. Establish the requested episode scope and available sources. Read the existing
   episode and relevant entity articles, plus sibling structure examples.
2. Extract candidate events and entities from the published episode or transcript.
   Reconcile names against existing articles and verify material ambiguities
   against the recording before asserting new facts.
3. Update episode recaps, canonical entity articles and their chronicles, and
   applicable overview coverage together. Preserve uncertainty and attribution.
4. Check changed content for valid links, exact episode titles in chronicle
   headings, duplicate entities or conflicting aliases, missing articles for
   significant introduced terms, source support, and consistent episode coverage.
   Report checks that could not be performed. Run relevant repository checks for
   any code changes; do not claim a full content audit from a successful build.
5. Produce reviewable local changes and a concise report of covered episodes,
   verification performed, unresolved source conflicts, and remaining gaps.
   Do not silently resolve contradictions, publish uncertain claims, or trigger
   deployment as part of enrichment. Publication requires explicit user approval
   of the concrete changes, unless already explicitly authorized in the session.

Apply these requirements to new and edited content. They do not establish that
existing articles have already been audited; avoid unrelated bulk rewrites unless
the user requests them.
