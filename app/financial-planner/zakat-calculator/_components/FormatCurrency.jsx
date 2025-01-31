// Utility functions
export const formatCurrency = (amount, decimals = 2) => {
  return Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};