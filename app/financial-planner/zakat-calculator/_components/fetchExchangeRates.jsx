// app/financial-planner/zakat-calculator/fetchExchangeRates.jsx
export const fetchExchangeRates = async () => {
  // Simulate API call with error handling
  try {
    return {
      USD: 1,
      BDT: 110.25,
      EUR: 0.92,
      GBP: 0.79,
      SAR: 3.75,
      AED: 3.67,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {
      error: 'Failed to fetch exchange rates',
      lastUpdated: new Date().toISOString()
    };
  }
};