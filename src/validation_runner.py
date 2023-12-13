import argparse
import multiprocessing as mp
import os
from datetime import datetime

from torch.utils.data import DataLoader
from tqdm import tqdm
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

import utilities.load_dataset
from cfg import OUTPUTS_DIR
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-ts', default="mbtcp-deterministic-2k_fc-3-16", required=False)
    parser.add_argument('-t', default="20231212T1434", required=False)
    parser.add_argument('-e', default=1, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    parser.add_argument('-g', default="True", required=False)
    parser.add_argument('-val', default="exactly", required=False)
    args = parser.parse_args()

    test_set_name = args.ts
    use_gpu = eval(args.g)
    validation_type = args.val

    datetime_obj = datetime.strptime(args.t, '%Y%m%dT%H%M')

    finetuner_model = FinetunerModel(model_type=args.mt, model_name=args.mn, dataset_filename=args.ts,
                                     epochs=args.e, precision=args.p, workers=args.w, start_time=datetime_obj.timestamp())

    test_set = utilities.load_dataset.load_dataset_from_file(f"{test_set_name}")["test"]
    test_set = DataLoader(test_set, batch_size=len(test_set), shuffle=False, num_workers=1)

    arguments = list()
    module = None
    index = 0
    for model_version in tqdm(os.listdir(f"{finetuner_model.checkpoints_dir}/{finetuner_model.the_name}/{args.t}/checkpoints")):
        the_epoch = model_version.split("-")[1]

        finetuner_model.output_dir = f"{finetuner_model.checkpoints_dir}/{finetuner_model.the_name}/{args.t}/checkpoints/{model_version}"
        module = Byt5LightningModule.load_from_checkpoint(
            checkpoint_path=finetuner_model.output_dir,
            tokenizer=ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id()),
            model=T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id()),
            finetuner_model=finetuner_model)
        module.model.to(f"cuda:{index}")
        print(module.model.device)

        os.makedirs(os.path.dirname(f"{OUTPUTS_DIR}/validation_data/{finetuner_model.__str__()}/{model_version}"), exist_ok=True)
        result_file_path = f"{OUTPUTS_DIR}/validation_data/{finetuner_model.__str__()}/epoch-{the_epoch}_val_type-{validation_type}.jsonl"
        for batch in test_set:
            arguments.append((batch, result_file_path, validation_type))
        index = index + 1
        if index == 8:
            index = 0

    with mp.Pool(processes=16) as pool:
        list(pool.map(module.validate_wrapper, arguments))


if __name__ == '__main__':
    mp.set_start_method('spawn', force=True)
    main()
