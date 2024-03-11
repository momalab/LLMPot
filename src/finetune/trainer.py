import argparse
import datetime
import time
import traceback

from lightning.pytorch.loggers import TensorBoardLogger

from cfg import CHECKPOINTS
from finetune.byt5 import Byt5
from finetune.llama2 import Llama2
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger

VAL_LOSS = "val_loss"
TRAIN_LOSS = "train_loss"


def main(model_type: str, model_name: str, csv: str, experiment: str, precision: int = 32, workers: int = 2, lora: bool = False, quantization: bool = False):
    start_time = time.time()
    finetuner_model = FinetunerModel(model_type=model_type, model_name=model_name, dataset_filename=csv,
                                     precision=precision, workers=workers, start_time=start_time)

    log = TheLogger(finetuner_model.__str__(), finetuner_model.log_output_dir)
    try:
        log.info(f"Start time: {start_time} - {datetime.datetime.fromtimestamp(start_time)}")
        log.info(f"Start time: {finetuner_model.start_datetime}")

        logger = TensorBoardLogger(f"{CHECKPOINTS}/{experiment}", name=finetuner_model.the_name, version=finetuner_model.start_datetime)

        if finetuner_model.model_type == "meta-llama":
            llama2 = Llama2(finetuner_model, use_lora=lora, use_quantization=quantization)
            llama2.train(logger, finetuner_model)
        elif finetuner_model.model_type == "google":
            byt5 = Byt5(finetuner_model, VAL_LOSS, TRAIN_LOSS, use_lora=lora, use_quantization=quantization)
            byt5.train(logger, finetuner_model)

        end_time = time.time()
        log.info(f"End time: {end_time} - {datetime.datetime.fromtimestamp(end_time)}")
        duration = end_time - start_time
        log.info(f"Duration: {duration}")
        log.info(f"DurationTime: {datetime.timedelta(seconds=duration)}")
    except:
        log.error(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-csv', default="mbtcp-deterministicContext-2k_fc-3-6", required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    parser.add_argument('-l', default="False", required=False)
    parser.add_argument('-q', default="False", required=False)
    args = parser.parse_args()

    main(args.mt, args.mn, args.csv, args.csv, args.p, args.w, eval(args.l), eval(args.q))
