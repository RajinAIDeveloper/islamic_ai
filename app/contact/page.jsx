'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Globe,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Translations
const translations = {
  en: {
    title: "Contact Us",
    subtitle: "Get in touch with our team for any questions or support",
    formTitle: "Send us a Message",
    name: "Your Name",
    email: "Email Address",
    subject: "Subject",
    message: "Your Message",
    send: "Send Message",
    contactInfo: "Contact Information",
    address: "123 Islamic Tech Center, Digital Avenue, Dhaka, Bangladesh",
    phone: "+880 1234-567890",
    email: "support@islamicaiplatform.com",
    successMessage: "Thank you for your message. We will get back to you soon.",
    errorMessage: "Please fill in all required fields.",
    placeholders: {
      name: "Enter your name",
      email: "Enter your email",
      subject: "What is this about?",
      message: "Write your message here..."
    },
    required: "Required"
  },
  bn: {
    title: "যোগাযোগ করুন",
    subtitle: "যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের টিমের সাথে যোগাযোগ করুন",
    formTitle: "আমাদের একটি বার্তা পাঠান",
    name: "আপনার নাম",
    email: "ইমেইল ঠিকানা",
    subject: "বিষয়",
    message: "আপনার বার্তা",
    send: "বার্তা পাঠান",
    contactInfo: "যোগাযোগের তথ্য",
    address: "১২৩ ইসলামিক টেক সেন্টার, ডিজিটাল এভিনিউ, ঢাকা, বাংলাদেশ",
    phone: "+৮৮০ ১২৩৪-৫৬৭৮৯০",
    email: "support@islamicaiplatform.com",
    successMessage: "আপনার বার্তার জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    errorMessage: "অনুগ্রহ করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন।",
    placeholders: {
      name: "আপনার নাম লিখুন",
      email: "আপনার ইমেইল লিখুন",
      subject: "এটি কী সম্পর্কে?",
      message: "আপনার বার্তা এখানে লিখুন..."
    },
    required: "আবশ্যক"
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

const ContactPage = () => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: t.errorMessage
      });
      return;
    }

    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setStatus({
      type: 'success',
      message: t.successMessage
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-green-900">{t.formTitle}</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t.name} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder={t.placeholders.name}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder={t.placeholders.email}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t.subject}</label>
                  <Input
                    placeholder={t.placeholders.subject}
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t.message} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder={t.placeholders.message}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="min-h-32"
                  />
                </div>
                
                {status.message && (
                  <Alert className={status.type === 'error' ? 'bg-red-50' : 'bg-green-50'}>
                    <AlertCircle className={`h-4 w-4 ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`} />
                    <AlertDescription className={status.type === 'error' ? 'text-red-600' : 'text-green-600'}>
                      {status.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <h2 className="text-2xl font-semibold text-green-900">{t.contactInfo}</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <p className="text-gray-700">{t.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <p className="text-gray-700">{t.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <p className="text-gray-700">{t.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Embed Placeholder */}
            <Card className="overflow-hidden h-64">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                Map Placeholder
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;