'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Users, Sparkles, BookOpen, Code2, MessageCircle, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

// Translations
const translations = {
  en: {
    title: "About Our Platform",
    subtitle: "Bridging the gap between Islamic knowledge and modern technology to enhance the Muslim experience in the digital age",
    mission: {
      title: "Our Mission",
      content: "To empower Muslims worldwide with innovative AI solutions that enhance their spiritual journey and daily Islamic practices while staying true to Islamic principles."
    },
    vision: {
      title: "Our Vision",
      content: "To become the leading platform in combining Islamic knowledge with cutting-edge AI technology, making authentic Islamic guidance accessible to everyone."
    },
    featuresTitle: "What Makes Us Different",
    exploreServices: "Explore Our Services",
    features: [
      {
        title: "Islamic Authenticity",
        content: "All our services are developed under the guidance of qualified Islamic scholars to ensure compliance with Shariah principles."
      },
      {
        title: "Advanced Technology",
        content: "We utilize state-of-the-art AI technologies to provide intelligent, personalized Islamic solutions."
      },
      {
        title: "Community Focus",
        content: "Built with and for the Muslim community, addressing real needs and challenges in practicing Islam in the modern world."
      },
      {
        title: "Continuous Support",
        content: "24/7 assistance with regular updates and improvements based on community feedback and scholarly guidance."
      }
    ]
  },
  bn: {
    title: "আমাদের প্ল্যাটফর্ম সম্পর্কে",
    subtitle: "ডিজিটাল যুগে মুসলিম অভিজ্ঞতা উন্নত করতে ইসলামি জ্ঞান এবং আধুনিক প্রযুক্তির মধ্যে সেতুবন্ধন",
    mission: {
      title: "আমাদের লক্ষ্য",
      content: "ইসলামি নীতিমালা মেনে চলার পাশাপাশি মুসলিমদের আধ্যাত্মিক যাত্রা এবং দৈনন্দিন ইসলামি অনুশীলন উন্নত করতে উদ্ভাবনী এআই সমাধান দিয়ে বিশ্বব্যাপী মুসলিমদের ক্ষমতায়ন করা।"
    },
    vision: {
      title: "আমাদের দৃষ্টিভঙ্গি",
      content: "ইসলামি জ্ঞান এবং অত্যাধুনিক এআই প্রযুক্তি সংযুক্ত করে শীর্ষস্থানীয় প্ল্যাটফর্ম হয়ে ওঠা, প্রত্যেকের জন্য প্রকৃত ইসলামি নির্দেশনা সহজলভ্য করে তোলা।"
    },
    featuresTitle: "আমরা কেন আলাদা",
    exploreServices: "আমাদের সেবাগুলি অন্বেষণ করুন",
    features: [
      {
        title: "ইসলামি প্রামাণ্যতা",
        content: "আমাদের সকল সেবা শরিয়াহ নীতিমালার সাথে সামঞ্জস্য নিশ্চিত করতে যোগ্য ইসলামি পন্ডিতদের নির্দেশনায় তৈরি করা হয়েছে।"
      },
      {
        title: "উন্নত প্রযুক্তি",
        content: "আমরা বুদ্ধিমান, ব্যক্তিগতকৃত ইসলামি সমাধান প্রদান করতে অত্যাধুনিক এআই প্রযুক্তি ব্যবহার করি।"
      },
      {
        title: "কমিউনিটি কেন্দ্রিক",
        content: "আধুনিক বিশ্বে ইসলাম পালনের প্রকৃত চাহিদা এবং চ্যালেঞ্জগুলি মোকাবেলায় মুসলিম কমিউনিটির জন্য এবং তাদের সাথে নির্মিত।"
      },
      {
        title: "নিরন্তর সহায়তা",
        content: "কমিউনিটির প্রতিক্রিয়া এবং পন্ডিতদের নির্দেশনার ভিত্তিতে নিয়মিত আপডেট এবং উন্নতি সহ ২৪/৭ সহায়তা।"
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

const AboutPage = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const missions = [
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: t.mission.title,
      content: t.mission.content
    },
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: t.vision.title,
      content: t.vision.content
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: t.features[0].title,
      content: t.features[0].content
    },
    {
      icon: <Code2 className="w-6 h-6 text-green-600" />,
      title: t.features[1].title,
      content: t.features[1].content
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: t.features[2].title,
      content: t.features[2].content
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: t.features[3].title,
      content: t.features[3].content
    }
  ];

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

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-green-800 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Mission and Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {missions.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {item.icon}
                <h2 className="text-2xl font-semibold text-green-900">{item.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
            {t.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  {feature.icon}
                  <h3 className="font-semibold text-green-900">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{feature.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            asChild
            className="bg-green-700 hover:bg-green-800 text-lg px-8 py-6"
          >
            <Link href="/" className="flex items-center gap-2">
              {t.exploreServices} <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;