// Truncate name or symbol if its too long
export const truncateString = (string, length) => {
  if (string.length > length) {
    string = string.substring(0, length).trim() + "...";
  }
  return string;
};

// Calculates the total balance for the property specifed
export const aggregateBalance = (object, property) => {
  let balance = 0;

  for (const [symbol, detail] of Object.entries(object)) {
    balance += detail[property];
  }

  return balance;
};

// Calculates the total investment balance of the portfolio
export const calcInvestmentBalance = (object) => {
  let balance = 0;

  for (const [symbol, detail] of Object.entries(object)) {
    balance += detail.price
      ? detail.price
      : 0 * detail.quantity
      ? detail.quantity
      : 0;
  }

  return balance;
};

// Adds commas to a number
export const numberWithCommas = (numb) => {
  return numb.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

// Get the total number of items in an object
export const getSize = (object) => {
  let size = 0;
  for (key in object) {
    if (object.hasOwnProperty(key)) size++;
  }
  return size;
};
