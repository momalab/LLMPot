import datetime
import os

import cfg


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
        self.checkpoints_dir = f"{cfg.OUTPUTS_DIR}/checkpoints"
        self.log_output_dir = f"{cfg.OUTPUTS_DIR}/logs"

    def __str__(self):
        return (f"{self.the_name}_"
                f"{self.start_datetime}")

    def base_model_id(self):
        return f"{self.model_type}/{self.model_name}"

    @property
    def the_name(self):
        return (f"{self.model_type}_"
                f"{self.model_name}_"
                f"{self.dataset_filename}_"
                f"precision-{self.precision}")

    def get_validation_filename(self, epoch, validation_type):
        os.makedirs(os.path.dirname(f"{cfg.OUTPUTS_DIR}/validation_data/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"), exist_ok=True)
        return f"{cfg.OUTPUTS_DIR}/validation_data/{self.__str__()}/epoch-{epoch}_val_type-{validation_type}.jsonl"


