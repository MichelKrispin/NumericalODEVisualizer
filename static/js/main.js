"use strict";

const N = 100;
const xs = [...Array(N).keys()].map((x) => 2 * Math.PI * (x / N));

const trace1 = {
  x: xs,
  y: xs.map((x) => Math.cos(x)),
  mode: "lines",
  name: "Solution",
};

const trace2 = {
  x: xs,
  y: xs.map((x) => Math.sin(x)),
  mode: "lines",
  name: "Numerical",
};

const layout = {
  title: "Comparison plot",
};

const data = [trace1, trace2];

Plotly.newPlot("plot", data, layout);
