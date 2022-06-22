import numpy as np
from typing import Callable, List, Optional


def method(f: Callable, y0: float, t0: float, te: float, options: Optional[dict] = None) -> tuple[List[float], List[float]]:
    """Simple explicit euler method from [t0, te] with y(t0) = y0 and f(t, y) = y'.

    Args:
        f (Callable): f(t, y) = y'(t)
        y0 (float): Initial value
        t0 (float): Left boundary
        te (float): Right boundary
        options (Optional[dict], optional): An optionial options dictionary.

    Returns:
        Tuple(List[float], List[float]):  The computed t and y values.
    """
    print('Calling the euler method')
    # Get the step size from the options
    h = options['data'] if options else 0.1
    t = np.arange(t0, te, h)  # Create the t values
    y = np.zeros(t.shape)     # Create the resulting y values
    y[0] = y0                 # Store the initial value
    for n in range(len(t)-1):
        y[n+1] = y[n] + f(t[n], y[n]) * h
    return t.tolist(), y.tolist()


options = [
    {'name': 'Step Size (h): 0.1', 'data': 0.1},
    {'name': 'Step Size (h): 0.01', 'data': 0.01},
    {'name': 'Step Size (h): 0.001', 'data': 0.001},
    {'name': 'Step Size (h): 0.0001', 'data': 0.0001},
]
