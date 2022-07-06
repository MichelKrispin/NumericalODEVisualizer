import { getCurrentCacheId, addCacheToggle } from './ui.js';

('use strict');

// Save the variables globally
let Cache = {};

let T;
let Y;
let YS; // Solution

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
    while (document.getElementById('plot').data.length > 0) {
      Plotly.deleteTraces('plot', 0);
    }
    Plotly.addTraces('plot', data);
  }
};

/**
 * Give it some x and y and it will plot it to the screen.
 * @param {Array[float]} xs
 * @param {Array[float]} ys
 */
const plot = () => {
  // Generate the data structures
  const data = [];

  for (const [key, elem] of Object.entries(Cache)) {
    if (elem.show) {
      const methodName = key
        .split(';')[1]
        .replace(/_/g, ' ')
        .replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
          return letter.toUpperCase();
        });
      elem.y.map((yi, i) => {
        data.push({
          x: elem.t,
          y: yi,
          mode: 'lines',
          name: methodName + ' y' + i,
        });
      });

      if (elem.ys) {
        elem.ys.map((yi, i) => {
          data.push({
            x: elem.t,
            y: yi,
            mode: 'lines',
            name: 'Solution ' + i + ' ' + methodName,
            line: {
              dash: 'dashdot',
              width: 2,
            },
          });
        });
      }
    }
  }

  updatePlot(data);
};

/**
 * Call from outside to update the plot data completely.
 * @param {Array[float]} t
 * @param {Array[float]} y
 * @param {Array[float]} ys
 */
export const updatePlotData = (t, y, ys) => {
  // On updating add a new checkbox
  const cacheId = getCurrentCacheId();

  if (!(cacheId in Cache)) {
    addCacheToggle(cacheId, (id, value) => {
      Cache[id].show = value;
      plot();
    });
  }

  // Then update the cache and the plot
  Cache[cacheId] = {
    t: t,
    y: y,
    ys: ys,
    show: true,
  };
  T = t;
  Y = y;
  YS = ys;
  plot();
};
