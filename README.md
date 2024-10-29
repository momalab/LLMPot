# LLMPot: Dynamically Configured LLM-based Honeypot for Industrial Protocol and Physical Process Emulation

## Install libraries

Execute command in the root folder of the project.

```shell
pip install -r requirements
```

## Dataset Generation

### Modbus, S7comm

The following process can also be applied in a real PLC but for easiness we provide custom simulator for modbus protocol with an automated script.

```shell
python ./src/dataset_generation/create_dataset.py -p 5020 -intrf lo0 -model byt5-small -exp mbtcp-protocol-emulation.json -o 1
```

"-p": the port to run the simulator server
"-intrf": the loopback interface name of the machine running the script
"-model": it is the subfolder under experiments that holds the configuration files for a specific model
"-exp": the configuration filename to use
"-o": boolean value if to override the already existing datasets

## Training - Finetuning

```shell
python ./src/finetune/multi-trainer.py -p 200:1,400:1,800:1,1600:1,3200:1,6400:1 -model byt5-small -cfg s7comm-protocol-emulation.json
```

"-p" provides an easy way to generate more than one versions of a specific size model reported in the configuration file
"-model" the experiment subfolder to use
"-cfg" the experiment configuration to use

## Ablation Study ByT5 model size

Provide the model name either byt5-small or byt5-base in order to generate the BCA and RVA metrics along with the deviation for each run.

```shell
python ./results/bca_rva_per_model_size.py -model {model_name}
```

## Protocol Generalization

```shell
python ./src/plots/mbtcp/bca_rva_protocol_generalization.py

python ./src/plots/s7comm/bca_rva_protocol_generalization.py
```

## Barplot Different-Same PLC configuration

Note: The metrics.csv files need manual population through the original ones to produce the bar plots.

```shell
python ./src/plots/mbtcp/bca_rva_barplot_protocol-diff-same-plc-cfg.py
```

## Protocol Different Functions

```shell
python ./src/plots/mbtcp/bca_rva_diff_functions.py
```

## Math Function Plots

```shell
python ./src/plots/math/default_functions.py -func sigmoid -samples 1000 -low -10 -high 10
```
