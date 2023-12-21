import datetime
import os

import cfg


class FinetunerModel:
    model_type: str
    model_name: str
    dataset_filename: str
    epochs: int
    epoch: str = None
    precision: int
    workers: int
    start_time: float
    start_datetime: str
    output_dir: str
    log_output_dir: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "start_datetime":
                self.start_datetime = value
                self.start_time = datetime.datetime.strptime(value, '%Y%m%dT%H%M').timestamp()
            setattr(self, key, value)
        self.checkpoints_dir = f"{cfg.OUTPUTS_DIR}/checkpoints"
        self.output_dir = f"{cfg.OUTPUTS_DIR}/models/{self.__str__()}"
        if self.epoch is not None:
            self.output_dir = self.output_dir + f"/epoch-{self.epoch}"
        self.log_output_dir = f"{cfg.OUTPUTS_DIR}/logs"

    def __str__(self):
        return (f"{self.the_name}_"
                f"{datetime.datetime.fromtimestamp(self.start_time).strftime('%Y%m%dT%H%M')}")

    def base_model_id(self):
        return f"{self.model_type}/{self.model_name}"

    @property
    def start_datetime(self):
        return f"{datetime.datetime.fromtimestamp(self.start_time).strftime('%Y%m%dT%H%M')}"

    @start_datetime.setter
    def start_datetime(self, value):
        self.start_datetime = value

    @property
    def the_name(self):
        return (f"{self.model_type}_"
                f"{self.model_name}_"
                f"{self.dataset_filename}_"
                f"epochs-{self.epochs}_"
                f"precision-{self.precision}")

    def get_validation_filename(self, epoch, validation_type):
        os.makedirs(os.path.dirname(f"{cfg.OUTPUTS_DIR}/validation_data/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"), exist_ok=True)
        return f"{cfg.OUTPUTS_DIR}/validation_data/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"


