('use strict');

let plotCreated = false;
let layout = {
  title: 'Comparison plot',
};

const updatePlot = (data) => {
  if (!plotCreated) {
    plotly = Plotly.newPlot('plot', data, layout);
    plotCreated = true;
  } else {
    Plotly.update('plot,', data, layout);
  }
};

/**
 * Give it some x and y and it will plot it to the screen.
 * @param {Array[float]} xs
 * @param {Array[float]} ys
 */
export const plot = (xs, ys) => {
  // Generate the data structures
  const approximation = {
    x: xs,
    y: ys,
    mode: 'lines',
    name: 'Approximation',
  };

  const solution = {
    x: xs,
    y: ys + 0.1,
    mode: 'lines',
    name: 'Solution',
  };

  updatePlot([approximation, solution]);
};
