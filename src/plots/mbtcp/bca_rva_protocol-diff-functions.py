from plots.from_csv import NATURE, Plots


plot = Plots("mbtcp-diff-functions.json", "20240610T1639")
colors = {dataset.functions_str(): NATURE[i] for i, dataset in enumerate(plot.finetuner.datasets)}
labels = [dataset.functions_str() for dataset in plot.finetuner.datasets]
plot.accuracy_per_epoch(colors, labels)
plot.loss_per_epoch(colors, labels)
