from flask import Flask, request, jsonify
import threading
import time

app = Flask(__name__)

# Simulated PLC Tags (Data Storage)
plc_data = {
    "Tag1": 42,
    "Tag2": 3.14,
    "Tag3": "Hello EtherNet/IP"
}

@app.route('/read/<tag>', methods=['GET'])
def read_tag(tag):
    """Simulate reading a tag from the PLC."""
    value = plc_data.get(tag, "Tag Not Found")
    return jsonify({"tag": tag, "value": value})

@app.route('/write/<tag>', methods=['POST'])
def write_tag(tag):
    """Simulate writing a tag to the PLC."""
    data = request.json
    value = data.get("value", None)
    if value is not None:
        plc_data[tag] = value
        return jsonify({"tag": tag, "new_value": value})
    else:
        return jsonify({"error": "Invalid data"}), 400

def run_server():
    app.run(host="0.0.0.0", port=5000, debug=False)

if __name__ == "__main__":
    print("Starting EtherNet/IP Server (Simulated PLC)...")
    server_thread = threading.Thread(target=run_server)
    server_thread.start()
