from pytorch_lightning.utilities import rank_zero_only

from utilities.no_torch_logger import NoTorchLogger


class TheLogger(NoTorchLogger):

    @rank_zero_only
    def info(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)

    @rank_zero_only
    def error(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)

    @rank_zero_only
    def warning(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)

    @rank_zero_only
    def debug(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)
