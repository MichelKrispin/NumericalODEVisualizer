import { plot } from './plot.js';
import { getSelection } from './ui.js';

('use strict');

const computePlots = () => {
  const [methodSelection, optionSelection] = getSelection();

  console.log('Computing...', methodSelection, optionSelection);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/compute', true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.response);
      plot(data['x'], data['y'], data['y_true']);
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(
    JSON.stringify({
      function: 'sin(x)+x**2',
      solution: '',
      method: methodSelection,
      option: optionSelection,
    })
  );
};

export const initConnection = () => {
  document.getElementById('compute-button').onclick = computePlots;
};
