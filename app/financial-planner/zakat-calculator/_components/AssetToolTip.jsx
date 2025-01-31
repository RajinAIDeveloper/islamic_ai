export const getAssetTooltip = (assetType) => {
    const tooltips = {
      cash: "Include all cash in hand, bank accounts, savings accounts, and fixed deposits",
      stocks: "Current market value of shares, mutual funds, and other securities",
      businessInventory: "Value of goods intended for sale in your business",
      otherInvestments: "Include value of bonds, certificates, and other investment vehicles",
      accountsReceivable: "Money owed to you by others that you reasonably expect to receive",
      personalLoans: "Money you have lent to others that you expect to be repaid",
      retirementAccounts: "Include accessible retirement funds (consult scholar for specific cases)",
      realEstate: "Value of properties held for investment (excluding primary residence)",
      rentalIncome: "Accumulated rental income (not future expected income)",
      agriculturalAssets: "Value of crops and produce intended for sale",
      livestock: "Value of animals kept for trading purposes",
      preciousItems: "Value of jewelry (besides personal use), gemstones, and precious metals",
      intellectualProperty: "Monetary value of patents, copyrights, and trademarks",
      crypto: "Current market value of cryptocurrency holdings",
      other: "Any other assets of value not covered in other categories"
    };
    
    return tooltips[assetType] || null;
  };