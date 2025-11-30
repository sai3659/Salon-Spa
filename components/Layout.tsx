import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, MapPin, Phone, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';
import { useToast } from './Toast';
import { Chatbot } from './Chatbot';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Stylists', path: '/stylists' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Now', path: '/book', isCta: true },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSocialClick = (e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    addToast(`Connecting to ${platform}... (Demo Mode)`, 'info');
  };

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (email) {
        addToast("Welcome to the club! You've successfully subscribed.", 'success');
        setEmail('');
    } else {
        addToast("Please enter your email first.", 'info');
    }
  };

  const handleDemoLink = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    addToast(`Viewing ${linkName} (Demo Page)`, 'luxury');
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-page-light dark:bg-page-dark overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-light/20 to-teal-medium/10 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse mix-blend-multiply dark:mix-blend-screen transform -translate-x-1/3 -translate-y-1/3"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-light/20 to-purple-dark/10 rounded-full blur-3xl opacity-60 dark:opacity-20 animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen transform translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-page-dark/70 border-b border-white/50 dark:border-slate-800 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-cta-gradient flex items-center justify-center text-white font-bold font-display shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">LB</div>
            <span className="text-xl md:text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-purple-600 to-teal-600 bg-300% animate-shimmer dark:from-teal-light dark:via-purple-light dark:to-teal-light">
              Page 3 La' Beige
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  link.isCta
                    ? "px-6 py-2.5 rounded-full bg-cta-gradient text-white font-semibold text-sm shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                    : `relative text-sm font-medium transition-colors hover:text-teal ${
                        isActive ? "text-teal font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-teal after:rounded-full" : "text-text-muted dark:text-slate-300"
                      }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors active:rotate-45 duration-300"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-card-dark/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  link.isCta
                    ? "w-full text-center py-3 rounded-xl bg-cta-gradient text-white font-semibold"
                    : `text-lg font-medium py-2 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 ${
                        isActive ? "text-teal bg-slate-50 dark:bg-slate-800" : "text-slate-600 dark:text-slate-300"
                      }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Map Section - Between Content and Footer */}
      <section className="py-0 relative z-10 w-full h-[400px] border-t border-slate-200 dark:border-slate-800">
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.867258079822!2d78.406!3d17.418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzA0LjgiTiA3OMKwMjQnMjEuNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
           width="100%" 
           height="100%" 
           style={{border:0}} 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
           title="Salon Location"
           className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 filter opacity-90 hover:opacity-100"
         ></iframe>
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-card-dark/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-2 pointer-events-none">
            <MapPin className="text-teal animate-bounce" size={18} />
            <span className="text-sm font-semibold text-slate-800 dark:text-white">Visit us at Jubilee Hills</span>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6 group">
                 <div className="w-8 h-8 rounded-full bg-cta-gradient flex items-center justify-center text-white font-bold font-display group-hover:rotate-12 transition-transform">LB</div>
                 <span className="text-xl font-bold font-display text-slate-800 dark:text-white">Page 3 La' Beige</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Premium luxury salon & spa in Jubilee Hills. We craft beauty experiences that rejuvenate your body and soul.
              </p>
              <div className="flex gap-4">
                <a href="#" onClick={(e) => handleSocialClick(e, 'Instagram')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-teal hover:bg-teal hover:text-white dark:hover:text-white transition-all hover:-translate-y-1">
                  <Instagram size={18} />
                </a>
                <a href="#" onClick={(e) => handleSocialClick(e, 'Facebook')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-teal hover:bg-teal hover:text-white dark:hover:text-white transition-all hover:-translate-y-1">
                  <Facebook size={18} />
                </a>
                <a href="#" onClick={(e) => handleSocialClick(e, 'Twitter')} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-teal hover:bg-teal hover:text-white dark:hover:text-white transition-all hover:-translate-y-1">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-6 dark:text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-slate-500 dark:text-slate-400 hover:text-teal dark:hover:text-teal transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1 h-1 rounded-full bg-teal opacity-0 hover:opacity-100"></span>Our Services</Link></li>
                <li><Link to="/stylists" className="text-slate-500 dark:text-slate-400 hover:text-teal dark:hover:text-teal transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1 h-1 rounded-full bg-teal opacity-0 hover:opacity-100"></span>Meet the Team</Link></li>
                <li><Link to="/gallery" className="text-slate-500 dark:text-slate-400 hover:text-teal dark:hover:text-teal transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1 h-1 rounded-full bg-teal opacity-0 hover:opacity-100"></span>Gallery</Link></li>
                <li><Link to="/book" className="text-slate-500 dark:text-slate-400 hover:text-teal dark:hover:text-teal transition-colors flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-1 h-1 rounded-full bg-teal opacity-0 hover:opacity-100"></span>Book Appointment</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-6 dark:text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-500 dark:text-slate-400 text-sm group">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-teal/10 transition-colors">
                    <MapPin className="shrink-0 text-teal" size={16} />
                  </div>
                  <span>{COMPANY_DETAILS.address}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm group">
                   <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-teal/10 transition-colors">
                    <Phone className="shrink-0 text-teal" size={16} />
                  </div>
                  <span>{COMPANY_DETAILS.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm group">
                   <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-teal/10 transition-colors">
                    <Mail className="shrink-0 text-teal" size={16} />
                  </div>
                  <span>{COMPANY_DETAILS.email}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-6 dark:text-white">Newsletter</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Subscribe to receive seasonal offers and beauty tips.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal text-sm transition-all focus:ring-2 focus:ring-teal/20 text-slate-800 dark:text-white"
                />
                <button 
                  onClick={handleSubscribe}
                  className="w-full py-3 rounded-xl bg-cta-gradient text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Page 3 La' Beige. All rights reserved.</p>
             <div className="flex gap-6 text-slate-400 text-sm">
               <a href="#" onClick={(e) => handleDemoLink(e, 'Privacy Policy')} className="hover:text-teal transition-colors">Privacy Policy</a>
               <a href="#" onClick={(e) => handleDemoLink(e, 'Terms of Service')} className="hover:text-teal transition-colors">Terms of Service</a>
             </div>
          </div>
        </div>
      </footer>
      
      {/* Global Chatbot */}
      <Chatbot />
    </div>
  );
};