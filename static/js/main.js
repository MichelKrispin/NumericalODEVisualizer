import {
  initUpdatingSelectionUI,
  initPlotControlUI,
  initExampleButtons,
} from './ui.js';
import { initConnection } from './connection.js';

('use strict');

// Initialize the UI
initUpdatingSelectionUI();
initPlotControlUI();
initExampleButtons();

// Initialize the connection to populate the UI
initConnection();
