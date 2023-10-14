import argparse
import pandas as pd
import plotly.express as px
from cfg import OUTPUTS_DIR


def plot_loss(finetuned_model_name): 
    loss = [0.532, 0.416, 0.411, 0.44, 0.407, 0.433, 0.424, 0.421, 0.421, 0.426] #train then val
    loss_type = ['train_loss', 'train_loss', 'train_loss', 'train_loss', 'train_loss','val_loss', 'val_loss', 'val_loss', 'val_loss', 'val_loss']
    epochs = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    data = {'loss': loss,
            'type': loss_type,
            'epochs': epochs}
    df = pd.DataFrame(data)
    fig = px.line(df, x='epochs', y='loss', color='type', color='type', markers=True, title = 'Loss Evaluation')
    fig.show()
    fig.write_image(f"{OUTPUTS_DIR}/plots/{finetuned_model_name}_loss.jpeg")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mnf', required=True)
    args = parser.parse_args()

    finetuned_model_name = args.mnf
    
    with open(f"{OUTPUTS_DIR}/logs/{finetuned_model_name}.log") as data:
        log_file = data.readlines()
    plot_loss(log_file, finetuned_model_name)


if __name__ == '__main__':
    main()