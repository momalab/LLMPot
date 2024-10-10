import time

import torch


class SimpleModel(torch.nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.fc1 = torch.nn.Linear(1024, 1024)
        self.fc2 = torch.nn.Linear(1024, 1024)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

def process():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model = SimpleModel().to(device)
    if torch.cuda.device_count() > 1:
        print(f"Using {torch.cuda.device_count()} GPUs!")
        model = torch.nn.DataParallel(model)

    input_data = torch.randn(64, 1024).to(device)

    start_time = time.time()
    duration = 10

    print("Starting GPU stress test...")

    while time.time() - start_time < duration:
        output = model(input_data)
        output.mean().backward()

    print("Completed GPU stress test.")

    for i in range(torch.cuda.device_count()):
        print(f"GPU {i} Memory Usage: {torch.cuda.memory_allocated(i) / 1e6} MB")

if __name__ == "__main__":
    process()
