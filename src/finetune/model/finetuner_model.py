import datetime
import os
import time
from typing import List

from cfg import CHECKPOINTS, LOGS, VALIDATION


class ServerModel:
    name: str
    coils: int = 40
    registers: int = 40

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)


class RangeModel:
    low: int
    high: int

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __str__(self):
        return f"{self.low}_{self.high}"


class DatasetModel:
    protocol: str
    size: int
    client: str
    server: ServerModel = None
    context: int
    functions: List[int] = None
    values: RangeModel = None
    addresses: RangeModel = None
    multi_elements: int = 3

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "values" or key == "addresses":
                setattr(self, key, RangeModel(**value))
            elif key == "server":
                setattr(self, key, ServerModel(**value))
            else:
                setattr(self, key, value)

    def functions_str(self):
        if self.functions:
            return f"{'_'.join([str(x) for x in self.functions])}"
        return ""

    def __str__(self):
        return (f"{self.protocol}-{self.client}-c{self.context}-s{self.size}" +
                (f"-f{self.functions_str()}" if self.functions else "") +
                (f"-v{self.values}" if self.values else "") +
                (f"-a{self.addresses}" if self.addresses else "") +
                (f"-sc{self.server.coils}" if self.server else "") +
                (f"-sr{self.server.registers}" if self.server else "")
                )


class FinetunerModel:
    model_type: str
    model_name: str

    experiment: str
    current_dataset: DatasetModel
    datasets: [DatasetModel]
    test: DatasetModel = None
    experiment_filename: str = None

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
            elif key == "test":
                self.test = DatasetModel(**value)
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
