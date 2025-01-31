'use client';

import React, { useState, useEffect } from 'react';

import { Calculator, HelpCircle, AlertCircle, Loader2, Globe, RefreshCw, Info } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


// Language Selector Component
export const LanguageSelector = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white flex items-center gap-2 shadow-sm hover:bg-gray-50 text-sm sm:text-base h-8 sm:h-10"
          >
            <Globe className="w-4 h-4" />
            {currentLang === 'en' ? 'English' : 'বাংলা'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onLanguageChange('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onLanguageChange('bn')}>
            বাংলা
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};