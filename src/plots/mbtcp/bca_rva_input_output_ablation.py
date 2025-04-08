from plots.from_csv import NATURE, Plots

plot = Plots("mbtcp-protocol-input-output-ablation.json", "20250214T1053")

labels =["4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048", "4196", "8192", "16384", "32768", "65536"]
NATURE = NATURE * 4
print(NATURE)
colors = {name: NATURE[i] for i, name in enumerate(labels)}

plot.accuracy_per_epoch(colors, labels)
