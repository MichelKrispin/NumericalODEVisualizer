import numpy as np
from typing import Callable, Optional, Tuple


def method(
    f: Callable, y0: np.ndarray, t0: float, te: float, options: Optional[dict] = None
) -> Tuple[np.ndarray, np.ndarray]:
    """A new method.

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
    # Then do something
    if options is not None and "a" in options["data"]:
        print(options["data"]["a"])
    return t, y


options = [
    {
        "name": "Option",
        "data": {"a": 1, "b": 2},
    },
    {"name": "Step Size (h): 0.01", "data": 0.01},
]
