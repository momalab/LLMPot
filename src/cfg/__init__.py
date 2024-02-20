from os import environ
from pathlib import Path

current_dir = Path(__file__)

if environ.get("GAE_SERVICE"):
    ROOT_DIR = "workspace"
else:
    ROOT_DIR = "ICSPot"

PROJECT_ROOT_DIR = [p for p in current_dir.parents if p.parts[-1] == ROOT_DIR][0]

OUTPUTS_DIR = f"{PROJECT_ROOT_DIR}/outputs"
EXPERIMENTS = f"{PROJECT_ROOT_DIR}/experiments"
CHECKPOINTS = f"{PROJECT_ROOT_DIR}/checkpoints"
LOGS = f"{PROJECT_ROOT_DIR}/logs"
VALIDATION = f"{PROJECT_ROOT_DIR}/validation"
DATASET_DUMPS = f"{OUTPUTS_DIR}/datasets/dumps"
DATASET_PARSED = f"{OUTPUTS_DIR}/datasets/parsed"
