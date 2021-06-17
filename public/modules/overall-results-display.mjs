import { numberWithCommas } from "./utils.mjs";

// ********************************************
// *******************HTML*********************
// ********************************************
const overallResultsHTML = (investment, portfolioCost) => {
  return `
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
};

// ****************************************************
// *******************DISPLAY FUNCTIONS****************
// ****************************************************

// Displays the overall results to the user
export const displayOverallResults = (
  portfolioCost,
  investment,
  investmentBal
) => {
  const resultsHTML = overallResultsHTML(
    portfolioCost,
    investment,
    investmentBal
  );

  $(".results-wrapper").append(resultsHTML);
};

// Shows the overall results container
export const showOverallResults = () => {
  // animate showing the overall results
  $(`.results-wrapper`).show("slow");

  // animate showing the overall results
  $(`.rebalance-container`).show("slow");
};

// ****************************************************************
// *******************REMOVE FROM DISPLAY FUNCTIONS****************
// ****************************************************************

// Hides the overall results container
export const hideOverallResults = () => {
  // animate hiding the overall results
  $(`.results-wrapper`).hide("slow");

  // animate hiding the overall results
  $(`.rebalance-container`).hide("slow");
};
