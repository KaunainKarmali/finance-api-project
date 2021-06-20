# myFinancePal

## About

### Description
myFinancePal is a portfolio re-balancing tool that identifies how many securities are required to be purchased or sold to achieve a desired target allocation. This is analogous to a self-service robo-advisor.

### Technology used
The following tech stack was used in the development of myFinancePal:
* HTML5
* CSS
* JavaScript (ES6)
* jQuery
* API calls made using `got` package

## Getting started
Begin using the app by performing the following:
* npm install
* Obtain free API keys from [Alpha Vantage](https://www.alphavantage.co/) and [Finance Modelling Prep](https://financialmodelingprep.com/developer)
* Replace the API keys in the server-scripts/api.js file
* Run using node or nodemon using `node index.js` or `nodemon index.js`

## Features
The following features exist:
* Search bar provides search suggessions based on user inputs paired with API calls
* Input validations on all user input fields
* Fetche's previous day's closing price for each security using API calls
* Calculates the total number of securities to purchase and/or sell based on the user's inputs and the most recent closing price
* Mobile responsive

## Limitations
The following limitations apply to the use of this app:
* Maximum of 5 API calls per minute to Alpha Vantange
* Maximum of 250 API calls per day to each of Alpha Vantange and Finance Modelling Prep

## Licence

MIT License

Copyright (c) 2021 Kaunain Karmali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
