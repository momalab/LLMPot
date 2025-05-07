from plots.from_csv import NATURE, Plots


plot = Plots("mbtcp-anaerobic-variations.json", "20240428T2317")

labels =["[-30, 30]", "[-120, -60]", "[-90, -30]", "[30, 90]", "[60, 120]"]
colors = {name: NATURE[i] for i, name in enumerate(labels)}

plot.accuracy_per_epoch(colors, labels)
