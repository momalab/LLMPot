from plots.from_csv import NATURE, Plots

plot = Plots("mbtcp-protocol-generalization.json", "20240423T2013")

labels =["o1", "g1", "g2"]
colors = {name: NATURE[i] for i, name in enumerate(labels)}

plot.accuracy_per_epoch(colors, labels)
