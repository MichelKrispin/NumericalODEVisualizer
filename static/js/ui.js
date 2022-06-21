('use strict');

const updateSelectOption = (event) => {
  // Hide the options for the non-active method
  const selectedMethod = event.target ? event.target.value : event;
  const optionSelection = document.getElementById('select-option');

  // Hide all children if they belong to non-activate method
  const children = optionSelection.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].value === selectedMethod) {
      children[i].style.display = 'block';
    } else {
      children[i].style.display = 'none';
    }
  }

  // Select the first visible children
  for (let i = 0; i < children.length; i++) {
    if (children[i].value === selectedMethod) {
      optionSelection.value = children[i].value;
      break;
    }
  }
};

export const initUpdatingUI = () => {
  // Bind the update method
  const methodSelection = document.getElementById('select-method');
  methodSelection.onchange = (event) => {
    updateSelectOption(event);
  };
  // Then call it once on initialization
  updateSelectOption(methodSelection.value);
};
