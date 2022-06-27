import { getExampleData } from './connection.js';

('use strict');

const FUNCTION_ID = 'select-function';
const SOLUTION_ID = 'select-solution';
const Y0_ID = 'select-y0';
const T0_ID = 'select-t0';
const TE_ID = 'select-te';
const METHOD_ID = 'select-method';
const OPTION_ID = 'select-option';

const updateSelectOption = (event) => {
  // Hide the options for the non-active method
  const selectedMethod = event.target ? event.target.value : event;
  const optionSelection = document.getElementById(OPTION_ID);

  // Hide all children if they belong to non-activate method
  const children = optionSelection.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].value.startsWith(selectedMethod)) {
      children[i].style.display = 'block';
    } else {
      children[i].style.display = 'none';
    }
  }

  // Select the first visible children
  for (let i = 0; i < children.length; i++) {
    if (children[i].value.startsWith(selectedMethod)) {
      optionSelection.value = children[i].value;
      break;
    }
  }
};

/**
 * Queries the selection divs.
 * @returns The values of the selection divs, [string, int]
 */
export const getSelections = () => {
  // Get div elements
  const functionSelection = document.getElementById(FUNCTION_ID).value;
  const solutionSelection = document.getElementById(SOLUTION_ID).value;
  const y0Selection = parseFloat(document.getElementById(Y0_ID).value);
  const t0Selection = parseFloat(document.getElementById(T0_ID).value);
  const teSelection = parseFloat(document.getElementById(TE_ID).value);
  const methodSelection = document.getElementById(METHOD_ID).value;
  const optionSelection = parseInt(
    document.getElementById(OPTION_ID).value.split('-')[1]
  );

  // Check values for correct type
  if (!functionSelection || typeof functionSelection !== 'string') {
    throw 'Function must be a string';
  }
  if (!solutionSelection || typeof solutionSelection !== 'string') {
    throw 'Solution must be a string';
  }
  if (
    isNaN(y0Selection) ||
    typeof y0Selection !== 'number' ||
    isNaN(t0Selection) ||
    typeof t0Selection !== 'number' ||
    isNaN(teSelection) ||
    typeof teSelection !== 'number'
  ) {
    throw 'y0, t0 and te must be a valid number';
  } else {
    if (t0Selection >= teSelection) {
      throw 't0 must be smaller than te';
    }
  }
  return [
    functionSelection,
    solutionSelection,
    y0Selection,
    t0Selection,
    teSelection,
    methodSelection,
    optionSelection,
  ];
};

export const initUpdatingSelectionUI = () => {
  // Bind the update method
  const methodSelection = document.getElementById(METHOD_ID);
  methodSelection.onchange = (event) => {
    updateSelectOption(event);
  };
  // Then call it once on initialization
  updateSelectOption(methodSelection.value);
};

export const initExampleButtons = () => {
  // Ask the server for the example data
  getExampleData((exampleData) => {
    const onClickFn = (index) => {
      return () => {
        const data = exampleData[index];
        document.getElementById('select-function').value = data['function'];
        document.getElementById('select-solution').value = data['solution'];
        document.getElementById('select-y0').value = parseFloat(data['y0']);
        document.getElementById('select-t0').value = parseFloat(data['t0']);
        document.getElementById('select-te').value = parseFloat(data['te']);
      };
    };

    const buttonIdTemplate = 'btn-example-';
    let button;
    // Loop trough all example buttons and set their click function
    let idx = 0;
    while ((button = document.getElementById(buttonIdTemplate + idx))) {
      button.onclick = onClickFn(idx);
      idx++;
    }
  });
};
