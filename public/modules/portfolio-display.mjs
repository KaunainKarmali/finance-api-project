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
