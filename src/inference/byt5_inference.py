from datetime import datetime

from finetune.model.finetuner_model import FinetunerModel


def main():
    finetuner_model = FinetunerModel(model_type="google", model_name="byt5-small",
                                     dataset_filename="mbtcp-nocontext-6k", fc=["3", "16"], epochs="100",
                                     precision="32", epoch="20",
                                     start_time=datetime.strptime("20231128T1804", '%Y%m%dT%H%M').timestamp())
    model = ModelWrapper(finetuner_model)
    print(model.predict("04ad000000150010001700070e02d4f6905690f2fc5bc71801e123"))


if __name__ == '__main__':
    main()

