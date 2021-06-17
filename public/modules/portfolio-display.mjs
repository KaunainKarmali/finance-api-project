// ********************************************
// *******************HTML*********************
// ********************************************

const noResultFoundHTML = (symbol) => {
  return `
    <div id="rebalance-${symbol}" class="rebalance-data-row no-results-row" style="display: none;">
      <div>No results found for <span class="ticker-alt">${symbol}</span></div>
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

const resultRowHTML = (
  symbol,
  name,
  price,
  quantity,
  cost,
  incremental,
  value,
  allocation,
  expectedAllocation
) => {
  return `
    <tr id="rebalance-${symbol}" class="rebalance-data-row" style="display: none;">
      <td><span class="ticker-alt">${symbol}</span></td>
      <td>${name}</td>
      <td>${numberWithCommas(price)}</td>
      <td>${numberWithCommas(quantity)}</td>
      <td>${numberWithCommas(cost)}</td>
      <td>${
        incremental > 0
          ? numberWithCommas(incremental)
          : -numberWithCommas(incremental)
      }</td>
      <td>${numberWithCommas(value)}</td>
      <td>${allocation}</td>
      <td>${expectedAllocation}</td>
    </tr>
  `;
};

// ****************************************************
// *******************DISPLAY FUNCTIONS****************
// ****************************************************

// Display a specific symbol was not found
export const displayNoResultFound = (symbol) => {
  // Create HTML element to be rendered
  const noResultRow = noResultFoundHTML(symbol);

  // Show the element on the page to the user
  $(".rebalance-noresults-container").append(noResultRow);

  // animate showing the new symbol
  $(`#rebalance-${symbol}`).show("slow");
};

// Show the selected security in the portfolio container
export const displayInPortfolio = (symbol, name) => {
  const portfolioRow = portfolioRowHTML(symbol, name);

  $(".portfolio-table-body").append(portfolioRow);

  // animate showing the new symbol
  $(`#portfolio-${symbol}`).show("slow");
};

// Display the rebalancing calculation output for each security to the user
export const displayResultRow = (
  symbol,
  { name, quantity, cost, price, allocation },
  investment,
  portfolioCost
) => {
  // Calculate the relevant values to be displayed to the user
  const incremental = Math.round(price * quantity);
  const value = Math.round(cost + incremental);
  const expectedAllocation = (
    (value / (portfolioCost + investment)) *
    100
  ).toFixed(1);

  // Create HTML element to be rendered
  const resultRow = resultRowHTML(
    symbol,
    name,
    price,
    quantity,
    cost,
    incremental,
    value,
    allocation,
    expectedAllocation
  );

  // Show the element on the page to the user
  $(".rebalance-table-body").append(resultRow);

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

// Remove no results found display
export const removeNoResultFound = () => {
  $(".rebalance-noresults-container").empty();
};
