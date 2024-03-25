import json

import yaml

from cfg import OUTPUTS_DIR
from dataset_generation.configuration.client_configuration import Root

schema = Root.json_schema()

book_schema_json = json.dumps(schema, indent=2)

with open(f"{OUTPUTS_DIR}/cfg-schema.json", "w") as json_schema_file:
    json_schema_file.write(book_schema_json)
