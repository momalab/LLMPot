import pandas as pd
import plotly.graph_objects as go

from cfg import PROJECT_ROOT_DIR

csv_file_path = f"{PROJECT_ROOT_DIR}/checkpoints/metrics.csv"
df = pd.read_csv(csv_file_path)

print(df)

df = df.drop(columns=['csv-val_loss_step', 'csv-val_loss_epoch', 'csv-train_loss_step', 'csv-train_loss_epoch'])
df = df.dropna()
print(df)

fig = go.Figure()

metrics_to_plot = [
    # 'csv-train_loss_step',
    # 'csv-val_loss_step',
    # 'csv-val_loss_epoch',
    'csv-accuracy/none',
    # 'csv-train_loss_epoch'
]

for metric in metrics_to_plot:
    fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df[metric], mode='lines', name=metric))

fig.update_layout(
    title='Training Metrics Over Time',
    xaxis_title='Epoch',
    yaxis_title='Metric Value',
    plot_bgcolor='rgba(0,0,0,0)',
    xaxis=dict(showgrid=False),
    yaxis=dict(showgrid=False),
)

fig.show()
