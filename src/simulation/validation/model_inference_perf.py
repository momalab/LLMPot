import asyncio
import threading
from asyncio import AbstractEventLoop, Future

import pandas as pd
from simplet5 import SimpleT5
from torch.utils.benchmark import timer


def background(f):
    def wrapped(*args, **kwargs):
        return asyncio.get_event_loop().run_in_executor(None, f, *args, **kwargs)
    return wrapped


@background
def inference(model: SimpleT5, test_set: pd.DataFrame) -> str:
    request = test_set.sample(1)["request"].item()
    start = timer()
    predicted_response = model.predict(request)[0]
    end = timer()
    print(f"Thread: {threading.get_ident()}, Time: {end - start}")
    return predicted_response


def server_start(models: [SimpleT5]):
    test_set: pd.DataFrame = pd.read_csv("./test_set.csv")

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    groups = []
    for _ in range(1, 20, 1):
        groups.append(asyncio.gather(*[inference(model, test_set) for model in models]))

    all_groups = asyncio.gather(*[group for group in groups])

    result = loop.run_until_complete(all_groups)

    print(result)


def main():
    models = []
    for _ in range(1, 10, 1):
        model = SimpleT5()
        model.load_model("byt5", "/Users/cv43/Downloads/finetuned/byt5", use_gpu=False, num_)
        models.append(model)

    try:
        start = timer()
        server_start(models)
        end = timer()
        print(f"Time: {end - start}")
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
