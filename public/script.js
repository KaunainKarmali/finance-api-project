// ******************* IMPORTS *******************
import { fetchSecurityPrice, fetchSearchSuggestions } from "./modules/api.mjs";
import {
  aggregateBalance,
  numberWithCommas,
  getSize,
  truncateString,
  calcInvestmentBalance,
} from "./modules/utils.mjs";
import { calcSecurityPurchase } from "./modules/portfolio-brain.mjs";
import {
  displayRemoveButton,
  displayAddButton,
  displayNoResults,
  displayNoResultFound,
  removeNoResultFound,
  displaySelectedSecurity,
  removeSelectedSecurity,
  displayInPortfolio,
  removeFromPortfolio,
} from "./modules/portfolio-display.mjs";
import {
  displayRequiredPopup,
  removeRequiredPopup,
  removeAllocationPopup,
  highlightRequiredField,
  unhighlightRequiredField,
} from "./modules/error-handling.mjs";

// ******************* NAMESPACE APP *******************
const app = {};

// ******************* GLOBAL VARIABLES *******************
app.selection = {}; // Stores securities selected by the user

// ******************* JQUERY HANDLES  *******************
app.$searchResultContainer = $(".search-result-container");
app.$searchButton = $(".search-icon");
app.$searchInput = $(".search-input");
app.$searchForm = $(".search-form");

// ******************* FUNCTIONS *******************
// Output a single search result to the screen
app.displayEachSearchSuggestion = (symbol, name) => {
  // Truncate if the string is too long
  const trucatedName = truncateString(name, 50);
  const truncatedSymbol = truncateString(symbol, 8);

  // add or remove button to be appended to the search result depending on whether user has already included it in their selection or not
  const addBtn = `
    <button class="add-btn">
      <i class="fas fa-plus add-icon"></i>
    </button>`;

  const removeBtn = `
    <button class="remove-btn">
      <i class="fas fa-minus"></i>
    </button>`;

  // Create and append result to the page
  // If the security has been selected, display the remove button, else display add button
  const resultHTML = `
    <div class="search-result-row">
        <span id="result-${symbol}" class="result-symbol">${truncatedSymbol}</span>
        <span id="result-${name}" class="result-name">${trucatedName}</span>
        ${symbol in app.selection ? removeBtn : addBtn}  
    </div>`;

  app.$searchResultContainer.append(resultHTML);
};

app.displayResultRow = (
  symbol,
  { name, quantity, cost, price, allocation },
  investment,
  portfolioCost
) => {
  // Calculate the relevant values to be displayed to the user
  const incremental = Math.round(price * quantity);
  const value = Math.round(cost + incremental);
  console.log(quantity);
  console.log(app.selection);
  console.log(numberWithCommas(quantity));
  const expectedAllocation = (
    (value / (portfolioCost + investment)) *
    100
  ).toFixed(1);

  // Create HTML element to be rendered
  const resultRowHTML = `
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

  // Show the element on the page to the user
  $(".rebalance-table-body").append(resultRowHTML);

  // animate showing the new symbol
  $(`#rebalance-${symbol}`).show("slow");
};

app.displayOverallResults = (portfolioCost, investment, investmentBal) => {
  const resultsHTML = `
    <div class="results-div">
      <h3 class="rebalance-header">Your results</h3>
      <div class="results-container">
        <div class="result-item">
          <div class="result-title">Total portfolio value</div>
          <div class="result-value">
            <span class="result-symbol">$</span>
            ${numberWithCommas(parseInt(investment) + parseInt(portfolioCost))}
          </div>
        </div>

        <div class="result-item">
          <div class="result-title">Remaining cash balance</div>
          <div class="result-value">
            <span class="result-symbol">$</span>
            ${numberWithCommas(parseInt(investment) - parseInt(investmentBal))}
          </div>
        </div>

        <div class="result-item">
          <div class="result-title">Investment balance</div>
          <div class="result-value">
            <span class="result-symbol">$</span>
            ${numberWithCommas(
              parseInt(investmentBal) + parseInt(portfolioCost)
            )}
          </div>
        </div>
      </div>
    </div>
  `;

  $(".results-wrapper").append(resultsHTML);
};

app.showOverallResults = () => {
  // animate showing the overall results
  $(`.results-wrapper`).show("slow");

  // animate showing the overall results
  $(`.rebalance-container`).show("slow");
};

app.hideOverallResults = () => {
  // animate hiding the overall results
  $(`.results-wrapper`).hide("slow");

  // animate hiding the overall results
  $(`.rebalance-container`).hide("slow");
};

// Validates whether the input fields in the portfolio table are populated or not
app.validateByInputName = (ticker, inputName) => {
  const id = `#portfolio-${ticker}`;

  const $selector = $(id).find(`input[name=${inputName}]`);

  if ($selector.val() === "") {
    highlightRequiredField($selector);
    return false;
  } else {
    unhighlightRequiredField($selector);
    app.selection[ticker][inputName] = parseFloat($selector.val());
    return true;
  }
};

// ******************* EVENT LISTENERS *******************

// Listen for user keystrokes to submit searches
app.submitUserSearch = () => {
  app.$searchInput.on("keypress", async () => {
    // get the user's search result and submit api request
    const search = app.$searchInput.val();

    if (search !== "") {
      const promise = fetchSearchSuggestions(search);

      promise
        .then((response) => response.json())
        .then((res) => {
          const data = JSON.parse(res.message);

          // Empty previous results
          app.$searchResultContainer.empty();

          // Display no results if there are none
          if (data.length === 0) {
            displayNoResults(app.$searchResultContainer);
          }

          // Loop through search results and display it to the user
          else {
            data.forEach((result) => {
              app.displayEachSearchSuggestion(result.symbol, result.name);
            });
          }

          // Show results container
          app.$searchResultContainer.removeClass("hide");
        })
        .catch((error) => {
          // If error occurs, show no search results found and log error
          displayNoResults(app.$searchResultContainer);
          console.log(error);
        });
    }
  });
};

app.closeSuggestionsContainer = () => {
  $(document).mouseup(function (e) {
    const $target = $(e.target);

    if (
      $target.parents(".search-result-container").length > 0 || // True if clicking within the suggestions container
      $target.parents(".search-bar").length > 0 // True if clicking in the search bar
    ) {
      // do nothing to the search suggestions container
    }
    // remove search results container if clicked outside the search area
    else {
      $(".search-result-container").addClass("hide");
    }
  });
};

// Event listener to track when user wants to add or remove a security from the search suggestions area
app.selectSecurity = () => {
  app.$searchResultContainer.on("click", ".search-result-row", function () {
    // Extract the symbol and company name selected
    const $this = $(this);
    const symbol = $this
      .children(".result-symbol")
      .attr("id")
      .split("result-")[1];
    const name = $this.children(".result-name").attr("id").split("result-")[1];

    // Tracks whether the security is already added or not
    const addSecurity = $this.find(".add-btn").length > 0 ? true : false; // true if its a new security to add

    // Only add unique selections
    if (
      app.selection[symbol] === undefined &&
      addSecurity &&
      getSize(app.selection) < 5
      // Allows a maximum of 5 securities to be searched due to API limits
    ) {
      app.selection = {
        ...app.selection,
        [symbol]: {
          name: name,
        },
      };

      // Show the rebalancing table and button
      $(".portfolio-table").removeClass("hide");
      $(".rebalance-btn-container").removeClass("hide");

      displayRemoveButton($this);

      // Show the selected security to the user
      displaySelectedSecurity(symbol, name);

      // Show the selected security in the portfolio container
      displayInPortfolio(symbol, name);

      // Empty previous results and hide container
      app.$searchResultContainer.addClass("hide");
      app.$searchResultContainer.empty();
      app.$searchInput.val("");
    } else if (addSecurity !== true) {
      // Remove security from the collection
      delete app.selection[symbol];

      // Remove security from screen
      removeSelectedSecurity(symbol);

      // Remove the selected security in the portfolio container
      removeFromPortfolio(symbol);

      // Show add button in the suggestions container
      displayAddButton($this);
    }
  });
};

// Event listener to remove a security from the selected securities section
app.removeSecurity = () => {
  $(".selections-container").on(
    "submit",
    ".selected-security-form",
    function (e) {
      e.preventDefault();

      // extract id from the parent element
      const symbol = $(this).parent()[0].id;

      // Remove security from the collection
      delete app.selection[symbol];

      // Remove security from screen
      removeSelectedSecurity(symbol);

      // Remove the selected security in the portfolio container
      removeFromPortfolio(symbol);
    }
  );
};

// Event listener for when the used selects the form reset button
app.resetSearch = () => {
  app.$searchForm.on("reset", () => {
    // Empty previous results and hide container
    app.$searchResultContainer.addClass("hide");
    app.$searchResultContainer.empty();
    app.$searchInput.val("");
  });
};

// Event listener for portfolio form submission
app.portfolioSubmission = () => {
  $(".portfolio-form").on("submit", async function (e) {
    e.preventDefault();

    // Clear previous results
    app.hideOverallResults();
    $(".results-div").remove();
    $(".rebalance-data-row").remove();
    removeNoResultFound();

    // Get user's total investment input
    const $investment = $("#investment");
    let $parentSelector = $(".investment-container");

    // Tracks if all the validation checks are met
    let validated = true;

    // Validate investment field
    if ($investment.val() === "") {
      highlightRequiredField($investment);
      displayRequiredPopup($parentSelector);
      validated = false;
    } else {
      unhighlightRequiredField($investment);
      removeRequiredPopup($parentSelector);
    }

    // Validate if user has selected any securities

    // Collect user inputs and update the global selections object
    const $securities = $(".portfolio-selection-row");
    $parentSelector = $(".search-bar-container");
    const $searchInput = $(".search-input");

    if ($securities.length === 0) {
      highlightRequiredField($searchInput);
      displayRequiredPopup($parentSelector);
      validated = false;
    } else {
      unhighlightRequiredField($searchInput);
      removeRequiredPopup($parentSelector);
    }

    // Validate portfolio table inputs
    let portfolioTableValidated = true;
    $securities.map((index) => {
      const ticker = $securities[index].id.split("-")[1];

      // TO DO: update variable names
      const nameValidated = app.validateByInputName(ticker, "cost");
      const quantityValidated = app.validateByInputName(ticker, "quantityHeld");
      const allocationValidate = app.validateByInputName(ticker, "allocation");

      if (!nameValidated || !quantityValidated || !allocationValidate) {
        portfolioTableValidated = false;
      }
    });

    $parentSelector = $(".portfolio-form");
    if (!portfolioTableValidated) {
      displayRequiredPopup($parentSelector);
      validated = false;
    } else {
      removeRequiredPopup($parentSelector);
    }

    // Validate portfolio allocation is 100 or not
    const totalAllocation = aggregateBalance(app.selection, "allocation");

    if (validated) {
      if (totalAllocation !== 100) {
        displayAllocationRequiredPopup($parentSelector);
        validated = false;
      } else {
        removeAllocationPopup($parentSelector);
      }
    } else {
      removeAllocationPopup($parentSelector);
    }

    // Proceed if all validation checks are met
    if (validated) {
      const investment = parseFloat($investment.val());
      const portfolioCost = aggregateBalance(app.selection, "cost");

      // Loop through securities to get current market price
      for (const [symbol, details] of Object.entries(app.selection)) {
        let promise = fetchSecurityPrice(symbol);

        await promise
          .then((response) => response.json())
          .then((res) => {
            const data = JSON.parse(res.message);

            // get the closing price of the first object and save it in the global object
            const timeSeries = data["Time Series (Daily)"];
            const firstKey = Object.keys(timeSeries)[0];

            const price = parseFloat(timeSeries[firstKey]["5. adjusted close"]);
            app.selection[symbol].price = price;

            // Determine the quantity of securities to purchase and update the remaining amount to invest
            app.selection[symbol].quantity = calcSecurityPurchase(
              app.selection[symbol],
              investment,
              portfolioCost
            );

            // Display the results to the user
            app.displayResultRow(
              symbol,
              app.selection[symbol],
              investment,
              portfolioCost
            );
          })
          .catch((error) => {
            displayNoResultFound(symbol);
            console.log(error);
          });
      }

      const investmentBal = calcInvestmentBalance(app.selection);
      app.displayOverallResults(portfolioCost, investment, investmentBal);
      app.showOverallResults();
    }
  });
};

// ******************* INIT FUNCTION *******************
app.init = () => {
  app.submitUserSearch();
  app.closeSuggestionsContainer();
  app.resetSearch();
  app.selectSecurity();
  app.removeSecurity();
  app.portfolioSubmission();
};

// ******************* DOCUMENT READY *******************
$(document).ready(() => {
  app.init();
});
