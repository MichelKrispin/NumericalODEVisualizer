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
    print(methods)
    return render_template('index.html', methods=methods)


@app.route('/compute', methods=['POST'])
def compute():
    xs = np.linspace(0, 2*np.pi, 100)
    ys = np.cos(ys)
    return jsonify({'x': xs, 'y': ys})


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
