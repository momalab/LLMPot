from plots.from_csv import Plots


plot = Plots("mbtcp-protocol-diff-same-plc-cfg.json", "20240411T2343")
plot.accuracy_with_random_dataset()
