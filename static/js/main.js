import {
  initUpdatingSelectionUI,
  initPlotControlUI,
  initExampleButtons,
  initFunctionEditor,
} from './ui.js';
import { initConnection } from './connection.js';

('use strict');

// Initialize the UI
initUpdatingSelectionUI();
initPlotControlUI();
initExampleButtons();
initFunctionEditor();

// Initialize the connection to populate the UI
initConnection();
