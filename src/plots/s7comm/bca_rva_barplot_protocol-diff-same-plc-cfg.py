from plots.from_csv import Plots


plot = Plots("s7comm-protocol-diff-same-plc-cfg.json", "20240429T2158")
plot.accuracy_with_random_dataset()
