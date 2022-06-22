//import { callPlotly } from './exportPlotly.js';

('use strict');

let plotCreated = false;
let layout = {
  xaxis: { title: 't' },
  yaxis: { title: "y'" },
  showLegend: true,
  legend: {
    orientation: 'h',
    x: 0.3,
    xanchor: 'top',
    y: 1.1,
  },
};

const updatePlot = (data) => {
  if (!plotCreated) {
    Plotly.newPlot('plot', data, layout);
    plotCreated = true;
  } else {
    Plotly.deleteTraces('plot', [-2, -1]);
    Plotly.addTraces('plot', data);
  }
};

/**
 * Give it some x and y and it will plot it to the screen.
 * @param {Array[float]} xs
 * @param {Array[float]} ys
 */
export const plot = (t, y, yTrue) => {
  // Generate the data structures
  const approximation = {
    x: t,
    y: y,
    mode: 'lines',
    name: 'Approximation',
  };

  const solution = {
    x: t,
    y: yTrue,
    mode: 'lines',
    name: 'Solution',
  };

  updatePlot([approximation, solution]);
};
