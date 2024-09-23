import datetime
import os
import time
from typing import List, Optional
from lightning.fabric.plugins.precision.precision import _PRECISION_INPUT

from cfg import CHECKPOINTS, LOGS
from finetune.model.database_model import DatasetModel
from finetune.model.lora import Lora


class TestExperiment:
    experiment: str
    dataset: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)


class FinetunerModel:
    model_type: str
    model_name: str

    experiment: str
    current_dataset: DatasetModel
    datasets: List[DatasetModel]
    experiment_filename: str = ""
    test_experiment: Optional[TestExperiment] = None

    max_epochs: int = 30
    patience: int = 10
    batch_size: int = 8
    target_max_token_len = 512
    source_max_token_len = 512
    precision: _PRECISION_INPUT = "32"
    workers: int = 2

    start_time: float
    start_datetime: str

    checkpoints_dir: str
    log_output_dir: str

    lora: Lora

    accelerator: str = "cuda"
    devices = len(str(os.getenv('CUDA_VISIBLE_DEVICES')).split(",")) if os.getenv('CUDA_VISIBLE_DEVICES') else 1
    strategy: str = "ddp" #"deepspeed_stage_2_offload"

    validation = ["exact", "validator"]

    val_loss_const: str = "val_loss"
    train_loss_const: str = "train_loss"

    def __init__(self, experiment: str, **kwargs):
        for key, value in kwargs.items():
            if key == "datasets":
                self.datasets = [DatasetModel(**x) for x in value]
            elif key == "test_experiment":
                self.test_experiment = TestExperiment(**value)
            else:
                setattr(self, key, value)
        self.checkpoints_dir = CHECKPOINTS
        self.log_output_dir = LOGS
        self.start_time = time.time()
        self.start_datetime = datetime.datetime.fromtimestamp(self.start_time).strftime('%Y%m%dT%H%M')
        self.experiment = experiment
        self.current_dataset = self.datasets[0]

    def __str__(self):
        return f"{self.the_name}_{self.start_datetime}"

    def base_model_id(self):
        return f"{self.model_type}/{self.model_name}"

    @property
    def the_name(self):
        return str(self.current_dataset)

    def get_validation_filename(self, epoch: int, validation_type: str):
        if self.test_experiment:
            path = f"{self.experiment_dataset_result_path}/val_type_{validation_type}-model_{self.current_dataset}.jsonl"
        else:
            path = f"{self.experiment_instance_result_path}/epoch-{epoch}_val_type-{validation_type}.jsonl"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        return path

    @property
    def experiment_model_result_path(self):
        return f"{CHECKPOINTS}/{self.model_name}"

    @property
    def experiment_result_path(self):
        return f"{self.experiment_model_result_path}/{self.experiment}"

    @property
    def experiment_dataset_result_path(self):
        return f"{self.experiment_result_path}/{self.current_dataset}"

    @property
    def experiment_instance_result_path(self):
        return f"{self.experiment_dataset_result_path}/{self.start_datetime}"

    @property
    def experiment_instance_last_result_path(self):
        return f"{self.experiment_instance_result_path}/checkpoint/last.ckpt"

    @property
    def experiment_instance_status_result_path(self):
        return f"{self.experiment_instance_result_path}/interrupted.end"

    @property
    def experiment_csv_metrics_path(self):
        return f"{self.experiment_dataset_result_path}/csv/{self.start_datetime}/metrics.csv"