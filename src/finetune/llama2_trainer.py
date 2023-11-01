import time

import cfg
from finetune.model.finetuner_model import FinetunerModel
from llama2 import Llama2

if __name__ == '__main__':
    finetune_model = FinetunerModel(model_type="meta-llama", model_name_path="meta-llama",
                                    model_name="Llama-2-7b-chat-hf", dataset_filename="mbtcp-nocontext-6k_fc-3-16",
                                    epochs=30, precision=32, start_time=time.time(), output_dir=f"{cfg.OUTPUTS_DIR}/models")
    llama2 = Llama2(finetune_model, use_lora=True, use_quantization=False)

    llama2.train()
