import { plot } from './plot.js';
import { getSelections } from './ui.js';

('use strict');

const computePlots = () => {
  const [
    functionSelection,
    solutionSelection,
    y0Selection,
    t0Selection,
    teSelection,
    methodSelection,
    optionSelection,
  ] = getSelections();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/compute', true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.response);
      plot(data['t'], data['y'], data['y_true']);
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(
    JSON.stringify({
      function: functionSelection,
      solution: solutionSelection,
      y0: y0Selection,
      t0: t0Selection,
      te: teSelection,
      method: methodSelection,
      option: optionSelection,
    })
  );
};

export const initConnection = () => {
  document.getElementById('compute-button').onclick = computePlots;
};
