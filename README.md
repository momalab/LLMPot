# LLMPot: Dynamically Configured LLM-based Honeypot for Industrial Protocol and Physical Process Emulation

![Model Icon](https://img.shields.io/badge/Model-ByT5-blue)
![Huggingface](https://img.shields.io/badge/Huggingface-LLMPot-orange?logo=huggingface)
![Python](https://img.shields.io/badge/Python-3.11%2B-green?logo=python)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## 🚀 Pretrained Model

Explore our pretrained model hosted on Huggingface:
🔗 [Model Repository](https://huggingface.co/cv43/llmpot)

Test its functionality on our Huggingface Space:
🔗 [Interactive Space](https://huggingface.co/spaces/cv43/llmpot)

---

## 🌟 Project Overview

[Diagram](./assets/llmpot-module-diagram.pdf)

---

## 📦 Install Libraries

Run the following command in the root folder of the project to install dependencies:

```bash
pip install -r requirements.txt
```

---

## 📊 Dataset Generation

### 🔧 Modbus, S7comm

Simulate a Modbus protocol or use a real PLC with our automated script:

```bash
python ./src/dataset_generation/create_dataset.py -p 5020 -intrf lo0 -model byt5-small -exp mbtcp-protocol-emulation.json -o 1
```

**Parameters:**
- **`-p`**: Port for the simulator server.
- **`-intrf`**: Loopback interface name.
- **`-model`**: Subfolder under `experiments` for model configuration.
- **`-exp`**: Configuration file name.
- **`-o`**: Override existing datasets (boolean).

---

## 🏋️‍♂️ Training - Finetuning

```bash
python ./src/finetune/multi-trainer.py -p 200:1,400:1,800:1,1600:1,3200:1,6400:1 -model byt5-small -cfg s7comm-protocol-emulation.json
```

### 🔍 Training Parameters

- **`-p`**: Model size versions in `samples:weight` format.
- **`-model`**: Subfolder under `experiments` for model configuration.
- **`-cfg`**: Experiment configuration file.

---

## 📈 Ablation Study: ByT5 Model Size

Generate BCA and RVA metrics with deviation for each run:

```bash
python ./results/bca_rva_per_model_size.py -model {model_name}
```

---

## 🌐 Protocol Generalization

```bash
python ./src/plots/mbtcp/bca_rva_protocol_generalization.py
python ./src/plots/s7comm/bca_rva_protocol_generalization.py
```

---

## 📊 Barplot: Different-Same PLC Configuration

```bash
python ./src/plots/mbtcp/bca_rva_barplot_protocol-diff-same-plc-cfg.py
```

---

## 🔄 Protocol Different Functions

```bash
python ./src/plots/mbtcp/bca_rva_diff_functions.py
```

---

## 📐 Math Function Plots

```bash
python ./src/plots/math/default_functions.py -func sigmoid -samples 1000 -low -10 -high 10
```

---

## 📊 RVA-e for Math Function

```bash
python ./src/plots/math/math_rva_e.py -exp mbtcp-math-functions.json -timestamp 20240427T1812
```

---

## 🔧 ICSPatch Processes

```bash
python ./src/plots/mbtcp/bca_rva_icspatch_processes.py
```

---

## 🌱 Anaerobic Variations

```bash
python ./src/plots/mbtcp/bca_rva_anaerobic_variations.py
```

---

## 📜 Cite Us

If you find our work valuable, please cite our paper:

Christoforos Vasilatos, Dunia J. Mahboobeh, Hithem Lamri, Manaar Alam, and Michail Maniatakos,
"LLMPot: Automated LLM-based Industrial Protocol and Physical Process Emulation for ICS Honeypots".

```bibtex
@misc{vasilatos2024llmpotautomatedllmbasedindustrial,
    title={LLMPot: Automated LLM-based Industrial Protocol and Physical Process Emulation for ICS Honeypots},
    author={Christoforos Vasilatos and Dunia J. Mahboobeh and Hithem Lamri and Manaar Alam and Michail Maniatakos},
    year={2024},
    eprint={2405.05999},
    archivePrefix={arXiv},
    primaryClass={cs.CR},
    url={https://arxiv.org/abs/2405.05999},
}
```
