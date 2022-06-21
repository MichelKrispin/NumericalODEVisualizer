#!/usr/bin/env python3
import numpy as np
from flask import Flask, jsonify, render_template, request
from methods.fetch import fetch_methods

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates')


@app.route('/')
def index():
    methods = fetch_methods()
    method_names = methods.keys()
    print(methods)
    return render_template('index.html', methods=methods)


@app.route('/compute', methods=['POST'])
def compute():
    print(request.json)
    result = {'x': [], 'y': [], 'y_true': []}
    xs = np.linspace(0, 2*np.pi, 20)
    result['x'] = xs.tolist()
    result['y'] = np.cos(xs).tolist()
    result['y_true'] = np.sin(xs).tolist()
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
