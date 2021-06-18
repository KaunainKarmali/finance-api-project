import { truncateString } from "./utils.mjs";

// ********************************************
// *******************HTML*********************
// ********************************************
const addBtnHTML = () => {
  return `
    <button class="add-btn">
      <i class="fas fa-plus add-icon"></i>
    </button>`;
};

const removeBtnHTML = () => {
  return `
    <button class="remove-btn">
      <i class="fas fa-minus"></i>
    </button>`;
};

const searchResultRowHTML = (symbol, name, securitiesObj) => {
  // Truncate if the string is too long
  const trucatedName = truncateString(name, 50);
  const truncatedSymbol = truncateString(symbol, 8);

  // add or remove button to be appended to the search result depending on whether user has already included it in their selection or not
  const addBtn = addBtnHTML();
  const removeBtn = removeBtnHTML();

  // If the security has been selected, display the remove button, else display add button
  return `
    <div class="search-result-row">
        <span id="result-${symbol}" class="result-symbol">${truncatedSymbol}</span>
        <span id="result-${name}" class="result-name">${trucatedName}</span>
        ${symbol in securitiesObj ? removeBtn : addBtn}  
    </div>`;
};

const removeIconHTML = () => {
  return `<i class="fas fa-minus"></i>`;
};

const addIconHTML = () => {
  return `<i class="fas fa-plus add-icon"></i>`;
};

const selectedSecurityHTML = (symbol, name) => {
  return `
    <div id="${symbol}" class="selection" style="display: none;">
      <form class="selected-security-form" action="" method="get">
        <p class="selected-ticker">${truncateString(symbol, 8)}</p>
        <p class="selected-company">${truncateString(name, 25)}</p>
        <button class="remove-selection-btn" type="submit">
          <i class="fas fa-times remove-selection-icon"></i>
        </button>
      </form>
    </div>
  `;
};

const noResultHTML = () => {
  return `
    <div class="search-result-row">
        <span class="result-symbol">No results found.</span>
    </div>`;
};

const apiErrorMessageHTML = () => {
  return `
    <div class="search-result-row">
        Error fetching search results, please try again later.
    </div>`;
};

// ****************************************************
// *******************DISPLAY FUNCTIONS****************
// ****************************************************

// Output a single search result to the screen
export const displayEachSearchSuggestion = (
  symbol,
  name,
  securitiesObj,
  selector
) => {
  // Create and append result to the page
  const searchResultRow = searchResultRowHTML(symbol, name, securitiesObj);

  selector.append(searchResultRow);
};

// Display the remove button
export const displayRemoveButton = (selector) => {
  const icon = removeIconHTML();

  selector
    .find(".add-btn")
    .removeClass("add-btn")
    .addClass("remove-btn")
    .empty()
    .append(icon);
};

// Display the add button
export const displayAddButton = (selector) => {
  const icon = addIconHTML();

  selector
    .find(".remove-btn")
    .removeClass("remove-btn")
    .addClass("add-btn")
    .empty()
    .append(icon);
};

// Display the security selected back to the user
export const displaySelectedSecurity = (symbol, name) => {
  const selectedSecurity = selectedSecurityHTML(symbol, name);

  $(".selections-container").append(selectedSecurity);
  $(`#${symbol}`).show("slow");
};

// Display there are no search results
export const displayNoResults = (selector) => {
  // Create HTML element to be rendered
  const noResult = noResultHTML();
  selector.append(noResult);
};

// Display there was an api issue
export const displayApiErrorMessage = (selector) => {
  // Create HTML element to be rendered
  const apiErrorMessage = apiErrorMessageHTML();
  selector.append(apiErrorMessage);
};

// ****************************************************************
// *******************REMOVE FROM DISPLAY FUNCTIONS****************
// ****************************************************************

// Remove a security the user previously selected
export const removeSelectedSecurity = (symbol) => {
  const selector = $(`#${symbol}`);

  selector.hide("slow", function () {
    selector.remove();
  });
};
