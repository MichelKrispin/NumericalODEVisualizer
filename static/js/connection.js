import { plot } from './plot.js';

('use strict');

const computePlots = () => {
  console.log('Computing...');
};

export const initConnection = () => {
  document.getElementById('compute-button').onclick = computePlots;
};
