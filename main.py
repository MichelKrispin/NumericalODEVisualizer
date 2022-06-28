#!/usr/bin/env python3
import numpy as np
from flask import Flask, jsonify, render_template, request
from methods.fetch import fetch_methods
from examples import examples


def create_functions(function, solution):
    code = ('from numpy import *\n'
            'def function(t, y):\n'
            f'    return np.array([{function}])\n'
            'def solution(t):\n'
            f'    return np.array([{solution}])\n')
    exec(code, globals())


app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates')


@app.route('/')
def index():
    methods = fetch_methods()
    method_names = methods.keys()
    print(methods)
    return render_template('index.html', methods=methods, examples=examples)


@app.route('/get-examples')
def get_examples():
    return jsonify(examples)


@app.route('/compute', methods=['POST'])
def compute():
    # Fetch the selected values
    method_name = request.json['method']
    method_data = fetch_methods()[method_name]
    method = method_data['method']
    option = method_data['options'][request.json['option']]

    y0 = np.array([float(v) for v in request.json['y0'].split(',')])
    t0 = request.json['t0']
    te = request.json['te']

    solution_def = request.json['solution'] if 'solution' in request.json else None
    create_functions(
        request.json['function'], solution_def)

    # Compute the approximation and solution
    t, y = method(function, y0, t0, te, option)
    y_true = solution(t)

    # Convert results to be send over the network
    t = t.tolist()
    y = y.tolist()
    y_true = y_true.tolist() if type(y_true) == np.ndarray else y_true

    # Pack up the results and return them
    result = {'t': t, 'y': y, 'y_true': y_true}
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
