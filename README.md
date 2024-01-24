# Ordinary Differential Equation Visualizer

A website to visualize different numerical ordinary differential equation solvers to understand how these numerical methods work.
The solvers are written in python and loaded dynamically such that editing and writing new methods is very easy.

> [!WARNING]
> Arbitrary code can be executed, so this project should not be run on a public server!
> As a proof, set the following as a function and compute: `]), eval('open("hello.txt", "w").write("hello")') #`.

## Installation

Install with

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

Then head over to `http://127.0.0.1:8000/` to see the visualization frontend.

## Usage

There are multiple example functions defined, and any valid python can be used for new functions.
It is also possible to set multidimensional functions.
The easiest way to see what is possible is to click on the example functions on the bottom left, change the function itself as well as the parameters.

## New Methods

Adding new methods is really simple.
Just copy an existing file inside the `methods` directory and rename it to a useful name.
Then change the internals of the `method` function without giving this python method a new name!
A sample function is `methods/new_function.py`.
If needed, different options can be set as shown in `methods/butcher.py` which are then dynamically loaded up and one is able to select them on the website.
The methods are loaded dynamically, i.e., editing a method and saving it will result in a server reload and therefore clicking compute on the website will use the latest edit while loading newly created methods needs a page reload.
