// ******************* IMPORTS *******************
// import { sampleSuggestions } from "./data.js";

console.log(sampleSuggestions);

// ******************* API DETAILS *******************
app.apiKeyAlpha = "MWLXKKEHU3XOJ8O9";
app.apiEndpointAlpha = "https://www.alphavantage.co/query";

app.apiKeyFinMod = "1dde315e9f4982f454e6e4d33f0fb8eb";
app.apiEndpointFinMod = "https://financialmodelingprep.com/api/v3/search";

// ******************* GLOBAL VARIABLES *******************
app.selection = {}; // Stores securities selected by the user

// ******************* JQUERY HANDLES  *******************
app.$searchResultContainer = $(".search-result-container");
app.$searchButton = $(".search-icon");
app.$searchInput = $(".search-input");
app.$searchForm = $(".search-form");

// ******************* UTIL FUNCTIONS *******************
// Truncate name or symbol if its too long
app.truncateString = (string, length) => {
  if (string.length > length) {
    string = string.substring(0, length).trim() + "...";
  }
  return string;
};

// Calculates the total cost of the portfolio
app.calcPortfolioCost = (object) => {
  let portfolioCost = 0;

  for (const [symbol, detail] of Object.entries(object)) {
    portfolioCost += detail.cost;
  }

  return portfolioCost;
};

// Adds commas to a number
app.numberWithCommas = (numb) => {
  return numb.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

// Get the total number of items in an object
app.getSize = (object) => {
  let size = 0;
  for (key in object) {
    if (object.hasOwnProperty(key)) size++;
  }
  return size;
};

// ******************* FUNCTIONS *******************
// Gets the security price from the api
app.getSecurityPrice = (symbol) => {
  const promise = $.ajax({
    url: app.apiEndpointAlpha,
    method: "GET",
    dataType: "JSON",
    data: {
      apikey: app.apiKeyAlpha,
      function: "TIME_SERIES_DAILY_ADJUSTED",
      outputsize: "compact",
      symbol: symbol,
    },
  });

  return promise;
};

// Get search options from the api
app.getSearchSuggestions = (keywords) => {
  const promise = $.ajax({
    url: app.apiEndpointFinMod,
    method: "GET",
    dataType: "JSON",
    data: {
      apikey: app.apiKeyFinMod,
      query: keywords,
      limit: "10",
    },
  });

  return promise;
};

// Output a single search result to the screen
app.displayEachSearchSuggestion = (symbol, name) => {
  // Truncate if the string is too long
  const trucatedName = app.truncateString(name, 50);
  const truncatedSymbol = app.truncateString(symbol, 8);

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

// Function to display when there are no search results
app.displayNoResults = () => {
  const resultHTML = `
    <div class="search-result-row">
        <span class="result-symbol">No results found.</span>
    </div>`;

  app.$searchResultContainer.append(resultHTML);
};

// display the remove button
app.displayRemoveButton = (selector) => {
  const removeIcon = `<i class="fas fa-minus"></i>`;
  selector
    .find(".add-btn")
    .removeClass("add-btn")
    .addClass("remove-btn")
    .empty()
    .append(removeIcon);
};

// display the add button
app.displayAddButton = (selector) => {
  const addIcon = `<i class="fas fa-plus add-icon"></i>`;
  selector
    .find(".remove-btn")
    .removeClass("remove-btn")
    .addClass("add-btn")
    .empty()
    .append(addIcon);
};

// display the security selected back to the user
app.displaySelectedSecurity = (symbol, name) => {
  const selectedSecurityHTML = `
    <div id="${symbol}" class="selection" style="display: none;">
      <form class="selected-security-form" action="" method="get">
        <p class="selected-ticker">${app.truncateString(symbol, 8)}</p>
        <p class="selected-company">${app.truncateString(name, 25)}</p>
        <button class="remove-selection-btn" type="submit">
          <i class="fas fa-times remove-selection-icon"></i>
        </button>
      </form>
    </div>
  `;

  $(".selections-container").append(selectedSecurityHTML);
  $(`#${symbol}`).show("slow");
};

app.removeSelectedSecurity = (symbol) => {
  const $target = $(`#${symbol}`);

  $target.hide("slow", function () {
    $target.remove();
  });
};

// Show the selected security in the portfolio container
app.displayInPortfolio = (symbol, name) => {
  const portfolioRowHTML = `
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
          name="quantity-held"
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

  $(".portfolio-table-body").append(portfolioRowHTML);

  // animate showing the new symbol
  $(`#portfolio-${symbol}`).show("slow");
};

app.removeFromPortfolio = (symbol) => {
  const $target = $(`#portfolio-${symbol}`);

  $target.hide("slow", function () {
    $target.remove();
  });
};

app.displayResultRow = (
  symbol,
  portfolioCost,
  investment,
  { name, quantity, cost, price, allocation }
) => {
  // Calculate the relevant values to be displayed to the user
  const incremental = Math.round(price * quantity);
  const value = Math.round(cost + incremental);
  const expectedAllocation = (
    (value / (portfolioCost + investment)) *
    100
  ).toFixed(1);

  // Create HTML element to be rendered
  const resultRowHTML = `
    <tr id="rebalance-${symbol}" class="rebalance-data-row" style="display: none;">
      <td><span class="ticker-alt">${symbol}</span></td>
      <td>${name}</td>
      <td>${app.numberWithCommas(price)}</td>
      <td>${app.numberWithCommas(quantity)}</td>
      <td>${app.numberWithCommas(cost)}</td>
      <td>${app.numberWithCommas(incremental)}</td>
      <td>${app.numberWithCommas(value)}</td>
      <td>${allocation}</td>
      <td>${expectedAllocation}</td>
    </tr>
  `;

  // Show the element on the page to the user
  $(".rebalance-table-body").append(resultRowHTML);

  // animate showing the new symbol
  $(`#rebalance-${symbol}`).show("slow");
};

app.calcSecurityPurchase = (
  symbol,
  { cost, price, allocation },
  investment,
  portfolioCost
) => {
  // Determine what the value of the security should be to achieve the target allocation ratio
  const targetValue =
    (parseFloat(investment) + parseFloat(portfolioCost)) *
    (parseFloat(allocation) / 100);

  // Determine how many additional shares to purchase or sell to achieve the target allocation ratio
  let incrementalQuantity = 0;
  if (targetValue > cost) {
    incrementalQuantity = Math.floor((targetValue - cost) / price);
  } else {
    incrementalQuantity = Math.floor((targetValue - cost) / price);
  }

  app.selection[symbol].quantity = incrementalQuantity;
};

app.calcInvestmentBalance = (object) => {
  let investmentBal = 0;

  for (const [symbol, detail] of Object.entries(object)) {
    investmentBal += parseFloat(detail.price) * parseFloat(detail.quantity);
  }

  return parseInt(investmentBal);
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
            ${app.numberWithCommas(
              parseInt(investment) + parseInt(portfolioCost)
            )}
          </div>
        </div>

        <div class="result-item">
          <div class="result-title">Remaining cash balance</div>
          <div class="result-value">
            <span class="result-symbol">$</span>
            ${app.numberWithCommas(
              parseInt(investment) - parseInt(investmentBal)
            )}
          </div>
        </div>

        <div class="result-item">
          <div class="result-title">Investment balance</div>
          <div class="result-value">
            <span class="result-symbol">$</span>
            ${app.numberWithCommas(
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

// ******************* EVENT LISTENERS *******************

// Listen for user keystrokes to submit searches
app.submitUserSearch = () => {
  app.$searchInput.on("keypress", () => {
    // get the user's search result and submit api request
    const search = app.$searchInput.val();
    // app.getSearchSuggestions(search);

    const searchPromise = app.getSearchSuggestions(search);
    searchPromise
      .then((data) => {
        // Empty previous results
        app.$searchResultContainer.empty();

        // data = app.sampleSuggestions;

        // Display no results if there are none
        if (data.length === 0) {
          app.displayNoResults();
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
        app.displayNoResults();
        console.log(error);
      });
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
      app.getSize(app.selection) < 5
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

      app.displayRemoveButton($this);

      // Show the selected security to the user
      app.displaySelectedSecurity(symbol, name);

      // Show the selected security in the portfolio container
      app.displayInPortfolio(symbol, name);

      // Empty previous results and hide container
      app.$searchResultContainer.addClass("hide");
      app.$searchResultContainer.empty();
      app.$searchInput.val("");
    } else if (addSecurity !== true) {
      // Remove security from the collection
      delete app.selection[symbol];

      // Remove security from screen
      app.removeSelectedSecurity(symbol);

      // Remove the selected security in the portfolio container
      app.removeFromPortfolio(symbol);

      // Show add button in the suggestions container
      app.displayAddButton($this);
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
      app.removeSelectedSecurity(symbol);

      // Remove the selected security in the portfolio container
      app.removeFromPortfolio(symbol);
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

    // Collect user inputs and update the global selections object
    const $tickerSelectors = $(".portfolio-selection-row");
    const $tickers = $tickerSelectors.map(
      (item) => $tickerSelectors[item].id.split("portfolio-")[1]
    );
    const $costs = $("input[name=cost]");
    const $allocations = $("input[name=allocation]");
    const $quantityHeld = $("input[name=quantity-held]");

    // Get total allocation to check if its equals 100% before proceeding with calculations
    let totalAllocation = 0;
    $allocations.map((item) => {
      totalAllocation += parseFloat($allocations[item].value);
    });

    // Get user's total investment input
    let investment = $("#investment").val();
    investment = parseInt(investment);

    // Proceed if the total allocation by the user is 100%
    if (totalAllocation === 100 && investment > 0) {
      // Loop through each ticker and update global object with the user's inputs
      $allocations.map((index) => {
        const ticker = $tickers[index];

        // Store total cost
        app.selection[ticker].cost =
          $costs[index].value === "" ? 0 : parseFloat($costs[index].value);
        // Store target allocation
        app.selection[ticker].allocation = parseFloat(
          $allocations[index].value
        );
        // Store quantity held
        app.selection[ticker].quantityHeld =
          $quantityHeld[index].value === ""
            ? 0
            : parseFloat($quantityHeld[index].value);
      });

      // Calculate the total cost of the portfolio
      let portfolioCost = app.calcPortfolioCost(app.selection);

      // Loop through securities to get current market price
      for (const [symbol, details] of Object.entries(app.selection)) {
        const promise = app.getSecurityPrice(symbol);

        await promise
          .then((data) => {
            // get the closing price of the first object and save it in the global object
            const timeSeries = data["Time Series (Daily)"];
            const firstKey = Object.keys(timeSeries)[0];
            console.log(firstKey);
            console.log(timeSeries[firstKey]);

            const price = parseFloat(timeSeries[firstKey]["5. adjusted close"]);
            app.selection[symbol].price = price;

            // Determine the quantity of securities to purchase and update the remaining amount to invest
            app.calcSecurityPurchase(
              symbol,
              app.selection[symbol],
              investment,
              portfolioCost
            );

            // Display the results to the user
            app.displayResultRow(
              symbol,
              portfolioCost,
              investment,
              app.selection[symbol]
            );
          })
          .catch((error) => console.log(error));
      }

      const investmentBal = app.calcInvestmentBalance(app.selection);

      app.displayOverallResults(portfolioCost, investment, investmentBal);
      app.showOverallResults();
    } else {
      // Create error message to user
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
