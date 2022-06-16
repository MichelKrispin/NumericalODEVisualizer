import importlib
import os
import pkgutil
from re import sub
import sys
from inspect import getmembers, isfunction


def fetch_methods():
    package = importlib.import_module('methods')
    submodules = {}
    for _, name, _ in pkgutil.walk_packages(package.__path__):
        if name != 'fetch':
            full_name = package.__name__ + '.' + name
            submodules[name] = importlib.import_module(full_name)
    print('Submodules are:')
    for k in submodules.keys():
        print(f'{k}: {submodules[k]}')

    methods = {}
    for module in submodules.keys():
        functions_list = [f for f in getmembers(submodules[module])]
        methods[module] = {}
        for name, f in functions_list:
            if name == 'method':
                methods[module]['method'] = f
            elif name == 'options':
                methods[module]['options'] = f
    print(methods)
    return methods
