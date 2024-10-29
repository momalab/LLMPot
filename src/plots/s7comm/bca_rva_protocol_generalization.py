from plots.from_csv import NATURE, Plots


plot = Plots("s7comm-protocol-generalization.json", "20240429T2043")

colors = {str(dataset.server): NATURE[i] for i, dataset in enumerate(plot.finetuner.datasets)}
labels = [str(dataset.server) for dataset in plot.finetuner.datasets]

plot.accuracy_per_epoch(colors, labels)
