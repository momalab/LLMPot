import datetime
import os
import time
from typing import List, Optional

from cfg import CHECKPOINTS, LOGS


class ServerModel:
    name: str
    coils: Optional[int]
    registers: Optional[int]
    markers: Optional[int]
    datablock: Optional[int]

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)


class RangeModel:
    low: int = 0
    high: int = 15999 #65535

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
    values = RangeModel()
    addresses = RangeModel()
    multi_elements: int = 3

    has_addresses: bool = False
    has_values: bool = False

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "values":
                setattr(self, key, RangeModel(**value))
                self.has_values = True
            elif key == "addresses":
                setattr(self, key, RangeModel(**value))
                self.has_addresses = True
            elif key == "server":
                setattr(self, key, ServerModel(**value))
            else:
                setattr(self, key, value)

    def functions_str(self, separator="_"):
        if self.functions:
            return f"{separator.join([str(x) for x in self.functions])}"
        return ""

    def __str__(self):
        return (f"{self.protocol}-{self.client}-c{self.context}-s{self.size}" +
                (f"-f{self.functions_str()}" if self.functions else "") +
                (f"-v{self.values}" if self.has_values else "") +
                (f"-a{self.addresses}" if self.has_addresses else "") +
                (f"-sc{self.server.coils}" if hasattr(self.server, "coils") else "") +
                (f"-sr{self.server.registers}" if hasattr(self.server, "registers") else "") +
                (f"-sc{self.server.markers}" if hasattr(self.server, "markers") else "") +
                (f"-sr{self.server.datablock}" if hasattr(self.server, "datablock") else "")
                )


class TestExperiment:
    experiment: str
    dataset: str
    start_datetime: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)


class FinetunerModel:
    model_type: str
    model_name: str

    experiment: str
    current_dataset: DatasetModel
    datasets: [DatasetModel]
    experiment_filename: str = None
    test_experiment: Optional[TestExperiment] = None

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
            elif key == "test_experiment":
                self.test_experiment = TestExperiment(**value)
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

    def get_validation_filename(self, epoch: int, validation_type: str):
        if self.test_experiment:
            path = (f"{CHECKPOINTS}/{self.test_experiment.experiment}/{self.test_experiment.dataset}"
                    f"/val_type_{validation_type}-model_{self.current_dataset.__str__()}.jsonl")
        else:
            path = f"{CHECKPOINTS}/{self.experiment}/{self.the_name}/{self.start_datetime}/epoch-{epoch}_val_type-{validation_type}.jsonl"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        return path

    @property
    def s7comm_args(self):
        return self.current_dataset.server.markers, self.current_dataset.server.datablock

    @property
    def mbtcp_args(self):
        return self.current_dataset.server.coils, self.current_dataset.server.registers
