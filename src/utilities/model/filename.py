import datetime


class Filename:
    name: str
    model_type: str
    model_name: str
    protocol: str
    context: str
    dataset_size: int
    epochs: int
    precision: int
    start_time: datetime

    def __init__(self, filename: str):
        self.name = filename
        fields = filename.split("_")
        self.model_type = fields[0]
        self.model_name = fields[1]
        dataset = fields[2].split("-")
        self.protocol = dataset[0]
        self.context = dataset[1]
        self.dataset_size = int(dataset[2][:-1])
        self.epochs = int(fields[3].split("-")[1])
        self.precision = int(fields[4].split("-")[1])
        self.start_time = datetime.datetime.strptime(fields[5], "%Y%m%dT%H%M")
