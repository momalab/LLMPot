import os

from cfg import OUTPUTS_DIR
import plotly.graph_objects as go


def main():
    directory = f"{OUTPUTS_DIR}/logs/"

    duration_str = 'Duration: '
    duration_time_str = 'DurationTime: '
    duration_dict: dict[str: dict[float, str]] = dict()

    for filename in os.listdir(f"{OUTPUTS_DIR}/logs/"):
        duration_dict[filename] = {}
        with open(os.path.join(directory, filename)) as log_file:
            for line in log_file:
                if "Duration" in line:
                    if duration_str in line:
                        duration_dict[filename]["duration"] = round(float(line[line.rindex(duration_str) + len(duration_str):-1]), 0)
                    if duration_time_str in line:
                        duration_dict[filename]["duration_time"] = line[line.rindex(duration_time_str) + len(duration_time_str):-1]

    print(duration_dict)

    fig = go.Figure()
    duration_arr = []
    duration_time_arr = []
    for filename in os.listdir(f"{OUTPUTS_DIR}/logs/"):
        duration_arr.append(duration_dict[filename]["duration"])
        duration_time_arr.append(duration_dict[filename]["duration_time"])

    fig.add_trace(go.Bar(x=[*duration_dict], y=duration_arr))
    fig.update_layout(
        yaxis=dict(
            tickmode='array',
            tickvals=duration_arr,
            ticktext=duration_time_arr
        )
    )
    fig.show()


if __name__ == '__main__':
    main()
