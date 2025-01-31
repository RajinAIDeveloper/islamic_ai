'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, HelpCircle, AlertCircle, Loader2, Globe, RefreshCw, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getAssetTooltip } from './_components/AssetToolTip';
import { defaultCurrencies } from './_components/DefaultCurrencies';
import { fetchExchangeRates } from './_components/FetchExchangeRates';
import { fetchMetalPrices } from './_components/FetchMetalPrice';
import { formatCurrency } from './_components/FormatCurrency';
import { LanguageSelector } from './_components/LanguageSelector';
import { RateManagementCard } from './_components/RateManagementCard';
import { translations } from './_components/Translations';
import ZakatAnalysisDisplay from './_components/ZakatAnalysisDisplay';
import { getDetailedZakatAnalysis } from './_components/ZakatAnalysisDisplay';


// Main Calculator Component
const ZakatCalculatorPage = () => {
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [currency, setCurrency] = useState(defaultCurrencies[0]);
  const [currencies, setCurrencies] = useState(defaultCurrencies);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  // Added additional states
  const [liabilities, setLiabilities] = useState({
    businessDebts: 0,
    personalLoansPayable: 0,
    creditCardBalances: 0,
    upcomingExpenses: 0,
    taxLiabilities: 0,
    wagesDue: 0
  });

  const [businessAssets, setBusinessAssets] = useState({
    equipment: 0,
    rawMaterials: 0,
    workInProgress: 0,
    fixedAssets: 0,
    tradeGoods: 0,
    goodwill: 0
  });

  const [preferences, setPreferences] = useState({
    calculationType: 'lunar', // or 'solar'
    madhab: 'hanafi', // or 'shafi', 'maliki', 'hanbali'
    assetOwnership: 'individual', // or 'joint'
  });

  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    stocks: 0,
    businessInventory: 0,
    otherInvestments: 0,
    accountsReceivable: 0,
    personalLoans: 0,
    retirementAccounts: 0,
    realEstate: 0,
    rentalIncome: 0,
    agriculturalAssets: 0,
    livestock: 0,
    preciousItems: 0,
    intellectualProperty: 0,
    crypto: 0,
    other: 0
  });
  const [results, setResults] = useState({
    totalAssets: 0,
    zakatPayable: 0,
    dueDate: '',
    aiAnalysis: null
  });
  const [nisab, setNisab] = useState({ nisabThreshold: 0 });
  const t = translations[lang];

  const { toast } = useToast();

  useEffect(() => {
    calculateNisabThreshold();
  }, [currency]);

  const calculateNisabThreshold = () => {
    const goldNisab = currency.goldPrice * 85;
    const silverNisab = currency.silverPrice * 595;
    setNisab({
      nisabThreshold: Math.min(goldNisab, silverNisab)
    });
  };

  const handleCurrencyChange = (currencyCode) => {
    const newCurrency = currencies.find(c => c.code === currencyCode);
    if (newCurrency) {
      setCurrency(newCurrency);
    }
  };

  const handleAssetChange = (assetType, value) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setAssets(prev => ({
      ...prev,
      [assetType]: numValue
    }));
  };

  const updateCurrencyData = async () => {
    setUpdating(true);
    try {
      const [metalPrices, exchangeRates] = await Promise.all([
        fetchMetalPrices(),
        fetchExchangeRates()
      ]);

      const updatedCurrencies = currencies.map(curr => ({
        ...curr,
        goldPrice: metalPrices.goldPricePerGram * exchangeRates[curr.code],
        silverPrice: metalPrices.silverPricePerGram * exchangeRates[curr.code],
        exchangeRate: exchangeRates[curr.code]
      }));

      setCurrencies(updatedCurrencies);
      setLastUpdated(new Date());
      
      const updatedCurrentCurrency = updatedCurrencies.find(c => c.code === currency.code);
      if (updatedCurrentCurrency) {
        setCurrency(updatedCurrentCurrency);
      }

      toast({
        title: t.rateManagement.updateSuccess,
        duration: 3000
      });
    } catch (error) {
      console.error('Error updating rates:', error);
      toast({
        title: t.rateManagement.updateError,
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setUpdating(false);
    }
  };

  const calculateZakat = async () => {
    setLoading(true);
    try {
      let totalAssets = Object.entries(assets).reduce((sum, [type, value]) => {
        if (type === 'gold') {
          return sum + (value * currency.goldPrice);
        } else if (type === 'silver') {
          return sum + (value * currency.silverPrice);
        }
        return sum + value;
      }, 0);

      const zakatPayable = totalAssets >= nisab.nisabThreshold ? totalAssets * 0.025 : 0;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 354); // Approximate lunar year
      
      
      const analysis = await getDetailedZakatAnalysis(
        assets, 
        totalAssets, 
        nisab.nisabThreshold, 
        currency
      );

      setResults({
        totalAssets,
        zakatPayable,
        dueDate: dueDate.toLocaleDateString(lang === 'en' ? 'en-US' : 'bn-BD'),
        aiAnalysis: analysis
      });
    } catch (error) {
      console.error('Error calculating Zakat:', error);
      toast({
        title: t.errors.calculationError,
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
        
        <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-16">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-green-900 mb-4 md:mb-6">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-green-800 max-w-3xl mx-auto px-2">
              {t.subtitle}
            </p>
          </div>

          {/* Rate Management Card */}
          <RateManagementCard
            currency={currency}
            currencies={currencies}
            lastUpdated={lastUpdated}
            updating={updating}
            onUpdateRates={updateCurrencyData}
            onCurrencyChange={setCurrencies}
            lang={lang}
            t={t}
          />

          {/* Main Calculator Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  <CardTitle className="text-base sm:text-lg">{t.enterAssets}</CardTitle>
                </div>
                <Select
                  value={currency.code}
                  onValueChange={handleCurrencyChange}
                >
                  <SelectTrigger className="w-full sm:w-[180px] text-sm sm:text-base h-8 sm:h-10">
                    <SelectValue placeholder={t.selectCurrency} />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} - {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* Asset Input Section */}
                <div className="grid gap-4">
                  {Object.entries(assets).map(([assetType, value]) => (
                    <div key={assetType} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <label className="min-w-[140px] sm:min-w-[160px] flex items-center gap-2 text-sm sm:text-base">
                        {t?.assets?.[assetType] || translations.en.assets[assetType]}
                        {(assetType === 'gold' || assetType === 'silver') ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[200px] sm:max-w-none">
                              {`Current ${assetType} price: ${formatCurrency(currency[`${assetType}Price`])} per gram`}
                            </TooltipContent>
                          </Tooltip>
                        ) : getAssetTooltip(assetType) && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[250px] sm:max-w-none">
                              {getAssetTooltip(assetType)}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </label>
                      <div className="flex-1 w-full sm:w-auto">
                        <div className="relative">
                          {(assetType !== 'gold' && assetType !== 'silver') && (
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">
                              {currency.symbol}
                            </span>
                          )}
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => handleAssetChange(assetType, e.target.value)}
                            className={`border rounded p-2 w-full text-sm sm:text-base ${
                              assetType !== 'gold' && assetType !== 'silver' ? 'pl-8' : ''
                            }`}
                            min="0"
                            step={assetType === 'gold' || assetType === 'silver' ? '0.1' : '1'}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Results Section */}
                <div className="mt-4 sm:mt-6 border-t pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.results}</h3>
                  <div className="grid gap-3 sm:gap-4 text-sm sm:text-base">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                      <span>{t.metrics.totalAssets}:</span>
                      <span className="font-semibold">{formatCurrency(results.totalAssets)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>{t.metrics.nisabThreshold}:</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Based on the lower of:
                            <br />- Gold Nisab (85g): {formatCurrency(currency.goldPrice * 85)}
                            <br />- Silver Nisab (595g): {formatCurrency(currency.silverPrice * 595)}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="font-semibold">{formatCurrency(nisab.nisabThreshold)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.metrics.zakatPayable}:</span>
                      <span className="font-semibold text-emerald-600">
                        {formatCurrency(results.zakatPayable)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.metrics.dueDate}:</span>
                      <span className="font-semibold">{results.dueDate}</span>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Section */}
                {loading ? (
          <div className="flex items-center justify-center p-4 sm:p-6">
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
            <span className="ml-2 text-sm sm:text-base">{t.analyzing}</span>
          </div>
        ) : results.aiAnalysis && (
          <div className="mt-4 sm:mt-6 border-t pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.aiAnalysis}</h3>
            <ZakatAnalysisDisplay 
              analysis={results.aiAnalysis} 
              currency={currency}
            />
          </div>
        )}
              </div>

              {/* Calculate Button */}
              <div className="mt-6">
                <Button
                  onClick={calculateZakat}
                  className="w-full bg-green-700 hover:bg-green-800 text-lg h-12"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.calculating}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      {t.calculateZakat}
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-8 text-center text-sm text-gray-600">
            {lang === 'en' ? (
              <p>For more detailed guidance about Zakat calculation, please consult with a qualified Islamic scholar.</p>
            ) : (
              <p>যাকাত হিসাব সম্পর্কে আরও বিস্তারিত নির্দেশনার জন্য, অনুগ্রহ করে একজন যোগ্য ইসলামিক স্কলারের পরামর্শ নিন।</p>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ZakatCalculatorPage;

