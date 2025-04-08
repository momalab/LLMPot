from plots.from_csv import NATURE, Plots

plot = Plots("mbtcp-protocol-input-output-ablation.json", "20250214T1053")

labels =["4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048", "4196", "8192", "16384", "32768", "65536"]
NATURE = ["#C03221", "#87BCDE", "#EDB88B", "#545E75", "#3F826D", "#88498F", "#E57A44", "#4F86C6", "#F4D35E", "#8CB369", "#B56576", "#2A9D8F", "#E76F51", "#6D597A", "#264653"]
colors = {name: NATURE[i] for i, name in enumerate(labels)}

plot.accuracy_per_epoch(colors, labels)
