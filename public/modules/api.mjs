// Fetch the security price from the api
export const fetchSecurityPrice = (symbol) => {
  const data = { symbol: symbol };
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const promise = fetch("/price", options);
  return promise;
};

// Fetch search options from the api
export const fetchSearchSuggestions = (keywords) => {
  const data = { keywords: keywords };
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const promise = fetch("/search", options);
  return promise;
};
