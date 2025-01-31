'use client';

import React, { useState } from 'react';
import {
  Book,
  Clock,
  Search,
  Calculator,
  Calendar,
  Users,
  MessageCircle,
  Map,
  Share2,
  Heart,
  ChevronRight,
  Construction,
  Globe
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link';

// Services data
const services = [
  {
    id: 1,
    title: "Smart Quran Companion",
    icon: <Book className="w-6 h-6" />,
    description: "Real-time Tafsir, translation, and AI-powered voice recognition for perfect Tajweed.",
    color: "from-green-600 to-green-700",
    // link: "/quran-companion",
    features: ["Voice Recognition", "Real-time Translation", "Personalized Learning"]
  },
  {
    id: 2,
    title: "Prayer Time Optimizer",
    icon: <Clock className="w-6 h-6" />,
    description: "Accurate prayer times with smart notifications and AR Qibla direction.",
    color: "from-emerald-600 to-emerald-700",
    features: ["Location-based Times", "Smart Notifications", "AR Qibla"]
  },
  {
    id: 3,
    title: "AI Halal Food Finder",
    icon: <Search className="w-6 h-6" />,
    description: "Scan food products and restaurant menus to verify halal status.",
    color: "from-teal-600 to-teal-700",
    // link: "/halal-finder",
    features: ["Product Scanner", "Restaurant Finder", "Certification Checker"]
  },
  {
    id: 4,
    title: "Islamic Financial Planner",
    icon: <Calculator className="w-6 h-6" />,
    description: "AI-based Zakat calculator and Sharia-compliant investment recommendations.",
    color: "from-green-700 to-green-800",
    link: "/financial-planner",
    features: ["Zakat Calculator", "Halal Investments", "Financial Tracking"]
  },
  {
    id: 5,
    title: "AI Ramadan Tracker",
    icon: <Calendar className="w-6 h-6" />,
    description: "Personalized fasting schedule with AI-powered meal planning and spiritual guidance.",
    color: "from-emerald-700 to-emerald-800",
    // link: "/ramadan",
    features: ["Fast Tracking", "Meal Planning", "Spiritual Goals"]
  },
  {
    id: 6,
    title: "Muslim Parenting Assistant",
    icon: <Users className="w-6 h-6" />,
    description: "AI-generated Islamic stories and guidance for children's Islamic education.",
    color: "from-teal-700 to-teal-800",
    features: ["Islamic Stories", "Educational Games", "Daily Activities"]
  },
  {
    id: 7,
    title: "Islamic Knowledge AI Bot",
    icon: <MessageCircle className="w-6 h-6" />,
    description: "24/7 AI scholar for Fiqh and Sharia questions with interactive learning.",
    color: "from-green-600 to-green-700",
    // link: "/ai-scholar",
    features: ["24/7 Assistance", "Verified Sources", "Interactive Learning"]
  },
  {
    id: 8,
    title: "Hajj and Umrah Planner",
    icon: <Map className="w-6 h-6" />,
    description: "AI-organized itineraries with AR guidance for religious rituals.",
    color: "from-emerald-600 to-emerald-700",
    features: ["Ritual Guide", "Travel Planning", "AR Navigation"]
  },
  {
    id: 9,
    title: "Islamic Social Network",
    icon: <Share2 className="w-6 h-6" />,
    description: "Connect with others for Quran study and Islamic events.",
    color: "from-teal-600 to-teal-700",
    features: ["Study Groups", "Event Planning", "Community Chat"]
  },
  {
    id: 10,
    title: "Mental Health & Dua Coach",
    icon: <Heart className="w-6 h-6" />,
    description: "AI-powered Dua suggestions and Islamic-based mental wellness guidance.",
    color: "from-green-700 to-green-800",
    // link: "/wellness",
    features: ["Daily Duas", "Mood Tracking", "Islamic Counseling"]
  }
];

// Language translations
const translations = {
  en: {
    title: "Islamic AI Platform",
    subtitle: "Empowering Muslims with AI-driven solutions for spiritual growth and daily Islamic life",
    comingSoon: "Coming Soon",
    exploreService: "Explore Service",
    services: [
      {
        id: 1,
        title: "Smart Quran Companion",
        description: "Real-time Tafsir, translation, and AI-powered voice recognition for perfect Tajweed.",
        features: ["Voice Recognition", "Real-time Translation", "Personalized Learning"]
      },
      {
        id: 2,
        title: "Prayer Time Optimizer",
        description: "Accurate prayer times with smart notifications and AR Qibla direction.",
        features: ["Location-based Times", "Smart Notifications", "AR Qibla"]
      },
      {
        id: 3,
        title: "AI Halal Food Finder",
        description: "Scan food products and restaurant menus to verify halal status.",
        features: ["Product Scanner", "Restaurant Finder", "Certification Checker"]
      },
      {
        id: 4,
        title: "Islamic Financial Planner",
        description: "AI-based Zakat calculator and Sharia-compliant investment recommendations.",
        features: ["Zakat Calculator", "Halal Investments", "Financial Tracking"]
      },
      {
        id: 5,
        title: "AI Ramadan Tracker",
        description: "Personalized fasting schedule with AI-powered meal planning and spiritual guidance.",
        features: ["Fast Tracking", "Meal Planning", "Spiritual Goals"]
      },
      {
        id: 6,
        title: "Muslim Parenting Assistant",
        description: "AI-generated Islamic stories and guidance for children's Islamic education.",
        features: ["Islamic Stories", "Educational Games", "Daily Activities"]
      },
      {
        id: 7,
        title: "Islamic Knowledge AI Bot",
        description: "24/7 AI scholar for Fiqh and Sharia questions with interactive learning.",
        features: ["24/7 Assistance", "Verified Sources", "Interactive Learning"]
      },
      {
        id: 8,
        title: "Hajj and Umrah Planner",
        description: "AI-organized itineraries with AR guidance for religious rituals.",
        features: ["Ritual Guide", "Travel Planning", "AR Navigation"]
      },
      {
        id: 9,
        title: "Islamic Social Network",
        description: "Connect with others for Quran study and Islamic events.",
        features: ["Study Groups", "Event Planning", "Community Chat"]
      },
      {
        id: 10,
        title: "Mental Health & Dua Coach",
        description: "AI-powered Dua suggestions and Islamic-based mental wellness guidance.",
        features: ["Daily Duas", "Mood Tracking", "Islamic Counseling"]
      }
    ]
  },
  bn: {
    title: "ইসলামিক এআই প্ল্যাটফর্ম",
    subtitle: "মুসলিমদের আধ্যাত্মিক বিকাশ এবং দৈনন্দিন ইসলামি জীবনের জন্য এআই-চালিত সমাধান",
    comingSoon: "শীঘ্রই আসছে",
    exploreService: "সেবা অন্বেষণ করুন",
    services: [
      {
        id: 1,
        title: "স্মার্ট কোরআন কম্পানিয়ন",
        description: "রিয়েল-টাইম তাফসির, অনুবাদ এবং নিখুঁত তাজবীদের জন্য এআই-চালিত ভয়েস রিকগনিশন।",
        features: ["ভয়েস রিকগনিশন", "রিয়েল-টাইম অনুবাদ", "ব্যক্তিগতকৃত শিক্ষা"]
      },
      {
        id: 2,
        title: "নামাজের সময় অপটিমাইজার",
        description: "স্মার্ট বিজ্ঞপ্তি এবং এআর কিবলা দিকনির্দেশনা সহ সঠিক নামাজের সময়।",
        features: ["লোকেশন-ভিত্তিক সময়", "স্মার্ট বিজ্ঞপ্তি", "এআর কিবলা"]
      },
      {
        id: 3,
        title: "এআই হালাল ফুড ফাইন্ডার",
        description: "খাবার পণ্য এবং রেস্তোরাঁর মেনু স্ক্যান করে হালাল স্ট্যাটাস যাচাই করুন।",
        features: ["পণ্য স্ক্যানার", "রেস্তোরাঁ খোঁজক", "সার্টিফিকেশন চেকার"]
      },
      {
        id: 4,
        title: "ইসলামিক আর্থিক পরিকল্পনাকারী",
        description: "এআই-ভিত্তিক যাকাত ক্যালকুলেটর এবং শরিয়াহ-সম্মত বিনিয়োগ সুপারিশ।",
        features: ["যাকাত ক্যালকুলেটর", "হালাল বিনিয়োগ", "আর্থিক ট্র্যাকিং"]
      },
      {
        id: 5,
        title: "এআই রমজান ট্র্যাকার",
        description: "এআই-চালিত খাবার পরিকল্পনা এবং আধ্যাত্মিক নির্দেশনা সহ ব্যক্তিগত রোজার সময়সূচী।",
        features: ["রোজা ট্র্যাকিং", "খাবার পরিকল্পনা", "আধ্যাত্মিক লক্ষ্য"]
      },
      {
        id: 6,
        title: "মুসলিম প্যারেন্টিং সহকারী",
        description: "শিশুদের ইসলামি শিক্ষার জন্য এআই-জেনারেটেড ইসলামি গল্প এবং নির্দেশনা।",
        features: ["ইসলামি গল্প", "শিক্ষামূলক গেম", "দৈনিক কার্যক্রম"]
      },
      {
        id: 7,
        title: "ইসলামিক নলেজ এআই বট",
        description: "ফিকহ এবং শরিয়াহ প্রশ্নের জন্য ২৪/৭ এআই স্কলার ইন্টারেক্টিভ লার্নিং সহ।",
        features: ["২৪/৭ সহায়তা", "যাচাইকৃত সূত্র", "ইন্টারেক্টিভ লার্নিং"]
      },
      {
        id: 8,
        title: "হজ্জ ও উমরাহ প্ল্যানার",
        description: "ধর্মীয় রীতি-নীতির জন্য এআর গাইডেন্স সহ এআই-সংগঠিত ভ্রমণসূচী।",
        features: ["রীতি-নীতি গাইড", "ভ্রমণ পরিকল্পনা", "এআর নেভিগেশন"]
      },
      {
        id: 9,
        title: "ইসলামিক সোশ্যাল নেটওয়ার্ক",
        description: "কোরআন অধ্যয়ন এবং ইসলামি অনুষ্ঠানের জন্য অন্যদের সাথে সংযোগ স্থাপন করুন।",
        features: ["স্টাডি গ্রুপ", "ইভেন্ট প্ল্যানিং", "কমিউনিটি চ্যাট"]
      },
      {
        id: 10,
        title: "মানসিক স্বাস্থ্য ও দোয়া কোচ",
        description: "এআই-চালিত দোয়া সুপারিশ এবং ইসলামি-ভিত্তিক মানসিক সুস্থতা নির্দেশনা।",
        features: ["দৈনিক দোয়া", "মুড ট্র্যাকিং", "ইসলামি কাউন্সেলিং"]
      }
    ]
  }
};

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

const ServiceCard = ({ service, translations, lang }) => {
  const isComingSoon = !service.link;
  const t = translations[lang];
  
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Card Header with Islamic-inspired design */}
      <div className={`relative h-24 bg-gradient-to-br ${service.color}`}>
        {/* Decorative Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0l20 20-20 20L0 20z" fill="%23ffffff"/%3E%3C/svg%3E')`,
            backgroundSize: '24px 24px'
          }}>
        </div>

        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-green-700 flex items-center gap-1">
              <Construction className="w-3 h-3" />
              {t.comingSoon}
            </Badge>
          </div>
        )}

        {/* Service Icon and Title */}
        <div className="absolute top-0 left-0 right-0 h-full flex items-center gap-4 px-6">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-lg">
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {t.services.find(s => s.id === service.id)?.title || service.title}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-6">
        <p className="text-gray-700 mb-4">
          {t.services.find(s => s.id === service.id)?.description || service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {(t.services.find(s => s.id === service.id)?.features || service.features).map((feature, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-green-50 text-green-700 hover:bg-green-100"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-6 pt-0">
        <Button 
          className={`w-full ${!isComingSoon ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          disabled={isComingSoon}
        >
          <span>
            {!isComingSoon ? (
              <Link href={service.link} className="flex items-center justify-center gap-2">{t.exploreService} <ChevronRight className="w-4 h-4" /></Link>
            ) : (
              t.comingSoon
            )}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

const IslamicAIPlatform = () => {
  const [lang, setLang] = useState('en');

  return (
    <div className="min-h-screen bg-white">
      <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
      
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0l30 30-30 30L0 30z\" fill=\"%23047857\" fill-opacity=\"0.8\"/%3E%3C/svg%3E')",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4">
            {translations[lang].title}
          </h1>
          <p className="text-xl text-green-800 max-w-2xl mx-auto px-4">
            {translations[lang].subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              style={{
                animation: `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`,
                opacity: 0
              }}
            >
              <ServiceCard service={service} translations={translations} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default IslamicAIPlatform;