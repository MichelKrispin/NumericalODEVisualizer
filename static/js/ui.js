import { getExampleData, computePlots } from './connection.js';

('use strict');

// =========================================================
//                   Compute Button
// =========================================================

export const initComputeButton = () => {
  // Initialized the compute button with the computePlots
  // to send everything to the server
  document.getElementById('compute-button').onclick = computePlots;
};

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
 * @returns The values of the selection divs, [string, ..., string]
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

export const getCurrentCacheId = () => {
  // Putting together the current cache id. `solution` is a bool whether
  // id is for the solution or for the function.
  const f = document.getElementById(FUNCTION_ID).value.replace(/\s/g, ''); // Remove all spaces
  const method = document.getElementById(METHOD_ID).value;
  const option = parseInt(
    document.getElementById(OPTION_ID).value.split('-')[1]
  );
  const y0 = document.getElementById(Y0_ID).value;
  const t0 = document.getElementById(T0_ID).value;
  const te = document.getElementById(TE_ID).value;
  return `${f};${method};${option};${y0};${t0};${te}`;
};

export const addCacheToggle = (cacheId, callbackFn) => {
  // Adds a new checkbox which then calls the callbackFn on click
  // with it the cacheId and the checkbox value (true or false)
  // so callbackFn(cacheId, checkboxValue)

  const splitted = cacheId.split(';');
  const pretty =
    splitted[1]
      .replace(/_/g, ' ')
      .replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
      }) + // Make title of method name
    ': `' +
    splitted[0]
      .replace(/\[(\d)\]/g, '_{$1}') // [i] with _{i}
      .replace(/\*\*/g, '^') // ** with ^
      .replace(/\*/g, '') +
    `; y(0) = ${splitted[3]}; t \\in [${splitted[4]}, ${splitted[5]}]\``;

  const plotCacheDiv = document.getElementById('plot-cache');
  plotCacheDiv.insertAdjacentHTML(
    'beforeend',
    `
<label>
  <input
    id="plot-cache-${cacheId}"
    class="uk-checkbox"
    type="checkbox"
    checked
  />
  ${pretty}
</label>
`
  );
  MathJax.typesetPromise([plotCacheDiv]);

  const checkbox = document.getElementById(`plot-cache-${cacheId}`);
  checkbox.onclick = () => {
    callbackFn(cacheId, checkbox.checked);
  };
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
        document.getElementById(FUNCTION_ID).value = data['function'];
        document.getElementById(SOLUTION_ID).value = data['solution'];
        document.getElementById(Y0_ID).value = data['y0'];
        document.getElementById(T0_ID).value = parseFloat(data['t0']);
        document.getElementById(TE_ID).value = parseFloat(data['te']);
      };
    };

    const buttonIdTemplate = 'btn-example-';
    let button;
    // Loop trough all example buttons and set their click function
    let idx = 0;
    while ((button = document.getElementById(buttonIdTemplate + idx))) {
      button.onclick = onClickFn(idx);
      button.setAttribute('uk-tooltip', exampleData[idx]['tooltip']);
      idx++;
    }
  });
};

/**
 * Just return the currently selected method and make it prettier
 * by capitalizing it and turning '_' into ' '.
 * @returns String
 */
export const getUsedMethod = () => {
  const method = document.getElementById(METHOD_ID).value;
  return method
    .replace(/_/g, ' ')
    .replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
      return letter.toUpperCase();
    });
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
    let currentFunction = document.getElementById(FUNCTION_ID).value;
    functionArea.value = currentFunction.replace(/(, )|(,)/gm, ',\n');
    renderMathExpressionToLatex();
  };

  // Edit the set function to update the function in the selection
  document.getElementById('editor-set-function').onclick = () => {
    document.getElementById(FUNCTION_ID).value =
      document.getElementById('editor-function').value;
  };
};
