examples = [
    {
        'tooltip': 'Some example.',
        'function': '2-exp(-4*t)-2*y',
        'solution': '1 + 1/2 * exp(-4*t) - 1/2 * exp(-2*t)',
        'y0': 1, 't0': 0, 'te': 1
    },
    {
        'tooltip': 'Very simple example.',
        'function': 'y',
        'solution': 'exp(t)',
        'y0': 1, 't0': 0, 'te': 5
    },
    {
        'tooltip': 'Predator prey model.',
        'function': '0.9 * y[0] - 0.1 * y[0] * y[1], 0.1 * y[0] * y[1] - 9 * y[1]',
        'solution': '',
        'y0': [100, 10], 't0': 0, 'te': 5
    },
    {
        'tooltip': 'Converging to 3.',
        'function': '3*y - y**2',
        'solution': '(3*exp(3*t))/(1/5 + exp(3*t))',
        'y0': 2.5, 't0': 0, 'te': 5
    },
]
