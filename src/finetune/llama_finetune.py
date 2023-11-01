import argparse
import datetime
import time
import traceback

import torch
import transformers
from datasets import load_dataset, Dataset
from peft import LoraConfig, get_peft_model
from peft import prepare_model_for_kbit_training
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, LlamaTokenizerFast

from cfg import OUTPUTS_DIR, PROJECT_ROOT_DIR
from utilities import logger


def formatting_inference(tokenizer, sample: str):
    return (f"{tokenizer.bos_token}[INST] <<SYS>>\n"
            f"You are a modbus server, that accepts requests in hex string format and replies with a hex formatted string."
            f"Here is an example request: '1d68000000060001001b0004' and the corresponding response: '1d68000000040001010f'.\n"
            f"<<SYS>>\n\n"
            f"{sample} [/INST]\n")


def formatting_func(tokenizer, sample: dict):
    return (f"{tokenizer.bos_token}[INST] <<SYS>>\n"
            f"You are a modbus server, that accepts requests in hex string format and replies with a hex formatted string."
            f"Here is an example request: '1d68000000060001001b0004' and the corresponding response: '1d68000000040001010f'.\n"
            f"<<SYS>>\n\n"
            f"{sample['source_text']} [/INST]\n"
            f"{sample['target_text']} {tokenizer.eos_token}")


def generate_and_tokenize_prompt(sample, tokenizer: LlamaTokenizerFast = None):
    return tokenizer(formatting_func(tokenizer, sample))


def print_trainable_parameters(model):
    trainable_params = 0
    all_param = 0
    for _, param in model.named_parameters():
        all_param += param.numel()
        if param.requires_grad:
            trainable_params += param.numel()
    print(f"trainable params: {trainable_params} || all params: {all_param} || trainable%: {100 * trainable_params / all_param}")


def load_tokenizer(base_model_id: str):
    tokenizer: LlamaTokenizerFast = AutoTokenizer.from_pretrained(
        base_model_id,
        padding_side="left",
        add_eos_token=False,
        add_bos_token=False,
    )
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.pad_token_id = 0

    return tokenizer


def load_data(dataset_file: str, tokenizer) -> tuple[Dataset, Dataset]:
    dataset = load_dataset('csv', data_files={'train': f"{OUTPUTS_DIR}/datasets/train/{dataset_file}.csv",
                                              'val': f"{OUTPUTS_DIR}/datasets/validation/{dataset_file}.csv",
                                              'test': f"{OUTPUTS_DIR}/datasets/test/{dataset_file}.csv"})
    train_dataset: Dataset = dataset["train"]
    eval_dataset: Dataset = dataset["val"]

    tokenized_train_dataset = train_dataset.map(function=generate_and_tokenize_prompt, fn_kwargs={"tokenizer": tokenizer})
    tokenized_val_dataset = eval_dataset.map(function=generate_and_tokenize_prompt, fn_kwargs={"tokenizer": tokenizer})

    return tokenized_train_dataset, tokenized_val_dataset


def finetune(tokenizer, tokenized_train_dataset, tokenized_val_dataset, base_model_id, epochs, output_dir):
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_use_double_quant=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16
    )

    model = AutoModelForCausalLM.from_pretrained(base_model_id, quantization_config=bnb_config)

    model.gradient_checkpointing_enable()
    model = prepare_model_for_kbit_training(model)

    config = LoraConfig(
        r=32,
        lora_alpha=64,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj", "lm_head"],
        bias="none",
        lora_dropout=0.05,
        task_type="CAUSAL_LM",
    )

    model = get_peft_model(model, config)
    print_trainable_parameters(model)

    # Apply the accelerator. You can comment this out to remove the accelerator.
    # accelerator = Accelerator(gradient_accumulation_steps=2)
    # model = accelerator.prepare_model(model)

    if torch.cuda.device_count() > 1:  # If more than 1 GPU
        model.is_parallelizable = True
        model.model_parallel = True

    trainer = transformers.Trainer(
        model=model,
        train_dataset=tokenized_train_dataset,
        eval_dataset=tokenized_val_dataset,
        args=transformers.TrainingArguments(
            num_train_epochs=epochs,
            save_strategy="epoch",
            output_dir=output_dir,
            overwrite_output_dir=True,
            warmup_steps=1,
            per_device_train_batch_size=2,
            gradient_accumulation_steps=1,
            # max_steps=500,
            learning_rate=2.5e-5,
            bf16=True,
            optim="paged_adamw_8bit",
            logging_dir="./logs",
            # save_strategy="steps",
            # save_steps=500,
            evaluation_strategy="epoch",
            # eval_steps=250,
            do_eval=True,
            report_to=["none"]
            # run_name=f"{run_name}-{datetime.now().strftime('%Y-%m-%d-%H-%M')}"  # Name of the W&B run (optional)
        ),
        data_collator=transformers.DataCollatorForLanguageModeling(tokenizer, mlm=False),
    )

    model.config.use_cache = False
    trainer.train()


def main():
    tokenizer = load_tokenizer(f"{model_name_path}/{model_name}")
    tokenized_train_dataset, tokenized_val_dataset = load_data(csv_filename, tokenizer)

    output_folder = (f"{PROJECT_ROOT_DIR}/models/{model_type}_{model_name}_{csv_filename}_epochs-{epochs}_precision-0"
                     f"_{datetime.datetime.fromtimestamp(start_time).strftime('%Y%m%dT%H%M')}")
    try:

        log.info(f"Start time: {start_time} - {datetime.datetime.fromtimestamp(start_time)}")
        finetune(tokenizer, tokenized_train_dataset, tokenized_val_dataset, f"{model_name_path}/{model_name}", epochs, output_folder)
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
    parser.add_argument('-mt', default="meta-llama", required=False)
    parser.add_argument('-mp', default="meta-llama", required=False)
    parser.add_argument('-mn', default="Llama-2-7b-chat-hf", required=False)
    parser.add_argument('-csv', required=True)
    parser.add_argument('-e', default=10, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    args = parser.parse_args()

    model_type = args.mt
    model_name_path = args.mp
    model_name = args.mn
    csv_filename = args.csv
    epochs = int(args.e)

    start_time = time.time()
    log = logger.TheLogger(f"{model_type}_{model_name}_{csv_filename}_epochs-{epochs}_precision-0"
                           f"_{datetime.datetime.fromtimestamp(start_time).strftime('%Y%m%dT%H%M')}",
                           f"{OUTPUTS_DIR}/logs")

    main()

# base_model = AutoModelForCausalLM.from_pretrained(
#     base_model_id,
#     quantization_config=bnb_config,
#     device_map="auto",
#     trust_remote_code=True,
#     use_auth_token=True
# )
#
# ft_model = PeftModel.from_pretrained(base_model, f"llama2-7b-journal-finetune/checkpoint-{trainer.state.global_step}")
#
# ft_model.eval()
# eval_prompt = formatting_inference("0f5d00000009000f001d000a02ff03")
# model_input = tokenizer(eval_prompt, return_tensors="pt").to("cuda")
# with torch.no_grad():
#     print(f"Llama2 response: {tokenizer.decode(ft_model.generate(**model_input, max_new_tokens=300, pad_token_id=2)[0], skip_special_tokens=True)}")
