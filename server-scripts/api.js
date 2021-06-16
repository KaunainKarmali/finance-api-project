import dotenv from "dotenv";
import got from "got";

dotenv.config();

export const getSearchResults = (keywords) => {
  const API_KEY_FIN_MOD = process.env.API_KEY_FIN_MOD;
  const API_URL_FIN_MOD = "https://financialmodelingprep.com/api/v3/search";

  const url = API_URL_FIN_MOD;
  const options = {
    requestType: "JSON",
    searchParams: {
      apikey: API_KEY_FIN_MOD,
      query: keywords,
      limit: "10",
    },
  };

  const promise = got(url, options);

  return promise;
};

export const getStockPrice = (symbol) => {
  const API_KEY_ALPHA = process.env.API_KEY_ALPHA;
  const API_URL_ALPHA = "https://www.alphavantage.co/query";

  const url = API_URL_ALPHA;
  const options = {
    requestType: "JSON",
    searchParams: {
      apikey: API_KEY_ALPHA,
      function: "TIME_SERIES_DAILY_ADJUSTED",
      outputsize: "compact",
      symbol: symbol,
    },
  };

  const promise = got(url, options);

  return promise;
};
