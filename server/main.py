

from traceback import print_tb
from flask import Flask, request
from flask_cors import *
import json
from gevent import pywsgi

app = Flask(__name__)
global messages
global location_level
global location_vertical
global fontSize
messages = "Teacher Cui's greetings"
location_level = 0
location_vertical = 0
fontSize = 100


@app.route("/", methods=['POST'])
def post():
    global messages
    global location_level
    global location_vertical
    global fontSize
    data_ = request.get_data()
    data = json.loads(data_)
    messages = data["messages"]
    location_level = data["location_level"]
    location_vertical = data["location_vertical"]
    fontSize = data["fontsize"]
    return "ok"


@app.route("/get")
def get():
    return {
        "messages": messages,
        "location_level": location_level,
        "location_vertical": location_vertical,
        "fontsize": fontSize
    }


if __name__ == '__main__':
    CORS(app, supports_credentials=True)
    app.config['ENV'] = "production"
    # server = pywsgi.WSGIServer(('0.0.0.0', 8080), app)
    # server.serve_forever()
    app.run(host="0.0.0.0", port=8080)
