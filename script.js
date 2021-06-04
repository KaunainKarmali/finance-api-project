// ******************* NAMESPACE APP *******************
const app = {};

// ******************* API DETAILS *******************
const apiKeyAlpha = "MWLXKKEHU3XOJ8O9";
const apiEndpointAlpha = "https://www.alphavantage.co/query";

// ******************* GLOBAL VARIABLES *******************
app.sample = {
  bestMatches: [
    {
      "1. symbol": "AP",
      "2. name": "Ampco-Pittsburgh Corp",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "APA",
      "2. name": "APA Corporation",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.8000",
    },
    {
      "1. symbol": "AP0.FRK",
      "2. name": "Artisan Partners Asset Management Inc",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "AP1.FRK",
      "2. name": "Aspen Aerogels",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "AP2.FRK",
      "2. name": "Applied Materials",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "AP3.FRK",
      "2. name": "Air Products and Chemicals",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "AP7.FRK",
      "2. name": "Clearfield",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "APAAF",
      "2. name": "Appia Energy Corp",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "AP2.DEX",
      "2. name": "Applied Materials",
      "3. type": "Equity",
      "4. region": "XETRA",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5000",
    },
    {
      "1. symbol": "AP8N.FRK",
      "2. name": "Aptevo Therapeutics Inc",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5000",
    },
  ],
};

// ******************* JQUERY HANDLES  *******************
app.$searchResultContainer = $(".search-result-container");
app.$searchButton = $(".search-icon");
app.$searchInput = $(".search-input");
app.$searchForm = $(".search-form");

// ******************* FUNCTIONS *******************
app.getSearchResult = (keywords) => {
  const promise = $.ajax({
    url: apiEndpointAlpha,
    method: "GET",
    dataType: "JSON",
    data: {
      apikey: apiKeyAlpha,
      function: "SYMBOL_SEARCH",
      keywords: keywords,
    },
  });

  return promise;
};

app.displaySearchResult = (symbol, name) => {
  // Truncate name or sybol if its too long
  const nameLength = 50;

  if (name.length > nameLength) {
    name = name.substring(0, nameLength).trim() + "...";
  }

  const symbolLength = 8;

  if (symbol.length > symbolLength) {
    symbol = symbol.substring(0, symbolLength).trim() + "...";
  }

  // Create and append result to the page
  const resultHTML = `
    <div class="search-result-row">
        <span class="result-symbol">${symbol}</span>
        <span class="result-name">${name}</span>
    </div>`;

  app.$searchResultContainer.append(resultHTML);
};

app.submitSearch = () => {
  app.$searchForm.on("submit", (e) => {
    // Empty previous results
    app.$searchResultContainer.empty();

    e.preventDefault();

    const search = app.$searchInput.val();

    const searchPromise = app.getSearchResult(search);

    searchPromise
      .then((data) => {
        // Loop through search results
        if (data.bestMatches !== undefined) {
          data.bestMatches.forEach((result) => {
            app.displaySearchResult(result["1. symbol"], result["2. name"]);
          });

          // Show results container
          app.$searchResultContainer.removeClass("hide");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

app.resetSearch = () => {
  app.$searchForm.on("reset", (e) => {
    // Empty previous results
    app.$searchResultContainer.addClass("hide");
    app.$searchResultContainer.empty();
    app.$searchInput.val("");
  });
};

// ******************* INIT FUNCTION *******************
app.init = () => {
  // app.sample.bestMatches.forEach((result) => {
  //   app.displaySearchResult(result["1. symbol"], result["2. name"]);
  // });

  app.submitSearch();
  app.resetSearch();
};

// ******************* DOCUMENT READY *******************
$(document).ready(() => {
  app.init();
});
