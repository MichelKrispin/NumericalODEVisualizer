import numpy as np
from typing import Callable, Optional, Tuple


def method(
    f: Callable, y0: np.ndarray, t0: float, te: float, options: Optional[dict] = None
) -> Tuple[np.ndarray, np.ndarray]:
    """Adaptive euler method wit simple step size control from [t0, te] with y(t0) = y0 and f(t, y) = y'.

    Args:
        f (Callable): f(t, y) = y'(t)
        y0 (np.ndarray): Initial value
        t0 (np.ndarray): Left boundary
        te (np.ndarray): Right boundary
        options (Optional[dict], optional): An optionial options dictionary.

    Returns:
        Tuple(np.array, np.array):  The computed t and y values.
    """
    tolerance = 0.001  # Tolerance value

    h = np.array([0.1])  # Starting h
    h_tmp = h[0]  # Working h

    t = np.array([t0])  # Start the t's
    y = np.zeros((len(y0), 1))  # Create the first y value
    y[:, 0] = y0  # Store the initial value

    n = 0
    while h_tmp > 0:
        y_n = y[:, n]
        y_1 = y_n + h_tmp * f(t[n], y_n)
        y_2 = y_n + h_tmp / 2 * f(t[n], y_n)
        y_2 = y_2 + h_tmp / 2 * f(t[n] + h_tmp / 2, y_2)
        phi = 2 * np.linalg.norm(y_2 - y_1)

        h_new = h_tmp * min(max(0.9 * np.sqrt(tolerance / phi), 0.2), 10)
        if phi > tolerance:
            h_tmp = h_new
        else:
            h = np.concatenate((h, np.array([h_tmp])))
            t = np.concatenate((t, np.array([t[n] + h[n]])))
            y = np.concatenate((y, (2 * y_2 - y_1).reshape(-1, 1)), axis=1)
            h_tmp = min(te - t[n + 1], h_new)
            n += 1
    return t, y


options = [
    {"name": "No options.", "data": None},
]
