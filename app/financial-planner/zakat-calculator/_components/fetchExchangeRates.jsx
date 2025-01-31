export const fetchExchangeRates = async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          USD: 1,
          BDT: 110.25,
          EUR: 0.92,
          GBP: 0.79,
          SAR: 3.75,
          AED: 3.67
        });
      }, 1000);
    });
  };