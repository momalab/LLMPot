class Result:
    index: int
    context: str
    request: str
    response: str
    expected_response: str
    valid: bool
    error: str

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
