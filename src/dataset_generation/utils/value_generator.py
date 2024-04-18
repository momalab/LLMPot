import itertools
import random

from finetune.model.finetuner_model import RangeModel


def generate_random_value(values: RangeModel, elements=0):
    return random.randrange(values.low, values.high - elements)


def generate_multiple_requests(elements: int, values: []):
    return itertools.product(values, repeat=elements + 1)


def generate_combinations(values: RangeModel, elements):
    nums = [values.low, random.randrange(values.low + 1, values.high), values.high]

    combinations = itertools.product(nums, repeat=elements + 1)
    return {i: list(t) for i, t in enumerate(combinations)}


def generate_words(values: [int]) -> bytearray:
    encoded_bytes = bytearray()
    for number in values:
        encoded_bytes += number.to_bytes(2, byteorder='big')
    return encoded_bytes


def generate_words_from_bytearrays(bytearrays_list: [bytearray]) -> bytearray:
    combined = bytearray(len(bytearrays_list) * 2)
    for ba in bytearrays_list:
        combined += ba
    return combined


def generate_triplet_value(values: RangeModel, elements=0):
    return [values.low, random.randrange(values.low, values.high - elements - 1), values.high - elements]


def generate_exception_ranges(addresses: RangeModel, max_address: int, elements=0):
    return [addresses.high + 1, random.randrange(addresses.high, max_address - elements - 1), max_address - elements]



