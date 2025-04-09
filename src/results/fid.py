import json

import numpy as np
from scipy.linalg import sqrtm

from cfg import EXPERIMENTS
from finetune.model.finetuner_model import DatasetModel, FinetunerModel
from finetune.utils.inference_runner import ModelLoader

with open(f"{EXPERIMENTS}/byt5-base/mbtcp-protocol-emulation.json", "r") as cfg:
    config = cfg.read()
    config = json.loads(config)
    finetuner_model = FinetunerModel(**config, experiment="mbtcp-protocol-emulation.json")
    finetuner_model.current_dataset = DatasetModel(
        protocol="mbtcp", size="6400", client="boundaries_client", context=0,
        functions=[1, 5, 15, 3, 6, 16], values={"low": 0, "high": 65535},
        addresses={"low": 0, "high": 39}, server={"coils": 40, "registers": 40})
    finetuner_model.start_datetime = "20250220T1921"

    model_loader = ModelLoader(finetuner_model, i=0)
    model, tokenizer = model_loader.load_model(finetuner_model)

def get_text_embeddings(texts):
    encoded = tokenizer(texts, padding="max_length", truncation=False, max_length=32, return_tensors="np")
    embeddings = encoded["input_ids"].astype(np.float32)
    return embeddings

def calculate_statistics(embeddings):
    mean = np.mean(embeddings, axis=0)
    cov = np.cov(embeddings, rowvar=False)
    return mean, cov

def calculate_fed(mu1, sigma1, mu2, sigma2):
    diff = np.sum((mu1 - mu2) ** 2)
    cov_mean = sqrtm(sigma1.dot(sigma2))
    if np.iscomplexobj(cov_mean):
        cov_mean = cov_mean.real  # Ensure numerical stability
    return diff + np.trace(sigma1 + sigma2 - 2 * cov_mean)


JSON_FILE = "/home/cv43/ICSPot/checkpoints/byt5-base/mbtcp-protocol-emulation.json/mbtcp-boundaries_client-c0-s6400-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20250220T1921/epoch-18_val_type-exact.jsonl"

real_texts = []
generated_texts = []

with open(JSON_FILE, "r") as file:
    for line in file:
        data = json.loads(line.strip())
        real_texts.append(data["expected_response"])
        generated_texts.append(data["response"])

print("Responses:", real_texts)
print("Expected Responses:", generated_texts)


real_embeddings = get_text_embeddings(real_texts)
generated_embeddings = get_text_embeddings(generated_texts)

mu_real, sigma_real = calculate_statistics(real_embeddings)
print(f"Real Mean: {mu_real.shape}, Real Covariance: {sigma_real.shape}")
mu_gen, sigma_gen = calculate_statistics(generated_embeddings)
print(f"Generated Mean: {mu_gen.shape}, Generated Covariance: {sigma_gen.shape}")

fed_score = calculate_fed(mu_real, sigma_real, mu_gen, sigma_gen)
print(f"Frechet Embedding Distance (FED) Score: {fed_score}")
