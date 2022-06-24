#!/usr/bin/env python3
import numpy as np
from flask import Flask, jsonify, render_template, request
from methods.fetch import fetch_methods


def create_functions(function, solution):
    code = ('from numpy import *\n'
            'def function(t, y):\n'
            f'    return {function}\n'
            'def solution(t):\n'
            f'    return {solution}\n')
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
    return render_template('index.html', methods=methods)


@app.route('/compute', methods=['POST'])
def compute():
    print(request.json)

    # Fetch the selected values
    method_name = request.json['method']
    method_data = fetch_methods()[method_name]
    method = method_data['method']
    option = method_data['options'][request.json['option']]
    y0 = request.json['y0']
    t0 = request.json['t0']
    te = request.json['te']
    create_functions(
        request.json['function'], request.json['solution'])

    # Compute the approximation and solution
    t, y = method(function, y0, t0, te, option)

    # Create the results and return them
    result = {'t': t, 'y': y, 'y_true': solution(np.array(t)).tolist()}
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
