import numpy as np
from typing import Callable, Optional, Tuple


def method(
    f: Callable, y0: np.ndarray, t0: float, te: float, options: Optional[dict] = None
) -> Tuple[np.ndarray, np.ndarray]:
    """Improved euler method with half step size from [t0, te] with y(t0) = y0 and f(t, y) = y'.

    Args:
        f (Callable): f(t, y) = y'(t)
        y0 (np.ndarray): Initial value
        t0 (np.ndarray): Left boundary
        te (np.ndarray): Right boundary
        options (Optional[dict], optional): An optionial options dictionary.

    Returns:
        Tuple(np.ndarray, np.ndarray):  The computed t and y values.
    """
    # Get the step size from the options
    h = options["data"] if options else 0.1
    t = np.arange(t0, te, h)  # Create the t values
    y = np.zeros((len(y0), len(t)))  # Create the resulting y values
    y[:, 0] = y0  # Store the initial value
    for n in range(len(t) - 1):
        h_half = h / 2
        y_n = y[:, n]
        y[:, n + 1] = y_n + h * f(t[n] + h_half, y_n + h_half * f(t[n], y_n))
    return t, y


options = [
    {"name": "Step Size (h): 0.1", "data": 0.1},
    {"name": "Step Size (h): 0.01", "data": 0.01},
    {"name": "Step Size (h): 0.001", "data": 0.001},
    {"name": "Step Size (h): 0.0001", "data": 0.0001},
]
