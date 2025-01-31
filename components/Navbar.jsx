'use client';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Construction, 
  Menu, 
  X,
  Book,
  Clock,
  Search,
  Calculator,
  Calendar,
  Users,
  MessageCircle,
  Map,
  Share2,
  Heart 
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from 'next/navigation';

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

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const showUnderDevelopment = () => {
    toast({
      title: "Under Development",
      description: "This feature is coming soon! We're working hard to bring it to you.",
      variant: "default",
      duration: 3000,
    });
  };

  const NavigationMenuComponent = () => (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-green-800 hover:text-green-600">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-4 w-[800px]">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-3 space-y-2 rounded-md hover:bg-green-50 transition-colors ${
                    service.link ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
                  }`}
                  onClick={() => {
                    if (!service.link) {
                      showUnderDevelopment();
                    }
                    // Add navigation logic here for services with links
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-md bg-gradient-to-br ${service.color}`}>
                      {React.cloneElement(service.icon, { className: "w-4 h-4 text-white" })}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium leading-none">
                        {service.title}
                        {!service.link && (
                          <Construction className="h-3 w-3 text-green-600 inline ml-2" />
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About Link */}
        <NavigationMenuItem>
          <Button
            variant="ghost"
            className="text-green-800 hover:text-green-600"
            onClick={() => router.push("/about")}
          >
            About
          </Button>
        </NavigationMenuItem>

        {/* Contact Link */}
        <NavigationMenuItem>
          <Button
            variant="ghost"
            className="text-green-800 hover:text-green-600"
            onClick={() => router.push("/contact")}
          >
            Contact
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex-1 md:flex-initial cursor-pointer" onClick={() => router.push('/')}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-semibold text-green-800">Islamic AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenuComponent />
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 flex justify-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isOpen ? (
                    <X className="h-6 w-6 text-green-800" />
                  ) : (
                    <Menu className="h-6 w-6 text-green-800" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-green-800">Services</h3>
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-2 rounded-md ${
                          service.link
                            ? 'hover:bg-green-50 cursor-pointer'
                            : 'opacity-80 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (!service.link) {
                            showUnderDevelopment();
                            setIsOpen(false);
                          }
                          // Add navigation logic here for services with links
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md bg-gradient-to-br ${service.color}`}>
                            {React.cloneElement(service.icon, { className: "w-4 h-4 text-white" })}
                          </div>
                          <div>
                            <span className="text-sm font-medium">{service.title}</span>
                            {!service.link && (
                              <Construction className="h-3 w-3 text-green-600 inline ml-2" />
                            )}
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => {
                      
                      setIsOpen(false);
                      router.push('/about');
                    }}
                  >
                    About
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => {
                      showUnderDevelopment();
                      setIsOpen(false);
                    }}
                  >
                    Contact
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Empty div for spacing in mobile view */}
          <div className="flex-1 md:hidden"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;