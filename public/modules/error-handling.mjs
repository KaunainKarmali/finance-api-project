// ********************************************
// *******************HTML*********************
// ********************************************

const requiredPopupHTML = () => {
  return `
    <div class="required-field-popup">
        <i class="fas fa-exclamation-circle required-field-icon"></i>
        <p class="required-field-text">Required field</p>
    </div>
    `;
};

const allocationRequiredHTML = () => {
  return `
    <div class="required-field-popup required-allocation-popup">
        <i class="fas fa-exclamation-circle required-field-icon"></i>
        <p class="required-field-text">Allocation does not equal 100%</p>
    </div>
    `;
};

// ****************************************************
// *******************DISPLAY FUNCTIONS****************
// ****************************************************

// Display popup when a user input is required
export const displayRequiredPopup = (parentSelector) => {
  const requiredPopup = requiredPopupHTML();

  parentSelector.append(requiredPopup);
};

// Display popup when the user's allocation is not 100%
export const displayAllocationRequiredPopup = (parentSelector) => {
  const allocationRequired = allocationRequiredHTML();

  parentSelector.append(allocationRequired);
};

// ****************************************************************
// *******************REMOVE FROM DISPLAY FUNCTIONS****************
// ****************************************************************

// Remove popup for showing user input is required
export const removeRequiredPopup = (parentSelector) => {
  parentSelector.children(".required-field-popup").remove();
};

// Remove popup for showing user allocation is not 100%
export const removeAllocationPopup = (parentSelector) => {
  parentSelector.children(".required-allocation-popup").remove();
};

// ****************************************************
// *********************OTHER FUNCTIONS****************
// ****************************************************

export const highlightRequiredField = (inputSelector) => {
  inputSelector.addClass("required-field-input");
};

export const unhighlightRequiredField = (inputSelector) => {
  inputSelector.removeClass("required-field-input");
};
