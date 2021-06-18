// ********************************************************
// ********************** IMPORTS *************************
// ********************************************************

import {
  submitUserSearch,
  closeSuggestionsContainer,
  resetSearch,
  selectSecurity,
  removeSecurity,
  portfolioSubmission,
} from "./modules/event-listener.mjs";

// ********************************************************
// ********************** INIT FUNCTION *******************
// ********************************************************

const init = () => {
  submitUserSearch();
  closeSuggestionsContainer();
  resetSearch();
  selectSecurity();
  removeSecurity();
  portfolioSubmission();
};

// ********************************************************
// ********************* DOCUMENT READY *******************
// ********************************************************

$(document).ready(() => {
  init();
});
