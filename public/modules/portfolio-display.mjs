import { truncateString } from "./utils.mjs";

// ********************************************
// *******************HTML*********************
// ********************************************

const removeIconHTML = () => {
  return `<i class="fas fa-minus"></i>`;
};

const addIconHTML = () => {
  return `<i class="fas fa-plus add-icon"></i>`;
};

const noResultHTML = () => {
  return `
    <div class="search-result-row">
        <span class="result-symbol">No results found.</span>
    </div>`;
};

const noResultFoundHTML = (symbol) => {
  return `
    <div id="rebalance-${symbol}" class="rebalance-data-row no-results-row" style="display: none;">
      <div>No results found for <span class="ticker-alt">${symbol}</span></div>
    </div>
  `;
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

const portfolioRowHTML = (symbol, name) => {
  return `
    <tr id="portfolio-${symbol}" class="portfolio-selection-row" style="display: none;">
      <td><span class="ticker">${symbol}</span></td>
      <td>${name}</td>
      <td>
        <input
          class="portfolio-input"
          type="number"
          name="cost"
          placeholder="$1,000"
          min="0"
          step=".01"
        />
      </td>
      <td>
        <input
          class="portfolio-input"
          type="number"
          name="quantityHeld"
          placeholder="10"
          min="0"
          step=".01"
        />
      </td>
      <td>
        <input
          class="portfolio-input"
          type="number"
          name="allocation"
          placeholder="100%"
          min="0"
          max="100"
          step=".01"
        />
      </td>
    </tr>
  `;
};

// ****************************************************
// *******************DISPLAY FUNCTIONS****************
// ****************************************************

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

// Display there are no search results
export const displayNoResults = (selector) => {
  // Create HTML element to be rendered
  const noResult = noResultHTML();
  selector.append(noResult);
};

// Display a specific symbol was not found
export const displayNoResultFound = (symbol) => {
  // Create HTML element to be rendered
  const noResultRow = noResultFoundHTML(symbol);

  // Show the element on the page to the user
  $(".rebalance-noresults-container").append(noResultRow);

  // animate showing the new symbol
  $(`#rebalance-${symbol}`).show("slow");
};

// Display the security selected back to the user
export const displaySelectedSecurity = (symbol, name) => {
  const selectedSecurity = selectedSecurityHTML(symbol, name);

  $(".selections-container").append(selectedSecurity);
  $(`#${symbol}`).show("slow");
};

// Show the selected security in the portfolio container
export const displayInPortfolio = (symbol, name) => {
  const portfolioRow = portfolioRowHTML(symbol, name);

  $(".portfolio-table-body").append(portfolioRow);

  // animate showing the new symbol
  $(`#portfolio-${symbol}`).show("slow");
};

// ****************************************************************
// *******************REMOVE FROM DISPLAY FUNCTIONS****************
// ****************************************************************

// Remove a security from the screen
export const removeFromPortfolio = (symbol) => {
  const selector = $(`#portfolio-${symbol}`);

  selector.hide("slow", function () {
    selector.remove();
  });
};

// Remove a security the user previously selected
export const removeSelectedSecurity = (symbol) => {
  const selector = $(`#${symbol}`);

  selector.hide("slow", function () {
    selector.remove();
  });
};

// Remove no results found display
export const removeNoResultFound = () => {
  $(".rebalance-noresults-container").empty();
};
