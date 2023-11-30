import datetime

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
    output_dir: str
    log_output_dir: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.checkpoints_dir = f"{cfg.OUTPUTS_DIR}/checkpoints/{self.__str__()}"
        self.output_dir = f"{cfg.OUTPUTS_DIR}/models/{self.__str__()}"
        if self.epoch is not None:
            self.output_dir = self.output_dir + f"/epoch-{self.epoch}"
        self.log_output_dir = f"{cfg.OUTPUTS_DIR}/logs"

    def __str__(self):
        return (f"{self.model_type}_"
                f"{self.model_name}_"
                f"{self.dataset_filename}_"
                f"epochs-{self.epochs}_"
                f"precision-{self.precision}"
                f"_{datetime.datetime.fromtimestamp(self.start_time).strftime('%Y%m%dT%H%M')}")

    def base_model_id(self):
        return f"{self.model_type}/{self.model_name}"



