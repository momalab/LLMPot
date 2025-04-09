from plots.from_csv import NATURE, Plots


plot = Plots("s7comm-protocol-emulation.json", "20240428T1840")

colors = {dataset.size: NATURE[i] for i, dataset in enumerate(plot.finetuner.datasets)}
labels = [dataset.size for dataset in plot.finetuner.datasets]

plot.accuracy_per_epoch(colors, labels)
plot.loss_per_epoch(colors, labels)
