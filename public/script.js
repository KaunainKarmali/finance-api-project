// ******************* IMPORTS *******************
import { fetchSecurityPrice, fetchSearchSuggestions } from "./modules/api.mjs";
import {
  aggregateBalance,
  getSize,
  calcInvestmentBalance,
} from "./modules/utils.mjs";

import {
  displayEachSearchSuggestion,
  displayRemoveButton,
  displayAddButton,
  displaySelectedSecurity,
  removeSelectedSecurity,
  displayNoResults,
} from "./modules/search.mjs";

import { calcSecurityPurchase } from "./modules/portfolio-brain.mjs";
import {
  displayNoResultFound,
  removeNoResultFound,
  displayInPortfolio,
  removeFromPortfolio,
} from "./modules/portfolio-display.mjs";

import { validateByInputName } from "./modules/error-handling-brain.mjs";
import {
  displayRequiredPopup,
  removeRequiredPopup,
  displayAllocationRequiredPopup,
  removeAllocationPopup,
  highlightRequiredField,
  unhighlightRequiredField,
} from "./modules/error-handling-display.mjs";

import {
  displayOverallResults,
  showOverallResults,
  hideOverallResults,
} from "./modules/overall-results-display.mjs";

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
              displayEachSearchSuggestion(
                result.symbol,
                result.name,
                app.selection,
                app.$searchResultContainer
              );
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
      const nameValidated = validateByInputName(ticker, "cost", app.selection);
      const quantityValidated = validateByInputName(
        ticker,
        "quantityHeld",
        app.selection
      );
      const allocationValidate = validateByInputName(
        ticker,
        "allocation",
        app.selection
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
      displayOverallResults(portfolioCost, investment, investmentBal);
      showOverallResults();
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
