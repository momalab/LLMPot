from utilities.model.filename import Filename


class ValidationDataFilename(Filename):
    epoch: int
    validation_type: str

    def __init__(self, filename: str):
        super().__init__(filename)
        epoch = filename.split("_")[7]
        try:
            self.epoch = int(epoch.split("-")[1])
            self.validation_type = filename.split("_")[7]
        except:
            self.epoch = self.epochs
            self.validation_type = filename.split("_")[7].split(".")[0]
