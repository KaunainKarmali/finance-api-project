export const calcSecurityPurchase = (
  { cost, price, allocation, quantityHeld },
  totalInvestment,
  totalCost
) => {
  // Determine what the value of the security should be to achieve the target allocation ratio
  const targetValue = (totalInvestment + totalCost) * (allocation / 100);

  // Determine how many additional shares to purchase or sell to achieve the target allocation ratio
  let incrementalQty = (targetValue - cost) / price;
  let roundedQty = 0;

  if (incrementalQty > 0) {
    roundedQty = Math.floor(incrementalQty);
  } else {
    const qtyToSell = Math.ceil(Math.abs(incrementalQty));

    // Limit the quantity to be sold to the quantity held in as investment
    roundedQty = -Math.min(quantityHeld, qtyToSell);
  }

  return roundedQty;
};
