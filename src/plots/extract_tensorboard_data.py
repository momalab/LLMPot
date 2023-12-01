import tensorflow as tf
import pandas as pd

path_to_events_file = "/media/shared/ICSPot/outputs/logs/my_model/version_0/events.out.tfevents.1701413933.lambda-hyperplane"
data = []

for e in tf.compat.v1.train.summary_iterator(path_to_events_file):
    for v in e.summary.value:
        if v.tag == 'val_loss_step':  # Update with your specific tag
            data.append((e.step, v.simple_value))

df = pd.DataFrame(data, columns=['Step', 'Value'])

print(df)
