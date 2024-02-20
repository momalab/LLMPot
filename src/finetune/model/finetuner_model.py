import datetime
import os

from cfg import CHECKPOINTS, LOGS, VALIDATION


class FinetunerModel:
    model_type: str
    model_name: str
    dataset_filename: str
    precision: int
    workers: int
    start_time: float
    start_datetime: str
    checkpoints_dir: str
    log_output_dir: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "start_datetime":
                self.start_datetime = value
                self.start_time = datetime.datetime.strptime(value, '%Y%m%dT%H%M').timestamp()
            elif key == "start_time":
                self.start_time = value
                self.start_datetime = datetime.datetime.fromtimestamp(value).strftime('%Y%m%dT%H%M')
            setattr(self, key, value)
        self.checkpoints_dir = f"{CHECKPOINTS}"
        self.log_output_dir = f"{LOGS}"

    def __str__(self):
        return f"{self.the_name}_{self.start_datetime}"

    def base_model_id(self):
        return f"{self.model_type}/{self.model_name}"

    @property
    def the_name(self):
        return f"{self.model_type}_{self.model_name}_{self.dataset_filename}"

    def get_validation_filename(self, epoch, validation_type):
        os.makedirs(os.path.dirname(f"{VALIDATION}/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"), exist_ok=True)
        return f"{VALIDATION}/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"


