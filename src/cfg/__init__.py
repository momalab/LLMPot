from os import environ
from pathlib import Path

current_dir = Path(__file__)

if environ.get("GAE_SERVICE"):
    ROOT_DIR = "workspace"
else:
    ROOT_DIR = "ICSPot"

PROJECT_ROOT_DIR = [p for p in current_dir.parents if p.parts[-1] == ROOT_DIR][0]
OUTPUTS_DIR = f"{PROJECT_ROOT_DIR}/outputs"
