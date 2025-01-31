'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Calculator, DollarSign, PieChart, Calendar, BookOpen, Gift, Building2, BarChart3, Globe, Construction, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

// Translations object
const translations = {
  en: {
    title: "Islamic Financial Planner",
    subtitle: "Comprehensive Sharia-compliant financial planning tools and insights",
    comingSoon: "Coming Soon",
    exploreFeature: "Explore Feature",
    features: [
      {
        id: 1,
        title: "Smart Zakat Calculator",
        description: "Intelligent calculation of Zakat obligations with real-time tracking",
        color: "from-emerald-600 to-emerald-700",
        link: "/financial-planner/zakat-calculator",
        features: ["Real-time Tracking", "Multiple Assets", "Payment Schedule"]
      },
      {
        id: 2,
        title: "Sharia-Compliant Investment Advisor",
        description: "AI-powered investment recommendations following Islamic principles",
        color: "from-green-600 to-green-700",
        features: ["Halal Screening", "Risk Assessment", "Portfolio Management"]
      },
      {
        id: 3,
        title: "Islamic Budgeting Tool",
        description: "Comprehensive budgeting with Islamic financial principles",
        color: "from-emerald-700 to-emerald-800",
        // link: "/budget-tool",
        features: ["Expense Tracking", "Debt Management", "Savings Goals"]
      },
      {
        id: 4,
        title: "Financial Education Hub",
        description: "Educational resources on Islamic finance",
        color: "from-green-700 to-green-800",
        features: ["Learning Modules", "Expert Guidance", "Community Forums"]
      },
      {
        id: 5,
        title: "Charitable Giving Optimizer",
        description: "Smart tools for managing charitable contributions",
        color: "from-emerald-600 to-emerald-700",
        // link: "/charity-tools",
        features: ["Impact Tracking", "Tax Optimization", "Receipt Management"]
      },
      {
        id: 6,
        title: "Business Finance Tools",
        description: "Islamic business finance management solutions",
        color: "from-green-600 to-green-700",
        features: ["Murabaha Tools", "Profit Sharing", "Compliance Checks"]
      },
      {
        id: 7,
        title: "Performance Analytics",
        description: "Comprehensive financial performance tracking",
        color: "from-emerald-700 to-emerald-800",
        features: ["Portfolio Metrics", "Goal Tracking", "Health Checks"]
      }
    ]
  },
  bn: {
    title: "ইসলামিক আর্থিক পরিকল্পনাকারী",
    subtitle: "সমগ্র শরিয়াহ-সম্মত আর্থিক পরিকল্পনা টুল এবং অন্তর্দৃষ্টি",
    comingSoon: "শীঘ্রই আসছে",
    exploreFeature: "বৈশিষ্ট্য দেখুন",
    features: [
      {
        id: 1,
        title: "স্মার্ট যাকাত ক্যালকুলেটর",
        description: "রিয়েল-টাইম ট্র্যাকিং সহ যাকাত দায়িত্বের বুদ্ধিমান হিসাব",
        color: "from-emerald-600 to-emerald-700",
        link: "/zakat-calculator",
        features: ["রিয়েল-টাইম ট্র্যাকিং", "একাধিক সম্পদ", "পেমেন্ট সময়সূচী"]
      },
      {
        id: 2,
        title: "শরিয়াহ-সম্মত বিনিয়োগ পরামর্শদাতা",
        description: "ইসলামি নীতি অনুসরণে এআই-চালিত বিনিয়োগ সুপারিশ",
        color: "from-green-600 to-green-700",
        features: ["হালাল স্ক্রিনিং", "ঝুঁকি মূল্যায়ন", "পোর্টফোলিও ব্যবস্থাপনা"]
      },
      {
        id: 3,
        title: "ইসলামিক বাজেট টুল",
        description: "ইসলামি আর্থিক নীতির সাথে সামগ্রিক বাজেট",
        color: "from-emerald-700 to-emerald-800",
        link: "/budget-tool",
        features: ["খরচ ট্র্যাকিং", "ঋণ ব্যবস্থাপনা", "সঞ্চয় লক্ষ্য"]
      },
      {
        id: 4,
        title: "আর্থিক শিক্ষা কেন্দ্র",
        description: "ইসলামি অর্থনীতি বিষয়ক শিক্ষা সম্পদ",
        color: "from-green-700 to-green-800",
        features: ["শিক্ষা মডিউল", "বিশেষজ্ঞ নির্দেশনা", "কমিউনিটি ফোরাম"]
      },
      {
        id: 5,
        title: "দানশীলতা অপটিমাইজার",
        description: "দান-সদকা পরিচালনার জন্য স্মার্ট টুল",
        color: "from-emerald-600 to-emerald-700",
        link: "/charity-tools",
        features: ["প্রভাব ট্র্যাকিং", "ট্যাক্স অপটিমাইজেশন", "রসিদ ব্যবস্থাপনা"]
      },
      {
        id: 6,
        title: "ব্যবসায়িক আর্থিক টুল",
        description: "ইসলামি ব্যবসায়িক অর্থ ব্যবস্থাপনা সমাধান",
        color: "from-green-600 to-green-700",
        features: ["মুরাবাহা টুল", "মুনাফা ভাগাভাগি", "কমপ্লায়েন্স চেক"]
      },
      {
        id: 7,
        title: "কর্মক্ষমতা বিশ্লেষণ",
        description: "সামগ্রিক আর্থিক কর্মক্ষমতা ট্র্যাকিং",
        color: "from-emerald-700 to-emerald-800",
        features: ["পোর্টফোলিও মেট্রিক্স", "লক্ষ্য ট্র্যাকিং", "স্বাস্থ্য পরীক্ষা"]
      }
    ]
  }
};

// Language selector component
const LanguageSelector = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white flex items-center gap-2 shadow-sm hover:bg-gray-50"
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

// Feature card component
const FeatureCard = ({ feature, translations, lang }) => {
  const isComingSoon = !feature.link;
  const t = translations[lang];

  const icons = {
    1: <Calculator className="w-6 h-6" />,
    2: <PieChart className="w-6 h-6" />,
    3: <DollarSign className="w-6 h-6" />,
    4: <BookOpen className="w-6 h-6" />,
    5: <Gift className="w-6 h-6" />,
    6: <Building2 className="w-6 h-6" />,
    7: <BarChart3 className="w-6 h-6" />
  };
  
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`relative h-24 bg-gradient-to-br ${feature.color}`}>
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0l20 20-20 20L0 20z" fill="%23ffffff"/%3E%3C/svg%3E')`,
            backgroundSize: '24px 24px'
          }}>
        </div>

        {isComingSoon && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-green-700 flex items-center gap-1">
              <Construction className="w-3 h-3" />
              {t.comingSoon}
            </Badge>
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 h-full flex items-center gap-4 px-6">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-lg">
            {icons[feature.id]}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {t.features.find(f => f.id === feature.id)?.title || feature.title}
          </h3>
        </div>
      </div>

      <CardContent className="p-6">
        <p className="text-gray-700 mb-4">
          {t.features.find(f => f.id === feature.id)?.description || feature.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {(t.features.find(f => f.id === feature.id)?.features || feature.features).map((feat, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-green-50 text-green-700 hover:bg-green-100"
            >
              {feat}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className={`w-full ${!isComingSoon ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          disabled={isComingSoon}
        >
          <span className="flex items-center justify-center gap-2">
            {!isComingSoon ? (
              <Link href={feature.link} className='flex items-center justify-center gap-2'>
                <>{t.exploreFeature} <ChevronRight className="w-4 h-4" /></>
              </Link>
            ) : (
              t.comingSoon
            )}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main component
const IslamicFinancePlanner = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white">
      <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
      
      <div
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0l30 30-30 30L0 30z\" fill=\"%23047857\" fill-opacity=\"0.8\"/%3E%3C/svg%3E')",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative">
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-green-800 max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, index) => (
            <div
              key={feature.id}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <FeatureCard feature={feature} translations={translations} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default IslamicFinancePlanner;
        