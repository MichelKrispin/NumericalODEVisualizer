import numpy as np


def method(f, y0, t0, te, options=None):
    """Simple explicit euler method from [t0, te] with y(t0) = y0 and f(t, y) = y'.

    Args:
        f (function): f(t, y) = y'(t)
        y0 (float): Initial value
        t0 (float): Left boundary
        te (float): Right boundary
        options (dict, optional): An optionial options dictionary.

    Returns:
        list(float): The computed y values.
    """
    print('Calling the euler method')
    h = options['data']       # Get the step size from the options
    t = np.arange(t0, te, h)  # Create the t values
    y = np.zeros(t.shape)     # Create the resulting y values
    y[0] = y0                 # Store the initial value
    for n in range(len(t)-1):
        y[n+1] = y[n] + f(t[n], y[n]) * h
    return y


options = [
    {'name': 'Step Size (h): 0.001', 'data': 0.001},
    {'name': 'Step Size (h): 0.0001', 'data': 0.0001},
]
