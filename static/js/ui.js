import { getExampleData } from './connection.js';
import {
  showFirstStep,
  showNextStep,
  showLastStep,
  showLatestStep,
  showStepAt,
} from './plot.js';

('use strict');

// =========================================================
//                 Selection Dropdowns
// =========================================================

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
  const y0Selection = document.getElementById(Y0_ID).value;
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
  if (typeof solutionSelection !== 'string') {
    throw 'Solution must be a string';
  }
  if (!y0Selection || typeof y0Selection !== 'string') {
    throw 'y0 must be a number or a string separated by ,';
  }
  if (
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

/**
 * Set the onchange function for the method selection dropdown.
 */
export const initUpdatingSelectionUI = () => {
  // Bind the update method
  const methodSelection = document.getElementById(METHOD_ID);
  methodSelection.onchange = (event) => {
    updateSelectOption(event);
  };
  // Then call it once on initialization
  updateSelectOption(methodSelection.value);
};

// =========================================================
//                     Plot Control
// =========================================================

/**
 * Set the onclick and onchange functions for the plot control.
 */
export const initPlotControlUI = () => {
  // The current step value as an input
  document.getElementById('control-current-step').onchange = () => {
    const currentStep = document.getElementById('control-current-step').value;
    showStepAt(currentStep);
  };

  // The control buttons
  document.getElementById('control-forward').onclick = () => {
    showNextStep();
  };
  document.getElementById('control-backwards').onclick = () => {
    showLastStep();
  };
  document.getElementById('control-first').onclick = () => {
    showFirstStep();
  };
  document.getElementById('control-last').onclick = () => {
    showLatestStep();
  };
};

export const updatePlotControlInfo = (currentStep, maxStep) => {
  document.getElementById('control-current-step').value = currentStep;
  document.getElementById('control-num-steps').innerHTML = maxStep;
};

// =========================================================
//                    Example Buttons
// =========================================================

/**
 * Initialize the example buttons with the correct callback functions.
 */
export const initExampleButtons = () => {
  // Ask the server for the example data
  getExampleData((exampleData) => {
    const onClickFn = (index) => {
      return () => {
        const data = exampleData[index];
        document.getElementById('select-function').value = data['function'];
        document.getElementById('select-solution').value = data['solution'];
        document.getElementById('select-y0').value = data['y0'];
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

export const getUsedMethod = () => {
  // Just return the currently selected method
  const method = document.getElementById(METHOD_ID).value;
  return method.charAt(0).toUpperCase() + method.slice(1);
};

// =========================================================
//                   Function Editor
// =========================================================

const renderMathExpressionToLatex = () => {
  // Replace some parts of the equation and then rerender the LaTeX expression
  let expression = document.getElementById('editor-function').value;
  expression = expression
    .replace(/\[(\d)\]/g, '_{$1}') // [i] with _{i}
    .replace(/\*\*/g, '^') // ** with ^
    .replace(/\*/g, ''); // Remove multiplication *
  const node = document.getElementById('editor-math');
  MathJax.typesetClear([node]);
  expression = '`' + expression.split(',').join('`<br />`') + '`';
  node.innerHTML = expression;
  MathJax.typesetPromise([node]);
};

export const initFunctionEditor = () => {
  // Rerender the equation on each change
  const functionArea = document.getElementById('editor-function');
  functionArea.onkeyup = () => {
    renderMathExpressionToLatex();
  };

  // On opening set the value of the editor text area
  document.getElementById('editor-open').onclick = () => {
    let currentFunction = document.getElementById('select-function').value;
    functionArea.value = currentFunction.replace(/(, )|(,)/gm, ',\n');
    renderMathExpressionToLatex();
  };

  // Edit the set function to update the function in the selection
  document.getElementById('editor-set-function').onclick = () => {
    document.getElementById('select-function').value =
      document.getElementById('editor-function').value;
  };
};
