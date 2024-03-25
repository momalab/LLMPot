import os

import plotly.graph_objects as go
from tensorflow.python.summary.summary_iterator import summary_iterator


def plot_tensorboard_data(log_path_tags):
    fig = go.Figure()

    for log_path, tags in log_path_tags.items():
        for tag in tags:
            event_file = next(os.path.join(log_path, f) for f in os.listdir(log_path) if 'events.out.tfevents' in f)

            data = []
            for e in summary_iterator(event_file):
                for v in e.summary.value:
                    if v.tag == tag:
                        data.append((e.step, v.simple_value))

            # Check if data is not empty
            if data:
                # Separate the steps and values for plotting
                steps, values = zip(*data)
                # Add trace to the plot
                fig.add_trace(go.Scatter(x=steps, y=values, mode='lines+markers', name=f'{tag}'))
            else:
                print(f"No data found for tag {tag} in {log_path}")

    # Update layout for aesthetics
    fig.update_layout(
        title='TensorBoard Data in Plotly',
        xaxis_title='Step',
        yaxis_title='Value',
        plot_bgcolor='rgba(0,0,0,0)',  # Transparent background
        xaxis=dict(showgrid=False),  # No X-axis grid
        yaxis=dict(showgrid=False, type='log'),  # No Y-axis grid, logarithmic scale
    )

    fig.show()


# Provided log_path_tags with PROJECT_ROOT_DIR variable
log_path_tags = {
    f"{PROJECT_ROOT_DIR}/checkpoints/google_byt5-small_mbtcp-p1-c2-1200/20240226T1739/accuracy_none/": ['accuracy'],
    f"{PROJECT_ROOT_DIR}/checkpoints/google_byt5-small_mbtcp-p1-c2-1200/20240226T1739/loss_epoch_train/": ['loss_epoch']
}

# Make sure to define your PROJECT_ROOT_DIR variable correctly before calling this function.
plot_tensorboard_data(log_path_tags)
