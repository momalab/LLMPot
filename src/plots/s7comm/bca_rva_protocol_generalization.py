from plots.from_csv import NATURE, Plots


plot = Plots("s7comm-protocol-generalization.json", "20240429T2043")

labels =["o1", "g1", "g2"]
colors = {name: NATURE[i] for i, name in enumerate(labels)}

plot.accuracy_per_epoch(colors, labels)
