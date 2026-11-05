#!/bin/sh
set -eu
SKILL_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
python3 -m venv "$SKILL_DIR/.venv"
"$SKILL_DIR/.venv/bin/python" -m pip --disable-pip-version-check --cache-dir "$SKILL_DIR/.pip-cache" install --requirement "$SKILL_DIR/requirements.txt"
"$SKILL_DIR/.venv/bin/python" -m pip check
