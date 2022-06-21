('use strict');

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
export const getSelection = () => {
  const methodSelection = document.getElementById(METHOD_ID).value;
  const optionSelection = parseInt(
    document.getElementById(OPTION_ID).value.split('-')[1]
  );
  // Select the first visible children
  return [methodSelection, optionSelection];
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
