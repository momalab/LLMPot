
from peft.utils.peft_types import TaskType


class Lora:
    r: int = 16
    alpha: int = 64
    dropout: float = 0.05
    task_type: TaskType = TaskType.SEQ_2_SEQ_LM

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
