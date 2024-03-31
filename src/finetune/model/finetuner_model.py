import datetime
import os
import time
from typing import List

from cfg import CHECKPOINTS, LOGS, VALIDATION


class RangeModel:
    low: int
    high: int

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __str__(self):
        return f"({self.low}-{self.high})"


class DatasetModel:
    protocol: str
    size: int
    client: str
    server: str
    context: int
    functions: List[int]
    values: RangeModel
    addresses: RangeModel

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "values" or key == "addresses":
                setattr(self, key, RangeModel(**value))
            else:
                setattr(self, key, value)

    def functions_str(self):
        return f"({','.join([str(x) for x in self.functions])})"

    def __str__(self):
        return f"{self.protocol}_{self.client}_c{self.context}_f{self.functions_str()}_v{self.values}_a{self.addresses}_s{self.size}"


class FinetunerModel:
    model_type: str
    model_name: str

    experiment: str
    current_dataset: DatasetModel
    datasets: [DatasetModel]

    max_epochs: int = 30
    patience: int = 10
    batch_size: int = 8
    target_max_token_len = 512
    source_max_token_len = 512
    precision: int = 32
    workers: int = 2

    start_time: float
    start_datetime: str

    checkpoints_dir: str
    log_output_dir: str

    accelerator = "gpu"

    validation = "both"

    lora: bool = False
    quantization: bool = False

    val_loss_const: str = "val_loss"
    train_loss_const: str = "train_loss"

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "datasets":
                self.datasets = [DatasetModel(**x) for x in value]
            else:
                setattr(self, key, value)
        self.checkpoints_dir = CHECKPOINTS
        self.log_output_dir = LOGS
        self.start_time = time.time()
        self.start_datetime = datetime.datetime.fromtimestamp(self.start_time).strftime('%Y%m%dT%H%M')

    def __str__(self):
        return f"{self.the_name}_{self.start_datetime}"

    def base_model_id(self):
        return f"{self.model_type}/{self.model_name}"

    @property
    def the_name(self):
        return self.current_dataset.__str__()

    def get_validation_filename(self, epoch, validation_type):
        os.makedirs(os.path.dirname(f"{VALIDATION}/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"), exist_ok=True)
        return f"{VALIDATION}/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"
