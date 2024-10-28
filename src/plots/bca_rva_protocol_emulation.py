from plots.from_csv import NATURE, Plots


plot = Plots("mbtcp-protocol-emulation.json")
colors = {dataset.size: NATURE[i] for i, dataset in enumerate(plot.finetuner.datasets)}
labels = [dataset.size for dataset in plot.finetuner.datasets]
plot.accuracy_per_epoch(colors, labels)
plot.loss_per_epoch(colors, labels)
