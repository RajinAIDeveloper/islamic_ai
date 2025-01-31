import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: 'Smart Quran Companion', href: '#' },
      { name: 'Prayer Time Optimizer', href: '#' },
      { name: 'AI Halal Food Finder', href: '#' },
      { name: 'Islamic Financial Planner', href: '/financial-planner' },
      { name: 'AI Ramadan Tracker', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Community Guidelines', href: '#' },
      { name: 'User Guide', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'YouTube', icon: Youtube, href: '#' }
    ]
  };

  const contact = {
    email: 'info@islamic-ai.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Avenue, Innovation City, IC 12345'
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-semibold text-green-800">Islamic AI</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              Empowering Muslims worldwide with AI-driven solutions for spiritual growth,
              education, and daily Islamic practices. Built with care and respect for Islamic principles.
            </p>
            {/* Contact information */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contact.email}`} className="hover:text-green-700">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <a href={`tel:${contact.phone}`} className="hover:text-green-700">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-700"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-700"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-700"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © {currentYear} Copyright WING A.I. Bangladesh
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {links.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-green-700 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the Ummah </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;