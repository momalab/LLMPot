from plots.from_csv import NATURE, Plots


plot = Plots("mbtcp-protocol-generalization.json", "20240423T2013")

colors = {str(dataset.server): NATURE[i] for i, dataset in enumerate(plot.finetuner.datasets)}
labels = [str(dataset.server) for dataset in plot.finetuner.datasets]

plot.accuracy_per_epoch(colors, labels)
