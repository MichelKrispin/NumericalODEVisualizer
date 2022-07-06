import numpy as np
from typing import Callable, Optional, Tuple


def method(f: Callable,
           y0: np.array,
           t0: float,
           te: float,
           options: Optional[dict] = None) -> Tuple[np.array, np.array]:
    """Improved euler method with half step size from [t0, te] with y(t0) = y0 and f(t, y) = y'.

    Args:
        f (Callable): f(t, y) = y'(t)
        y0 (np.array): Initial value
        t0 (np.array): Left boundary
        te (np.array): Right boundary
        options (Optional[dict], optional): An optionial options dictionary.

    Returns:
        Tuple(np.array, np.array):  The computed t and y values.
    """
    # Get the options
    a = np.array(options['data']['a'])
    B = np.array(options['data']['B'])
    c = np.array(options['data']['c'])
    s = len(a)
    k = [0.0 for _ in range(s)]

    h = 0.1
    t = np.arange(t0, te, h)  # Create the t values
    y = np.zeros((len(y0), len(t)))  # Create the resulting y values
    y[:, 0] = y0  # Store the initial value

    for n in range(len(t) - 1):
        y_n = y[:, n]
        for i in range(s):
            sum_list = [B[i, j] * k[j] for j in range(i)]
            k[i] = f(t[i] + a[i] * h, y_n + h * np.sum(sum_list))
        sum_list = [c[i] * k[i] for i in range(s)]
        y[:, n + 1] = y_n + h * np.sum(sum_list)
    return t, y


options = [
    {
        'name': 'a=(0,1/2), B=(0,0)|(1/2,0), c=(0,1)',
        'data': {
            'a': [0, 1 / 2],
            'B': [[0, 0], [1 / 2, 0]],
            'c': [0, 1],
        },
    },
    {
        'name': 'a=(0,1), B=(0,0)|(1,0), c=(1/2,1/2)',
        'data': {
            'a': np.array([0, 1]),
            'B': np.array([[0, 0], [1, 0]]),
            'c': np.array([1 / 2, 1 / 2]),
        },
    },
]
