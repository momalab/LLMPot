import asyncio
import json
from datetime import datetime

from beanie import init_beanie
from flask import Flask, request, render_template, redirect
from motor.motor_asyncio import AsyncIOMotorClient

from cfg import PROJECT_ROOT_DIR
from model.web.client import Client
from model.web.request import Request
from server.persistence_decorator_web import log_transport
from utilities.logger import TheLogger

DIR = PROJECT_ROOT_DIR
logger = TheLogger("web_server", f"{DIR}/logs")

app = Flask(__name__,
            static_url_path='',
            static_folder='',
            template_folder='templates'
            )


@app.route('/wbm/plugins/wbm-legal-information/platform/pfcXXX/licenses.php', methods=['POST'])
def post_licenses_php():
    return open(f'{DIR}/server/json_files/licenses.php', 'r').read()


@app.route('/wbm/php/plugins/load.php', methods=['POST'])
@log_transport
def post_load_php():
    return open(f'{DIR}/server/json_files/load.php', 'r').read()


@app.route('/wbm/php/parameter/mappings.php', methods=['POST'])
def post_mappings_php():
    return open(f'{DIR}/server/json_files/mappings.php', 'r').read()


@app.route('/wbm/php/parameter/infos.php', methods=['POST'])
def post_info_php():
    return open(f'{DIR}/server/json_files/infos.php', 'r').read()


@app.route('/wbm/php/parameter/configtools.php', methods=['POST'])
def post_configtools_php():
    device_params = json.loads(request.data)["aDeviceParams"]
    name = device_params[0]["name"]
    parameter = json.loads(request.data)["aDeviceParams"][0]["parameter"]
    if name == "detect_feature":
        if parameter[0] == "--list":
            return open(f'{DIR}/server/json_files/detect_feature_list.json', 'r').read()
        elif len(name) == 2:
            return open(f'{DIR}/server/json_files/detect_feature_2.json', 'r').read()
    elif name == "network_config":
        if len(device_params) == 2:
            if device_params[0]["parameter"][0] == "--mac-address" and device_params[1]["parameter"][0] == "--ip-config":
                return open(f'{DIR}/server/json_files/network_config_ip_mac.json', 'r').read()
            else:
                return open(f'{DIR}/server/json_files/network_config_2.json', 'r').read()
        elif parameter[0] == "--ip-config":
            return open(f'{DIR}/server/json_files/network_config_ip.json', 'r').read()
        elif parameter[0] == "--network-config":
            return open(f'{DIR}/server/json_files/network_config_network.json', 'r').read()
        elif len(device_params) == 3:
            return open(f'{DIR}/server/json_files/network_config_3.json', 'r').read()
    elif name == "get_clock_data" and parameter[0] == "time-local":
        template = open(f'{DIR}/server/json_files/get_clock_data_time_local.json', 'r').read()
        data = json.loads(template)
        data["aDeviceResponse"][0]["resultString"] = datetime.now().strftime('%H:%M:%S')
        data["aDeviceResponse"][1]["resultString"] = datetime.now().strftime('%d.%m.%Y')
        return json.dumps(data)
    elif name == "get_clock_data" and parameter[0] == "date-local":
        return open(f'{DIR}/server/json_files/get_clock_data_date_local.json', 'r').read()
    elif name == "get_run_stop_switch_value":
        return open(f'{DIR}/server/json_files/get_run_stop_switch_value.json', 'r').read()
    elif name == "get_led_config":
        return open(f'{DIR}/server/json_files/led.json', 'r').read()
    elif name == "get_wbm_diaglist":
        return open(f'{DIR}/server/json_files/get_wbm_diaglist.json', 'r').read()
    elif name == "get_typelabel_value" and parameter[0] == "SYSDESC":
        return open(f'{DIR}/server/json_files/product_description.json', 'r').read()
    elif name == "get_typelabel_value" and parameter[0] == "ORDER":
        return open(f'{DIR}/server/json_files/get_type_label_value.json', 'r').read()
    elif name == "get_coupler_details":
        return open(f'{DIR}/server/json_files/get_coupler_details.json', 'r').read()
    elif name == "get_codesyscontrol_config":
        return open(f'{DIR}/server/json_files/get_codesyscontrol_config.json', 'r').read()
    return '{}', 404, {'Content-Type': 'text/html; charset=UTF-8'}


@app.route('/')
@log_transport
def init():
    return redirect("/wbm/", code=302)


@app.route('/wbm/php/authentication/login.php', methods=['POST'])
@log_transport
def post_login_php():
    username = json.loads(request.data)["username"]
    return f'{{"status":20,"csrfToken":"","username":"{username}","isDefaultPW":"","errorText":""}}'


@app.route('/wbm/', methods=['GET'])
@log_transport
def get_login():
    return render_template('login.html')


async def init_mongo_connection():
    logger.info(f"Server initializing..")
    client = AsyncIOMotorClient('mongo', 27017, username='root', password='root', authSource='admin')
    await init_beanie(database=client.web, document_models=[Client, Request], multiprocessing_mode=True)
    logger.info(f"Server connected to mongo server..")

asyncio.run(init_mongo_connection())
if __name__ == '__main__':
    app.run()
    # app.run(debug=False, ssl_context=(f'{DIR}/server/ca.crt', f'{DIR}/server/ca.key'))
