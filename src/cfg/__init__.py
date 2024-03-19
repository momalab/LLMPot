from os import environ
from pathlib import Path
import os

current_dir = Path(__file__)

if environ.get("DOCKER_ENV"):
    ROOT_DIR = "/app/src/"
else:
    ROOT_DIR = "ICSPot"


def find_project_root(current_file):
    root_dir = os.path.dirname(os.path.abspath(current_file))
    while not os.path.exists(os.path.join(root_dir, 'requirements.txt')):
        root_dir = os.path.dirname(root_dir)
        if root_dir == '/':
            raise FileNotFoundError("Could not find the project root.")
    return root_dir


PROJECT_ROOT_DIR = find_project_root(__file__)
print(PROJECT_ROOT_DIR)

OUTPUTS_DIR = f"{PROJECT_ROOT_DIR}/outputs"
EXPERIMENTS = f"{PROJECT_ROOT_DIR}/experiments"
CHECKPOINTS = f"{PROJECT_ROOT_DIR}/checkpoints"
LOGS = f"{OUTPUTS_DIR}/logs"
VALIDATION = f"{OUTPUTS_DIR}/validation_data"
DATASET_DUMPS = f"{OUTPUTS_DIR}/datasets/dumps"
DATASET_PARSED = f"{OUTPUTS_DIR}/datasets/parsed"
DATASET_TRAIN = f"{OUTPUTS_DIR}/datasets/train"
DATASET_TEST = f"{OUTPUTS_DIR}/datasets/test"
DATASET_VAL = f"{OUTPUTS_DIR}/datasets/validation"
