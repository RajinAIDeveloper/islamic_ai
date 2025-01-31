// Mock API functions (replace with actual implementations)
export const fetchMetalPrices = async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          goldPricePerGram: 65.00,
          silverPricePerGram: 0.75
        });
      }, 1000);
    });
  };