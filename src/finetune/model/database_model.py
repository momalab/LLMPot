from typing import List, Optional
from finetune.model.range_model import RangeModel
from finetune.model.server_model import ServerModel


class DatasetModel:
    protocol: str
    size: int
    client: str
    server: Optional[ServerModel] = None
    context: int
    functions: List[int] = []
    values = RangeModel()
    addresses = RangeModel()
    multi_elements: int = 3

    has_addresses: bool = False
    has_values: bool = False

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "values":
                setattr(self, key, RangeModel(**value))
                self.has_values = True
            elif key == "addresses":
                setattr(self, key, RangeModel(**value))
                self.has_addresses = True
            elif key == "server":
                setattr(self, key, ServerModel(**value))
            else:
                setattr(self, key, value)

    def functions_str(self, separator="_"):
        if self.functions:
            return f"{separator.join([str(x) for x in self.functions])}"
        return ""

    @property
    def s7comm_args(self):
        if self.server:
            return self.server.markers, self.server.datablock
        return None

    @property
    def mbtcp_args(self):
        if self.server:
            return self.server.coils, self.server.registers
        return None

    def __str__(self):
        return (f"{self.protocol}-{self.client}-c{self.context}-s{self.size}" +
                (f"-f{self.functions_str()}" if self.functions else "") +
                (f"-v{self.values}" if self.has_values else "") +
                (f"-a{self.addresses}" if self.has_addresses else "") +
                (f"-sc{self.server.coils}" if self.server and hasattr(self.server, "coils") else "") +
                (f"-sr{self.server.registers}" if self.server and hasattr(self.server, "registers") else "") +
                (f"-sc{self.server.markers}" if self.server and hasattr(self.server, "markers") else "") +
                (f"-sr{self.server.datablock}" if self.server and hasattr(self.server, "datablock") else "")
                )
