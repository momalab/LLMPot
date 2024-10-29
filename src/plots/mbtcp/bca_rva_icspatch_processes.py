from plots.from_csv import NATURE, Plots


plot = Plots("mbtcp-icspatch-processes.json", "20240428T1512")

colors = {dataset.client: NATURE[i] for i, dataset in enumerate(plot.finetuner.datasets)}
labels = [f"{dataset.client}" for dataset in plot.finetuner.datasets]

plot.accuracy_per_epoch(colors, labels)
plot.loss_per_epoch(colors, labels, False)
