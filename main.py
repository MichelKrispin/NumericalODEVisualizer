#!/usr/bin/env python3

from flask import Flask, send_from_directory
from methods.euler import method, options

app = Flask(__name__,
            static_url_path='',
            static_folder='static',)


@app.route('/')
def index():
    method()
    print(options(0), options(1))
    return send_from_directory('static', 'index.html')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
