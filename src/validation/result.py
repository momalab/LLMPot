class Result:
    index: int
    request: str
    response: str
    test_set_response: str
    valid: bool
    traceback: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)