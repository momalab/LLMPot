from plots.from_csv import NATURE, Plots


plot = Plots("mbtcp-protocol-emulation-ablation-addresses.json")
labels =["o1", "g1", "g2"]
colors = {name: NATURE[i] for i, name in enumerate(labels)}
plot.accuracy_per_epoch(colors, labels)
