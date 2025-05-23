from lightning.pytorch.callbacks import TQDMProgressBar
from lightning.pytorch.callbacks.progress.tqdm_progress import Tqdm


class FileTQDMProgressBar(TQDMProgressBar):

    def __init__(self, file, refresh_rate: int = 1, process_position: int = 0):
        self._file = file
        super().__init__(refresh_rate, process_position)

    def init_train_tqdm(self):
        return Tqdm(
            leave=True,
            dynamic_ncols=True,
            file=self._file,
            smoothing=0,
        )
