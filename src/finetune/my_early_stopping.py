from lightning.pytorch.callbacks import EarlyStopping


class MyEarlyStopping(EarlyStopping):
    def on_load_checkpoint(self, trainer, pl_module, checkpoint):
        pass