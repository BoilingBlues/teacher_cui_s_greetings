from urllib import request
from flask import Flask
from gevent import pywsgi

app = Flask(__name__)
global messages
global location
messages = "Teacher Cui's greetings"
location = 0


@app.route("/", methods=['POST'])
def post():
    global message
    global location
    message = request.json['message']
    location = request.json['location']
    return


@app.route("/get")
def get():
    return {
        "messages": messages,
        "location": location
    }


if __name__ == '__main__':
    app.config['ENV'] = "production"
    server = pywsgi.WSGIServer(('0.0.0.0', 8080), app)
    server.serve_forever()
