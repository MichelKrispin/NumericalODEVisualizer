import { updatePlotControlInfo } from './ui.js';

('use strict');

// Save the variables globally
let T;
let Y;
let YS; // Solution
let idx; // The current step

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

/**
 * Create a new plot or update the old one.
 * @param {[Array[float], Array[float]]} data [Approximation, Solution] as plotly data
 */
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
const plot = (t, y, yTrue) => {
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

// =========================================================
//                   Global Control
// =========================================================

export const showNextStep = () => {
  // Only do something if there is more
  if (plotCreated && idx < YS.length) {
    idx++;
    plot(T.slice(0, idx), Y.slice(0, idx), YS.slice(0, idx));
    updatePlotControlInfo(idx, YS.length);
  }
};

export const showLastStep = () => {
  // Only do something if there is more
  if (plotCreated && idx > 2) {
    idx--;
    plot(T.slice(0, idx), Y.slice(0, idx), YS.slice(0, idx));
    updatePlotControlInfo(idx, YS.length);
  }
};

export const showFirstStep = () => {
  if (!plotCreated) return;
  idx = 2;
  plot(T.slice(0, idx), Y.slice(0, idx), YS.slice(0, idx));
  updatePlotControlInfo(idx, YS.length);
};

export const showLatestStep = () => {
  if (!plotCreated) return;
  idx = YS.length;
  plot(T.slice(0, idx), Y.slice(0, idx), YS.slice(0, idx));
  updatePlotControlInfo(idx, YS.length);
};

export const showStepAt = (setStep) => {
  if (!plotCreated) {
    updatePlotControlInfo('-', '-');
    return;
  }
  if (setStep > 1 && setStep < YS.length) {
    idx = setStep;
    plot(T.slice(0, idx), Y.slice(0, idx), YS.slice(0, idx));
  }
  updatePlotControlInfo(idx, YS.length);
};

/**
 * Call from outside to update the plot data completely.
 * @param {Array[float]} t
 * @param {Array[float]} y
 * @param {Array[float]} ys
 */
export const updatePlotData = (t, y, ys) => {
  T = t;
  Y = y;
  YS = ys;
  idx = YS.length;
  updatePlotControlInfo(idx, YS.length);
  plot(T, Y, YS);
};
