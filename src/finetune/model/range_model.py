class RangeModel:
    low: int = 0
    high: int = 15999 #65535

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __str__(self):
        return f"{self.low}_{self.high}"
