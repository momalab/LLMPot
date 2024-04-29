import argparse
import datetime
import time
import traceback

from lightning.pytorch.loggers import TensorBoardLogger, CSVLogger
from lightning_utilities.core.rank_zero import rank_zero_only

from cfg import CHECKPOINTS
from finetune.byt5 import Byt5
from finetune.llama2 import Llama2
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger


def main(finetuner_model: FinetunerModel):
    log = TheLogger(finetuner_model.__str__(), finetuner_model.log_output_dir)
    try:
        log.info(f"Start time: {finetuner_model.start_time} - {datetime.datetime.fromtimestamp(finetuner_model.start_time)}")

        tensor_logger = TensorBoardLogger(f"{CHECKPOINTS}/{finetuner_model.experiment}", name=finetuner_model.the_name, version=finetuner_model.start_datetime)
        csv_logger = CSVLogger(f"{CHECKPOINTS}/{finetuner_model.experiment}", name=finetuner_model.the_name, version=f"csv/{finetuner_model.start_datetime}", prefix="csv")

        if finetuner_model.model_type == "meta-llama":
            llama2 = Llama2(finetuner_model)
            llama2.train([tensor_logger, csv_logger])
        elif finetuner_model.model_type == "google":
            byt5 = Byt5(finetuner_model)
            byt5.train([tensor_logger, csv_logger])

        end_time = time.time()
        log.info(f"End time: {end_time} - {datetime.datetime.fromtimestamp(end_time)}")
        duration = end_time - finetuner_model.start_time
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
    parser.add_argument('-e', default=20, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    parser.add_argument('-l', default="False", required=False)
    parser.add_argument('-q', default="False", required=False)
    args = parser.parse_args()

    model = FinetunerModel(model_type=args.mt, model_name=args.mn, experiment=args.csv, current_dataset=args.csv, max_epochs=args.e,
                           precision=args.p, workers=args.w, lora=args.l, quantization=args.q)

    main(model)
