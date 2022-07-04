import { updatePlotData } from './plot.js';
import { getSelections } from './ui.js';

('use strict');

export const computePlots = () => {
  let functionSelection,
    solutionSelection,
    y0Selection,
    t0Selection,
    teSelection,
    methodSelection,
    optionSelection;
  try {
    [
      functionSelection,
      solutionSelection,
      y0Selection,
      t0Selection,
      teSelection,
      methodSelection,
      optionSelection,
    ] = getSelections();
  } catch (error) {
    alert(error);
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/compute', true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.response);
      updatePlotData(data['t'], data['y'], data['y_true']);
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

export const getExampleData = (callback) => {
  // callback is a function that gets the response examples as argument
  // Send a get request to the server to ask for the examples
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/get-examples');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const examples = JSON.parse(xhr.response);
      callback(examples);
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
};
