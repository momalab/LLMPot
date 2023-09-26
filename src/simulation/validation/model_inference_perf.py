import threading
from multiprocessing.pool import ThreadPool, ApplyResult

import pandas as pd
from pandas import DataFrame
from simplet5 import SimpleT5
from torch.utils.benchmark import timer

THREADS = 4
MODELS = 2
N = 20


def inference(model: SimpleT5, requests: DataFrame) -> [str]:
    predicted_responses = []
    for request in requests.iterrows():
        start = timer()
        predicted_responses.append(model.predict(request[1]["request"])[0])
        end = timer()
        print(f"Thread: {threading.get_ident()}, Time: {end - start}", flush=True)
    return predicted_responses


def main():
    models = []
    test_set: pd.DataFrame = pd.read_csv("./test_set.csv")

    for _ in range(0, MODELS):
        model = SimpleT5()
        model.load_model("byt5", "/Users/cv43/Downloads/finetuned/byt5", use_gpu=False)
        models.append(model)

    try:
        start = timer()

        with ThreadPool(THREADS) as pool:
            args = [(model, test_set.sample(N)) for model in models]
            results = pool.starmap_async(inference, args)
            count = 0
            for result in results.get():
                print(result)
                count = count + len(result)

        print(count)

        end = timer()
        print(f"Time: {end - start}")
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
