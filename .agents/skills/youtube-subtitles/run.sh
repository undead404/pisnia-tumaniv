#!/bin/sh
set -eu
SKILL_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
if [ -x "$SKILL_DIR/.venv/bin/python" ]; then
    exec "$SKILL_DIR/.venv/bin/python" "$SKILL_DIR/scripts/fetch.py" "$@"
fi
exec python3 "$SKILL_DIR/scripts/fetch.py" "$@"
