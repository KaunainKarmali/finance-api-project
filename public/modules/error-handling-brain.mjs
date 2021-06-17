import {
  highlightRequiredField,
  unhighlightRequiredField,
} from "./error-handling-display.mjs";

// Validates whether the input fields in the portfolio table are populated or not
export const validateByInputName = (ticker, inputName, securitiesObj) => {
  const id = `#portfolio-${ticker}`;

  const $selector = $(id).find(`input[name=${inputName}]`);

  if ($selector.val() === "") {
    highlightRequiredField($selector);
    return false;
  } else {
    unhighlightRequiredField($selector);
    securitiesObj[ticker][inputName] = parseFloat($selector.val());
    return true;
  }
};
