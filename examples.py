examples = [
    {
        'function': '2-exp(-4*t)-2*y',
        'solution': '1 + 1/2 * exp(-4*t) - 1/2 * exp(-2*t)',
        'y0': 1, 't0': 0, 'te': 1
    },
    {
        'function': 'y',
        'solution': 'exp(t)',
        'y0': 1, 't0': 0, 'te': 5
    },
    {
        'function': '0.9 * y[0] - 0.1 * y[0] * y[1], 0.1 * y[0] * y[1] - 9 * y[1]',
        'solution': '',
        'y0': [100, 10], 't0': 0, 'te': 5
    },
]
