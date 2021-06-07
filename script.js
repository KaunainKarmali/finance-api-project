// ******************* NAMESPACE APP *******************
const app = {};

// ******************* API DETAILS *******************
app.apiKeyAlpha = "MWLXKKEHU3XOJ8O9";
app.apiEndpointAlpha = "https://www.alphavantage.co/query";

app.apiKeyFinMod = "1dde315e9f4982f454e6e4d33f0fb8eb";
app.apiEndpointFinMod = "https://financialmodelingprep.com/api/v3/search";

// ******************* GLOBAL VARIABLES *******************
app.selection = {}; // Stores securities selected by the user

app.sampleSuggestions = [
  {
    symbol: "VO",
    name: "Vanguard Mid-Cap Index Fund ETF Shares",
    currency: "USD",
    stockExchange: "NYSEArca",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "AP",
    name: "Ampco-Pittsburgh Corporation",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "PV",
    name: "Primavera Capital Acquisition Corporation",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "VV",
    name: "Vanguard Large-Cap Index Fund ETF Shares",
    currency: "USD",
    stockExchange: "NYSEArca",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "VB",
    name: "Vanguard Small-Cap Index Fund ETF Shares",
    currency: "USD",
    stockExchange: "NYSEArca",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "IP",
    name: "International Paper Co",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "RC",
    name: "Ready Capital Corp",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "QS",
    name: "QuantumScape Corporation",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "SI",
    name: "Silvergate Capital Corp",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
  {
    symbol: "AC",
    name: "Associated Capital Group Inc",
    currency: "USD",
    stockExchange: "New York Stock Exchange",
    exchangeShortName: "NYSE",
  },
];

app.sampleData = {
  "Meta Data": {
    "1. Information":
      "Intraday (15min) open, high, low, close prices and volume",
    "2. Symbol": "AAPL",
    "3. Last Refreshed": "2021-06-03 20:00:00",
    "4. Interval": "15min",
    "5. Output Size": "Compact",
    "6. Time Zone": "US/Eastern",
  },
  "Time Series (15min)": {
    "2021-06-03 20:00:00": {
      "1. open": "123.4400",
      "2. high": "123.6000",
      "3. low": "123.4300",
      "4. close": "123.5400",
      "5. volume": "47106",
    },
    "2021-06-03 19:45:00": {
      "1. open": "123.5000",
      "2. high": "123.5100",
      "3. low": "123.4300",
      "4. close": "123.4600",
      "5. volume": "21912",
    },
    "2021-06-03 19:30:00": {
      "1. open": "123.5800",
      "2. high": "123.5800",
      "3. low": "123.4800",
      "4. close": "123.5000",
      "5. volume": "19808",
    },
    "2021-06-03 19:15:00": {
      "1. open": "123.5400",
      "2. high": "123.6000",
      "3. low": "123.5400",
      "4. close": "123.5500",
      "5. volume": "6004",
    },
    "2021-06-03 19:00:00": {
      "1. open": "123.5900",
      "2. high": "123.6000",
      "3. low": "123.5400",
      "4. close": "123.5400",
      "5. volume": "4235",
    },
    "2021-06-03 18:45:00": {
      "1. open": "123.6100",
      "2. high": "123.6500",
      "3. low": "123.5400",
      "4. close": "123.5500",
      "5. volume": "18546",
    },
    "2021-06-03 18:30:00": {
      "1. open": "123.6500",
      "2. high": "123.6500",
      "3. low": "123.6100",
      "4. close": "123.6200",
      "5. volume": "6309",
    },
    "2021-06-03 18:15:00": {
      "1. open": "123.5800",
      "2. high": "123.6700",
      "3. low": "123.5700",
      "4. close": "123.6700",
      "5. volume": "19858",
    },
    "2021-06-03 18:00:00": {
      "1. open": "123.5699",
      "2. high": "123.5800",
      "3. low": "123.5500",
      "4. close": "123.5800",
      "5. volume": "8828",
    },
    "2021-06-03 17:45:00": {
      "1. open": "123.5600",
      "2. high": "123.5700",
      "3. low": "123.5400",
      "4. close": "123.5400",
      "5. volume": "7795",
    },
    "2021-06-03 17:30:00": {
      "1. open": "123.5000",
      "2. high": "123.5600",
      "3. low": "123.5000",
      "4. close": "123.5600",
      "5. volume": "34652",
    },
    "2021-06-03 17:15:00": {
      "1. open": "123.4800",
      "2. high": "123.5400",
      "3. low": "123.4700",
      "4. close": "123.4900",
      "5. volume": "246346",
    },
    "2021-06-03 17:00:00": {
      "1. open": "123.5000",
      "2. high": "123.5000",
      "3. low": "123.4700",
      "4. close": "123.4700",
      "5. volume": "13988",
    },
    "2021-06-03 16:45:00": {
      "1. open": "123.5000",
      "2. high": "123.5000",
      "3. low": "123.4800",
      "4. close": "123.5000",
      "5. volume": "387583",
    },
    "2021-06-03 16:30:00": {
      "1. open": "123.5000",
      "2. high": "123.5400",
      "3. low": "123.4800",
      "4. close": "123.5000",
      "5. volume": "50404",
    },
    "2021-06-03 16:15:00": {
      "1. open": "123.5400",
      "2. high": "123.5400",
      "3. low": "123.4500",
      "4. close": "123.5100",
      "5. volume": "1224155",
    },
    "2021-06-03 16:00:00": {
      "1. open": "123.6250",
      "2. high": "123.6700",
      "3. low": "123.3900",
      "4. close": "123.5400",
      "5. volume": "4576040",
    },
    "2021-06-03 15:45:00": {
      "1. open": "123.8605",
      "2. high": "123.9150",
      "3. low": "123.6200",
      "4. close": "123.6200",
      "5. volume": "2110694",
    },
    "2021-06-03 15:30:00": {
      "1. open": "123.8800",
      "2. high": "123.8900",
      "3. low": "123.6700",
      "4. close": "123.8600",
      "5. volume": "1507353",
    },
    "2021-06-03 15:15:00": {
      "1. open": "123.6400",
      "2. high": "123.8900",
      "3. low": "123.6399",
      "4. close": "123.8801",
      "5. volume": "1474582",
    },
    "2021-06-03 15:00:00": {
      "1. open": "123.7300",
      "2. high": "123.7900",
      "3. low": "123.6000",
      "4. close": "123.6400",
      "5. volume": "1210614",
    },
    "2021-06-03 14:45:00": {
      "1. open": "123.7400",
      "2. high": "123.8450",
      "3. low": "123.6400",
      "4. close": "123.7300",
      "5. volume": "2392403",
    },
    "2021-06-03 14:30:00": {
      "1. open": "123.9353",
      "2. high": "123.9353",
      "3. low": "123.7300",
      "4. close": "123.7490",
      "5. volume": "1214481",
    },
    "2021-06-03 14:15:00": {
      "1. open": "123.9000",
      "2. high": "124.0900",
      "3. low": "123.8100",
      "4. close": "123.9344",
      "5. volume": "2328245",
    },
    "2021-06-03 14:00:00": {
      "1. open": "123.9300",
      "2. high": "124.0000",
      "3. low": "123.8200",
      "4. close": "123.9001",
      "5. volume": "1347949",
    },
    "2021-06-03 13:45:00": {
      "1. open": "123.7800",
      "2. high": "124.0400",
      "3. low": "123.7100",
      "4. close": "123.9399",
      "5. volume": "1786772",
    },
    "2021-06-03 13:30:00": {
      "1. open": "123.5300",
      "2. high": "123.8100",
      "3. low": "123.5100",
      "4. close": "123.7840",
      "5. volume": "1125624",
    },
    "2021-06-03 13:15:00": {
      "1. open": "123.6800",
      "2. high": "123.7303",
      "3. low": "123.3000",
      "4. close": "123.5250",
      "5. volume": "1486053",
    },
    "2021-06-03 13:00:00": {
      "1. open": "123.5300",
      "2. high": "123.6900",
      "3. low": "123.4800",
      "4. close": "123.6800",
      "5. volume": "1262208",
    },
    "2021-06-03 12:45:00": {
      "1. open": "123.5000",
      "2. high": "123.5800",
      "3. low": "123.3800",
      "4. close": "123.5382",
      "5. volume": "1291400",
    },
    "2021-06-03 12:30:00": {
      "1. open": "123.5900",
      "2. high": "123.6600",
      "3. low": "123.4000",
      "4. close": "123.5069",
      "5. volume": "1844586",
    },
    "2021-06-03 12:15:00": {
      "1. open": "123.7100",
      "2. high": "123.8500",
      "3. low": "123.5900",
      "4. close": "123.5950",
      "5. volume": "1517556",
    },
    "2021-06-03 12:00:00": {
      "1. open": "123.7450",
      "2. high": "123.7900",
      "3. low": "123.5500",
      "4. close": "123.7100",
      "5. volume": "1569561",
    },
    "2021-06-03 11:45:00": {
      "1. open": "123.8981",
      "2. high": "123.9650",
      "3. low": "123.5850",
      "4. close": "123.7500",
      "5. volume": "2173825",
    },
    "2021-06-03 11:30:00": {
      "1. open": "124.1050",
      "2. high": "124.1200",
      "3. low": "123.8100",
      "4. close": "123.9000",
      "5. volume": "2112219",
    },
    "2021-06-03 11:15:00": {
      "1. open": "123.9400",
      "2. high": "124.1500",
      "3. low": "123.8450",
      "4. close": "124.1050",
      "5. volume": "2728544",
    },
    "2021-06-03 11:00:00": {
      "1. open": "123.2100",
      "2. high": "123.9400",
      "3. low": "123.1600",
      "4. close": "123.9350",
      "5. volume": "3428094",
    },
    "2021-06-03 10:45:00": {
      "1. open": "123.4600",
      "2. high": "123.5900",
      "3. low": "123.1300",
      "4. close": "123.2100",
      "5. volume": "3419373",
    },
    "2021-06-03 10:30:00": {
      "1. open": "123.7484",
      "2. high": "123.7500",
      "3. low": "123.3050",
      "4. close": "123.4600",
      "5. volume": "3458880",
    },
    "2021-06-03 10:15:00": {
      "1. open": "123.6200",
      "2. high": "123.7900",
      "3. low": "123.4000",
      "4. close": "123.7450",
      "5. volume": "3609414",
    },
    "2021-06-03 10:00:00": {
      "1. open": "123.5300",
      "2. high": "124.6600",
      "3. low": "123.2700",
      "4. close": "123.6200",
      "5. volume": "10032512",
    },
    "2021-06-03 09:45:00": {
      "1. open": "124.6800",
      "2. high": "124.8500",
      "3. low": "123.5200",
      "4. close": "123.5344",
      "5. volume": "6993403",
    },
    "2021-06-03 09:30:00": {
      "1. open": "124.2500",
      "2. high": "124.8000",
      "3. low": "124.2500",
      "4. close": "124.6500",
      "5. volume": "163341",
    },
    "2021-06-03 09:15:00": {
      "1. open": "124.2400",
      "2. high": "124.3000",
      "3. low": "124.1500",
      "4. close": "124.2400",
      "5. volume": "82138",
    },
    "2021-06-03 09:00:00": {
      "1. open": "124.3200",
      "2. high": "124.4600",
      "3. low": "124.2000",
      "4. close": "124.2400",
      "5. volume": "113099",
    },
    "2021-06-03 08:45:00": {
      "1. open": "124.0200",
      "2. high": "124.3500",
      "3. low": "123.9600",
      "4. close": "124.3200",
      "5. volume": "90638",
    },
    "2021-06-03 08:30:00": {
      "1. open": "123.9700",
      "2. high": "124.1300",
      "3. low": "123.8200",
      "4. close": "124.0600",
      "5. volume": "106934",
    },
    "2021-06-03 08:15:00": {
      "1. open": "124.0600",
      "2. high": "124.7480",
      "3. low": "123.8100",
      "4. close": "123.9700",
      "5. volume": "282591",
    },
    "2021-06-03 08:00:00": {
      "1. open": "124.1500",
      "2. high": "124.1500",
      "3. low": "123.8500",
      "4. close": "124.0700",
      "5. volume": "64553",
    },
    "2021-06-03 07:45:00": {
      "1. open": "124.0600",
      "2. high": "124.3000",
      "3. low": "123.9700",
      "4. close": "124.1000",
      "5. volume": "55968",
    },
    "2021-06-03 07:30:00": {
      "1. open": "124.0700",
      "2. high": "124.2900",
      "3. low": "123.8400",
      "4. close": "124.0600",
      "5. volume": "66164",
    },
    "2021-06-03 07:15:00": {
      "1. open": "124.1200",
      "2. high": "124.4500",
      "3. low": "124.0000",
      "4. close": "124.0700",
      "5. volume": "127807",
    },
    "2021-06-03 07:00:00": {
      "1. open": "124.3700",
      "2. high": "124.3700",
      "3. low": "124.0000",
      "4. close": "124.0100",
      "5. volume": "10632",
    },
    "2021-06-03 06:45:00": {
      "1. open": "124.5800",
      "2. high": "124.5800",
      "3. low": "124.3500",
      "4. close": "124.3500",
      "5. volume": "5516",
    },
    "2021-06-03 06:30:00": {
      "1. open": "124.6000",
      "2. high": "124.6200",
      "3. low": "124.6000",
      "4. close": "124.6200",
      "5. volume": "738",
    },
    "2021-06-03 06:15:00": {
      "1. open": "124.6600",
      "2. high": "124.6600",
      "3. low": "124.4200",
      "4. close": "124.6100",
      "5. volume": "5390",
    },
    "2021-06-03 06:00:00": {
      "1. open": "124.6900",
      "2. high": "124.7400",
      "3. low": "124.6200",
      "4. close": "124.6200",
      "5. volume": "2349",
    },
    "2021-06-03 05:45:00": {
      "1. open": "124.7100",
      "2. high": "124.7200",
      "3. low": "124.6100",
      "4. close": "124.6700",
      "5. volume": "2558",
    },
    "2021-06-03 05:30:00": {
      "1. open": "124.7300",
      "2. high": "124.7500",
      "3. low": "124.7100",
      "4. close": "124.7100",
      "5. volume": "2287",
    },
    "2021-06-03 05:15:00": {
      "1. open": "124.8900",
      "2. high": "124.8900",
      "3. low": "124.7800",
      "4. close": "124.7800",
      "5. volume": "2147",
    },
    "2021-06-03 05:00:00": {
      "1. open": "124.8400",
      "2. high": "124.8900",
      "3. low": "124.8400",
      "4. close": "124.8900",
      "5. volume": "2541",
    },
    "2021-06-03 04:45:00": {
      "1. open": "124.7600",
      "2. high": "124.8400",
      "3. low": "124.7600",
      "4. close": "124.8400",
      "5. volume": "1794",
    },
    "2021-06-03 04:30:00": {
      "1. open": "124.7300",
      "2. high": "124.7500",
      "3. low": "124.7100",
      "4. close": "124.7500",
      "5. volume": "1917",
    },
    "2021-06-03 04:15:00": {
      "1. open": "124.8800",
      "2. high": "124.8800",
      "3. low": "124.6200",
      "4. close": "124.7600",
      "5. volume": "5342",
    },
    "2021-06-02 20:00:00": {
      "1. open": "125.0300",
      "2. high": "125.0900",
      "3. low": "125.0100",
      "4. close": "125.0800",
      "5. volume": "25017",
    },
    "2021-06-02 19:45:00": {
      "1. open": "125.0100",
      "2. high": "125.0300",
      "3. low": "125.0000",
      "4. close": "125.0000",
      "5. volume": "11587",
    },
    "2021-06-02 19:30:00": {
      "1. open": "125.0101",
      "2. high": "125.0300",
      "3. low": "125.0100",
      "4. close": "125.0200",
      "5. volume": "9835",
    },
    "2021-06-02 19:15:00": {
      "1. open": "125.0200",
      "2. high": "125.0400",
      "3. low": "125.0100",
      "4. close": "125.0100",
      "5. volume": "4796",
    },
    "2021-06-02 19:00:00": {
      "1. open": "125.0100",
      "2. high": "125.0500",
      "3. low": "125.0000",
      "4. close": "125.0200",
      "5. volume": "18360",
    },
    "2021-06-02 18:45:00": {
      "1. open": "125.0300",
      "2. high": "125.0500",
      "3. low": "125.0000",
      "4. close": "125.0200",
      "5. volume": "7340",
    },
    "2021-06-02 18:30:00": {
      "1. open": "124.9900",
      "2. high": "125.0500",
      "3. low": "124.9700",
      "4. close": "125.0100",
      "5. volume": "5588",
    },
    "2021-06-02 18:15:00": {
      "1. open": "124.9700",
      "2. high": "125.0300",
      "3. low": "124.9700",
      "4. close": "124.9900",
      "5. volume": "8799",
    },
    "2021-06-02 18:00:00": {
      "1. open": "124.9600",
      "2. high": "125.0000",
      "3. low": "124.9200",
      "4. close": "124.9700",
      "5. volume": "16335",
    },
    "2021-06-02 17:45:00": {
      "1. open": "124.9600",
      "2. high": "124.9800",
      "3. low": "124.9000",
      "4. close": "124.9700",
      "5. volume": "16015",
    },
    "2021-06-02 17:30:00": {
      "1. open": "125.0000",
      "2. high": "125.0300",
      "3. low": "124.9600",
      "4. close": "124.9600",
      "5. volume": "5160",
    },
    "2021-06-02 17:15:00": {
      "1. open": "124.9800",
      "2. high": "125.0400",
      "3. low": "124.9600",
      "4. close": "124.9900",
      "5. volume": "18773",
    },
    "2021-06-02 17:00:00": {
      "1. open": "124.9600",
      "2. high": "125.0500",
      "3. low": "124.9300",
      "4. close": "124.9600",
      "5. volume": "13692",
    },
    "2021-06-02 16:45:00": {
      "1. open": "124.9700",
      "2. high": "125.0600",
      "3. low": "124.9000",
      "4. close": "124.9600",
      "5. volume": "36833",
    },
    "2021-06-02 16:30:00": {
      "1. open": "125.0700",
      "2. high": "125.0700",
      "3. low": "124.9600",
      "4. close": "124.9700",
      "5. volume": "429559",
    },
    "2021-06-02 16:15:00": {
      "1. open": "125.0600",
      "2. high": "125.1600",
      "3. low": "125.0000",
      "4. close": "125.0800",
      "5. volume": "2212081",
    },
    "2021-06-02 16:00:00": {
      "1. open": "124.8850",
      "2. high": "125.1690",
      "3. low": "124.8600",
      "4. close": "125.0900",
      "5. volume": "4512892",
    },
    "2021-06-02 15:45:00": {
      "1. open": "124.7900",
      "2. high": "124.9200",
      "3. low": "124.6600",
      "4. close": "124.8900",
      "5. volume": "1777123",
    },
    "2021-06-02 15:30:00": {
      "1. open": "124.7350",
      "2. high": "124.7950",
      "3. low": "124.7000",
      "4. close": "124.7850",
      "5. volume": "1270510",
    },
    "2021-06-02 15:15:00": {
      "1. open": "124.6800",
      "2. high": "124.7500",
      "3. low": "124.5100",
      "4. close": "124.7350",
      "5. volume": "1581589",
    },
    "2021-06-02 15:00:00": {
      "1. open": "124.4950",
      "2. high": "124.6950",
      "3. low": "124.4600",
      "4. close": "124.6822",
      "5. volume": "1235784",
    },
    "2021-06-02 14:45:00": {
      "1. open": "124.4850",
      "2. high": "124.5850",
      "3. low": "124.4100",
      "4. close": "124.4900",
      "5. volume": "1426071",
    },
    "2021-06-02 14:30:00": {
      "1. open": "124.0900",
      "2. high": "124.5100",
      "3. low": "124.0600",
      "4. close": "124.4800",
      "5. volume": "1449755",
    },
    "2021-06-02 14:15:00": {
      "1. open": "124.3100",
      "2. high": "124.3550",
      "3. low": "124.0500",
      "4. close": "124.0900",
      "5. volume": "1468635",
    },
    "2021-06-02 14:00:00": {
      "1. open": "124.3000",
      "2. high": "124.3500",
      "3. low": "124.1150",
      "4. close": "124.3100",
      "5. volume": "1239012",
    },
    "2021-06-02 13:45:00": {
      "1. open": "124.2000",
      "2. high": "124.3500",
      "3. low": "124.1550",
      "4. close": "124.3000",
      "5. volume": "1135411",
    },
    "2021-06-02 13:30:00": {
      "1. open": "124.4200",
      "2. high": "124.5000",
      "3. low": "124.0700",
      "4. close": "124.1950",
      "5. volume": "1770781",
    },
    "2021-06-02 13:15:00": {
      "1. open": "124.4100",
      "2. high": "124.5600",
      "3. low": "124.3550",
      "4. close": "124.4154",
      "5. volume": "1261538",
    },
    "2021-06-02 13:00:00": {
      "1. open": "124.5800",
      "2. high": "124.6450",
      "3. low": "124.4100",
      "4. close": "124.4150",
      "5. volume": "1006759",
    },
    "2021-06-02 12:45:00": {
      "1. open": "124.7050",
      "2. high": "124.7100",
      "3. low": "124.5000",
      "4. close": "124.5850",
      "5. volume": "1474281",
    },
    "2021-06-02 12:30:00": {
      "1. open": "124.9300",
      "2. high": "124.9800",
      "3. low": "124.6200",
      "4. close": "124.7068",
      "5. volume": "1627515",
    },
    "2021-06-02 12:15:00": {
      "1. open": "124.9900",
      "2. high": "125.0200",
      "3. low": "124.8800",
      "4. close": "124.9300",
      "5. volume": "977287",
    },
    "2021-06-02 12:00:00": {
      "1. open": "125.1600",
      "2. high": "125.1600",
      "3. low": "124.9300",
      "4. close": "124.9850",
      "5. volume": "1178603",
    },
    "2021-06-02 11:45:00": {
      "1. open": "124.9700",
      "2. high": "125.1800",
      "3. low": "124.9400",
      "4. close": "125.1550",
      "5. volume": "1532622",
    },
    "2021-06-02 11:30:00": {
      "1. open": "124.8550",
      "2. high": "125.0050",
      "3. low": "124.6500",
      "4. close": "124.9700",
      "5. volume": "2023117",
    },
    "2021-06-02 11:15:00": {
      "1. open": "124.8900",
      "2. high": "125.0100",
      "3. low": "124.7500",
      "4. close": "124.8700",
      "5. volume": "1930725",
    },
  },
};

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

// ******************* FUNCTIONS *******************
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
    // url: app.apiEndpointFinMod,
    method: "GET",
    dataType: "JSON",
    data: {
      apikey: app.apiKeyFinMod,
      // query: keywords,
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
        />
      </td>
      <td>
        <input
          class="portfolio-input"
          type="number"
          name="allocation"
          placeholder="100%"
        />
      </td>
    </tr>
  `;

  $(".portfolio-table").append(portfolioRowHTML);

  // animate showing the new symbol
  $(`#portfolio-${symbol}`).show("slow");
};

app.removeFromPortfolio = (symbol) => {
  const $target = $(`#portfolio-${symbol}`);

  $target.hide("slow", function () {
    $target.remove();
  });
};

app.calcSecurityPurchase = (
  symbol,
  { cost, price, allocation },
  investment,
  remainingInvestment
) => {
  let portfolioCost = 0;

  for (const [symbol, detail] of Object.entries(app.selection)) {
    portfolioCost += detail.cost;
  }
  // console.log("Portfolio cost: " + portfolioCost);

  // Determine what the value of the security should be to achieve the target allocation ratio
  const targetValue =
    (parseFloat(portfolioCost) + parseFloat(investment)) *
    (parseFloat(allocation) / 100);
  // console.log("Target value: " + targetValue);

  // Determine the incremental value to invest to achieve the target allocation ratio
  const incrementalValue = Math.max(targetValue - cost, 0);
  // console.log("Incremental value: " + incrementalValue);

  // Determine the quantity to purchase to achieve the target allocation ratio
  // Limit the purchase to avoid having the investment amount go negative
  const quantity = Math.min(
    Math.floor(incrementalValue / price),
    Math.floor(remainingInvestment / price)
  );
  // console.log("Quantity: " + quantity);

  // Update the global securities object
  app.selection[symbol].quantity = quantity;

  // Update the remaining investment amount
  remainingInvestment = (remainingInvestment - price * quantity).toFixed(2);
  return remainingInvestment;
};

// ******************* EVENT LISTENERS *******************

// Listen for user keystrokes to submit searches
app.submitUserSearch = () => {
  app.$searchInput.on("keypress", () => {
    // get the user's search result and submit api request
    const search = app.$searchInput.val();
    app.getSearchSuggestions(search);

    // TEMPORARY COMMENTED OUT
    // const searchPromise = app.getSearchSuggestions(search);
    // searchPromise
    //   .then((data) => {
    // Empty previous results
    app.$searchResultContainer.empty();

    data = app.sampleSuggestions;

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

    // TEMPORARY COMMENTED OUT
    // })
    // .catch((error) => {
    //   // If error occurs, show no search results found and log error
    //   app.displayNoResults();
    //   console.log(error);
    // });
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
    if (app.selection[symbol] === undefined && addSecurity) {
      app.selection = {
        ...app.selection,
        [symbol]: {
          name: name,
        },
      };

      app.displayRemoveButton($this);

      // Show the selected security to the user
      app.displaySelectedSecurity(symbol, name);

      // Show the selected security in the portfolio container
      app.displayInPortfolio(symbol, name);

      // TEMPORARY COMMENTED OUT
      // const dataPromise = app.getTimeSeriesData(symbol);
      // dataPromise
      //   .then((data) => console.log(data))
      //   .catch((error) => console.log(error));
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

    // Collect user inputs and update the global selections object
    const $tickerSelectors = $(".portfolio-selection-row");
    const $tickers = $tickerSelectors.map(
      (item) => $tickerSelectors[item].id.split("portfolio-")[1]
    );
    const $costs = $("input[name=cost]");
    const $allocations = $("input[name=allocation]");

    // Get total allocation to check if its equals 100% before proceeding with calculations
    let totalAllocation = 0;
    $allocations.map((item) => {
      totalAllocation += parseFloat($allocations[item].value);
    });

    // Proceed if the total allocation by the user is 100%
    if (totalAllocation === 100) {
      let investment = $("#investment").val();
      let remainingInvestment = investment;

      // Loop through each ticker and update global object with the user's inputs
      $allocations.map((index) => {
        const ticker = $tickers[index];
        app.selection = {
          ...app.selection,
          [ticker]: {
            ...app.selection[ticker],
            cost:
              $costs[index].value === "" ? 0 : parseFloat($costs[index].value),
            allocation: parseFloat($allocations[index].value),
          },
        };
      });

      // Loop through securities to get current market price
      for (const [symbol, details] of Object.entries(app.selection)) {
        const promise = app.getSecurityPrice(symbol);

        await promise
          .then((data) => {
            // get the closing price of the first object and save it in the global object
            const timeSeries = data["Time Series (Daily)"];
            const firstKey = Object.keys(timeSeries)[0];
            const price = parseFloat(timeSeries[firstKey]["5. adjusted close"]);
            app.selection[symbol].price = price;

            // Determine the quantity of securities to purchase and update the remaining amount to invest
            remainingInvestment = app.calcSecurityPurchase(
              symbol,
              app.selection[symbol],
              investment,
              remainingInvestment
            );
          })
          .catch((error) => console.log(error));
      }

      console.log(app.selection);
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
