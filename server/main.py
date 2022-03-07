
from flask import Flask, request
from flask_cors import *
from gevent import pywsgi

app = Flask(__name__)
global messages
global location
messages = "Teacher Cui's greetings"
location = 0


@app.route("/")
def post():
    global messages
    global location
    messages = request.args.get('message')
    location = request.args.get('location')
    return "ok"


@app.route("/get")
def get():
    print(messages)
    return {
        "messages": messages,
        "location": location
    }


if __name__ == '__main__':
    CORS(app, supports_credentials=True)
    app.config['ENV'] = "production"
    # server = pywsgi.WSGIServer(('0.0.0.0', 8080), app)
    # server.serve_forever()
    app.run(host="0.0.0.0", port=8080)
