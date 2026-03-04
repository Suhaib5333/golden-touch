import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/products', label: t('nav.products') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Determine color scheme: dark text on light bg, light text on dark bg
  const isDarkNav = isMobileOpen || !isScrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isMobileOpen
            ? 'bg-[#1a150f] py-3 shadow-2xl'
            : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <img
              src="/logo.png"
              alt="Golden Touch"
              className="w-11 h-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`text-lg font-bold transition-colors duration-300 ${
                isDarkNav ? 'text-white' : 'text-brand-dark'
              }`}
            >
              {i18n.language === 'ar' ? 'اللمسة الذهبية' : 'Golden Touch'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 py-1 ${
                  isActive(link.path)
                    ? 'text-brand-gold'
                    : isScrolled
                    ? 'text-brand-dark hover:text-brand-gold'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 transition-colors duration-300 ${
                isActive('/cart')
                  ? 'text-brand-gold'
                  : isScrolled
                  ? 'text-brand-dark hover:text-brand-gold'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ${
                isScrolled
                  ? 'border-brand-gold/30 text-brand-dark hover:bg-brand-gold hover:text-white'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Globe size={14} />
              <span>{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden p-2 relative z-10 transition-colors ${
              isMobileOpen
                ? 'text-brand-gold'
                : isScrolled
                ? 'text-brand-dark'
                : 'text-white'
            }`}
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1a150f] pt-28 px-8"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 pattern-overlay opacity-10" />
            <motion.div
              animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-20 right-5 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute bottom-20 left-5 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                >
                  <Link
                    to={link.path}
                    className={`text-3xl font-bold transition-colors ${
                      isActive(link.path) ? 'text-brand-gold' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Cart link in mobile */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: 0.32, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  to="/cart"
                  className={`text-3xl font-bold transition-colors flex items-center gap-3 ${
                    isActive('/cart') ? 'text-brand-gold' : 'text-white'
                  }`}
                >
                  {t('nav.cart')}
                  {totalItems > 0 && (
                    <span className="text-base bg-brand-gold text-brand-dark px-2.5 py-0.5 rounded-full font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.35 }}
                className="golden-divider-wide mt-2"
              />

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-lg text-brand-gold border border-brand-gold/30 px-6 py-2.5 rounded-full hover:bg-brand-gold/10 transition-colors"
              >
                <Globe size={18} />
                <span>{i18n.language === 'ar' ? 'English' : 'عربي'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
