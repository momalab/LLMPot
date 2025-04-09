from typing import Optional


class ServerModel:
    name: str
    coils: Optional[int]
    registers: Optional[int]
    markers: Optional[int]
    datablock: Optional[int]

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __str__(self) -> str:
        if hasattr(self, 'coils'):
            return f"a-{self.coils}_d-{self.registers}"
        elif hasattr(self, 'markers'):
            return f"a-{self.markers}_d-{self.datablock}"
        return f"a-{self.coils}_d-{self.registers}"