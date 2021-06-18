// ********************************************************
// *********************** IMPORTS ************************
// ********************************************************

import { fetchSecurityPrice, fetchSearchSuggestions } from "./api.mjs";
import { aggregateBalance, getSize, calcInvestmentBalance } from "./utils.mjs";

import {
  displayEachSearchSuggestion,
  displayRemoveButton,
  displayAddButton,
  displaySelectedSecurity,
  removeSelectedSecurity,
  displayNoResults,
} from "./search.mjs";

import { calcSecurityPurchase } from "./portfolio-brain.mjs";
import {
  displayNoResultFound,
  removeNoResultFound,
  displayInPortfolio,
  removeFromPortfolio,
  displayResultRow,
} from "./portfolio-display.mjs";

import { validateByInputName } from "./error-handling-brain.mjs";
import {
  displayRequiredPopup,
  removeRequiredPopup,
  displayAllocationRequiredPopup,
  removeAllocationPopup,
  highlightRequiredField,
  unhighlightRequiredField,
} from "./error-handling-display.mjs";

import {
  displayOverallResults,
  showOverallResults,
  hideOverallResults,
} from "./overall-results-display.mjs";

// ********************************************************
// ******************* GLOBAL VARIABLES *******************
// ********************************************************

let selection = {}; // Stores securities selected by the user

// ********************************************************
// ******************* JQUERY HANDLES  ********************
// ********************************************************
const $searchResultContainer = $(".search-result-container");
const $searchButton = $(".search-icon");
const $searchInput = $(".search-input");
const $searchForm = $(".search-form");

// ********************************************************
// ******************** EVENT LISTENERS *******************
// ********************************************************

// Listen for user keystrokes to submit searches
export const submitUserSearch = () => {
  $searchInput.on("keypress", async () => {
    // get the user's search result and submit api request
    const search = $searchInput.val();

    if (search !== "") {
      const promise = fetchSearchSuggestions(search);

      promise
        .then((response) => response.json())
        .then((res) => {
          const data = JSON.parse(res.message);

          // Empty previous results
          $searchResultContainer.empty();

          // Display no results if there are none
          if (data.length === 0) {
            displayNoResults($searchResultContainer);
          }

          // Loop through search results and display it to the user
          else {
            data.forEach((result) => {
              displayEachSearchSuggestion(
                result.symbol,
                result.name,
                selection,
                $searchResultContainer
              );
            });
          }

          // Show results container
          $searchResultContainer.removeClass("hide");
        })
        .catch((error) => {
          // If error occurs, show no search results found and log error
          displayNoResults($searchResultContainer);
          console.log(error);
        });
    }
  });
};

export const closeSuggestionsContainer = () => {
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
export const selectSecurity = () => {
  $searchResultContainer.on("click", ".search-result-row", function () {
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
      selection[symbol] === undefined &&
      addSecurity &&
      getSize(selection) < 5
      // Allows a maximum of 5 securities to be searched due to API limits
    ) {
      selection[symbol] = {
        name: name,
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
      $searchResultContainer.addClass("hide");
      $searchResultContainer.empty();
      $searchInput.val("");
    } else if (addSecurity !== true) {
      // Remove security from the collection
      delete selection[symbol];

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
export const removeSecurity = () => {
  $(".selections-container").on(
    "submit",
    ".selected-security-form",
    function (e) {
      e.preventDefault();

      // extract id from the parent element
      const symbol = $(this).parent()[0].id;

      // Remove security from the collection
      delete selection[symbol];

      // Remove security from screen
      removeSelectedSecurity(symbol);

      // Remove the selected security in the portfolio container
      removeFromPortfolio(symbol);
    }
  );
};

// Event listener for when the used selects the form reset button
export const resetSearch = () => {
  $searchForm.on("reset", () => {
    // Empty previous results and hide container
    $searchResultContainer.addClass("hide");
    $searchResultContainer.empty();
    $searchInput.val("");
  });
};

// Event listener for portfolio form submission
export const portfolioSubmission = () => {
  $(".portfolio-form").on("submit", async function (e) {
    e.preventDefault();

    // Clear previous results
    hideOverallResults();
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
      const nameValidated = validateByInputName(ticker, "cost", selection);
      const quantityValidated = validateByInputName(
        ticker,
        "quantityHeld",
        selection
      );
      const allocationValidate = validateByInputName(
        ticker,
        "allocation",
        selection
      );

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
    const totalAllocation = aggregateBalance(selection, "allocation");

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
      const portfolioCost = aggregateBalance(selection, "cost");

      // Loop through securities to get current market price
      for (const [symbol, details] of Object.entries(selection)) {
        let promise = fetchSecurityPrice(symbol);

        await promise
          .then((response) => response.json())
          .then((res) => {
            const data = JSON.parse(res.message);

            // get the closing price of the first object and save it in the global object
            const timeSeries = data["Time Series (Daily)"];
            const firstKey = Object.keys(timeSeries)[0];

            const price = parseFloat(timeSeries[firstKey]["5. adjusted close"]);
            selection[symbol].price = price;

            // Determine the quantity of securities to purchase and update the remaining amount to invest
            selection[symbol].quantity = calcSecurityPurchase(
              selection[symbol],
              investment,
              portfolioCost
            );

            // Display the results to the user
            displayResultRow(
              symbol,
              selection[symbol],
              investment,
              portfolioCost
            );
          })
          .catch((error) => {
            displayNoResultFound(symbol);
            console.log(error);
          });
      }

      const investmentBal = calcInvestmentBalance(selection);
      displayOverallResults(portfolioCost, investment, investmentBal);
      showOverallResults();
    }
  });
};
