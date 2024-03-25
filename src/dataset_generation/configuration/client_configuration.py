from dataclasses import dataclass
from dataclasses_jsonschema import JsonSchemaMixin


@dataclass
class Range(JsonSchemaMixin):
    start: int
    end: int


@dataclass
class HoldingRegisters(JsonSchemaMixin):
    range: Range


@dataclass
class Root(JsonSchemaMixin):
    holding_registers: HoldingRegisters


print(HoldingRegisters.json_schema())
