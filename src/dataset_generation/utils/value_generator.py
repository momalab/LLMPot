import itertools
import random
from typing import List

from finetune.model.range_model import RangeModel


def generate_random_value(values: RangeModel, elements=0):
    return random.randrange(values.low, values.high - elements - 1)


def generate_multiple_requests(elements: int, values: List):
    return itertools.product(values, repeat=elements)

def generate_combinations(values: RangeModel, elements):
    nums = [values.low, random.randrange(values.low + 1, values.high - 1), values.high]

    combinations = itertools.product(nums, repeat=elements)
    return {i: list(t) for i, t in enumerate(combinations)}


def generate_words(values: List[int]) -> bytearray:
    encoded_bytes = bytearray()
    for number in values:
        encoded_bytes += number.to_bytes(2, byteorder='big') #set_word(bytearray(2), 0, value) ?
    return encoded_bytes


def generate_words_from_bytearrays(bytearrays_list: List[bytearray]) -> bytearray:
    combined = bytearray(len(bytearrays_list) * 2)
    for ba in bytearrays_list:
        combined += ba
    return combined

def generate_triplet_blocks(low: int, high: int):
    return [low, random.randrange(low, high - 1), high - 1]

def generate_triplet_value(values: RangeModel, elements=0):
    return [values.low, random.randrange(values.low, values.high - elements - 1), values.high - elements]


def generate_exception_ranges(addresses: RangeModel, max_address: int, elements=0):
    if addresses.high == max_address:
        return [0]
    return [addresses.high + 1, random.randrange(addresses.high, max_address - elements - 2), max_address - elements - 1]

def generate_including_min_max(low: int, high: int, size: int) -> List[int]:
    random_numbers = [random.randint(low, high) for _ in range(size - 2)]

    random_numbers.append(low)
    random_numbers.append(high)

    random.shuffle(random_numbers)

    return random_numbers
