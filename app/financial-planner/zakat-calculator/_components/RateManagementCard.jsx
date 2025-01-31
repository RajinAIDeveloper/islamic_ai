'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, HelpCircle, AlertCircle, Loader2, Globe, RefreshCw, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Rate Management Component
export const RateManagementCard = ({ 
    currency, 
    currencies, 
    lastUpdated, 
    updating,
    onUpdateRates,
    onCurrencyChange,
    lang,
    t 
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedRates, setEditedRates] = useState(null);
  
    const handleEditStart = () => {
      setEditedRates({
        goldPrice: currency.goldPrice,
        silverPrice: currency.silverPrice,
        exchangeRate: currency.exchangeRate
      });
      setIsEditing(true);
    };
  
    const handleSave = () => {
      const updatedCurrencies = currencies.map(c => {
        if (c.code === currency.code) {
          return {
            ...c,
            goldPrice: parseFloat(editedRates.goldPrice),
            silverPrice: parseFloat(editedRates.silverPrice),
            exchangeRate: parseFloat(editedRates.exchangeRate)
          };
        }
        return c;
      });
      onCurrencyChange(updatedCurrencies);
      setIsEditing(false);
    };
  
    return (
      <Card className="mb-4 md:mb-6">
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
              <CardTitle className="text-lg md:text-xl">{t.rateManagement.title}</CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {!isEditing ? (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={handleEditStart}
                        className="text-gray-600"
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        {t.rateManagement.editRates}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t.rateManagement.tooltips.edit}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={onUpdateRates}
                        disabled={updating}
                        variant="outline"
                        className="ml-2"
                      >
                        {updating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4 mr-2" />
                        )}
                        {t.rateManagement.updateRates}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t.rateManagement.tooltips.update}
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    {t.rateManagement.cancelEdit}
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="ml-2 bg-green-700 hover:bg-green-800"
                  >
                    {t.rateManagement.saveRates}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <label className="min-w-40">Gold Price (per gram):</label>
                <input
                  type="number"
                  value={editedRates.goldPrice}
                  onChange={(e) => setEditedRates(prev => ({
                    ...prev,
                    goldPrice: e.target.value
                  }))}
                  className="border rounded p-2"
                  step="0.01"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="min-w-40">Silver Price (per gram):</label>
                <input
                  type="number"
                  value={editedRates.silverPrice}
                  onChange={(e) => setEditedRates(prev => ({
                    ...prev,
                    silverPrice: e.target.value
                  }))}
                  className="border rounded p-2"
                  step="0.01"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="min-w-40">Exchange Rate:</label>
                <input
                  type="number"
                  value={editedRates.exchangeRate}
                  onChange={(e) => setEditedRates(prev => ({
                    ...prev,
                    exchangeRate: e.target.value
                  }))}
                  className="border rounded p-2"
                  step="0.0001"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };