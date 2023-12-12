from lightning import Callback, Trainer, LightningModule


class MetricsLogger(Callback):

    def on_train_epoch_end(self, trainer: Trainer, pl_module: LightningModule):
        # if trainer.is_global_zero:
        metrics = trainer.callback_metrics
        if 'train_loss' in metrics:
            trainer.logger.experiment.add_scalars('loss_epoch', {'val': metrics['val_loss'].item(), 'train': metrics['train_loss'].item()}, trainer.current_epoch)