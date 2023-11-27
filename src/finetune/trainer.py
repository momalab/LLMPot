import argparse
import datetime
import time
import traceback

from finetune.byt5 import Byt5
from finetune.llama2 import Llama2
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-csv', default="mbtcp-nocontext-10k", required=False)
    parser.add_argument('-e', default=10, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    parser.add_argument('-l', default="False", required=False)
    parser.add_argument('-q', default="False", required=False)
    args = parser.parse_args()

    start_time = time.time()
    finetune_model = FinetunerModel(model_type=args.mt, model_name=args.mn, dataset_filename=args.csv,
                                    epochs=args.e, precision=args.p, workers=args.w, start_time=start_time)

    log = TheLogger(finetune_model.__str__(), finetune_model.log_output_dir)
    try:
        log.info(f"Start time: {start_time} - {datetime.datetime.fromtimestamp(start_time)}")

        if finetune_model.model_type == "meta-llama":
            llama2 = Llama2(finetune_model, use_lora=eval(args.l), use_quantization=eval(args.q))
            llama2.train(logger=False)
        else:
            byt5 = Byt5(finetune_model, use_lora=eval(args.l), use_quantization=eval(args.q))
            byt5.train(logger=False)

        end_time = time.time()
        log.info(f"End time: {end_time} - {datetime.datetime.fromtimestamp(end_time)}")
        duration = end_time - start_time
        log.info(f"Duration: {duration}")
        log.info(f"DurationTime: {datetime.timedelta(seconds=duration)}")
    except:
        log.error(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
