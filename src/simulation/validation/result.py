class Result:
    index: int
    wireshark_index: int
    request: str
    response: str
    valid: bool
    traceback: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)