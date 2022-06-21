#!/usr/bin/env python3

from flask import Flask, render_template
from methods.fetch import fetch_methods

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates')


@app.route('/')
def index():
    methods = fetch_methods()
    method_names = methods.keys()
    print(method_names)
    return render_template('index.html', methods=methods)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
