import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white/80">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center">
                <span className="text-brand-gold font-display text-sm font-bold">GT</span>
              </div>
              <span className="text-white font-bold text-lg">
                {i18n.language === 'ar' ? 'اللمسة الذهبية' : 'Golden Touch'}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-gold font-bold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: t('nav.home') },
                { path: '/about', label: t('nav.about') },
                { path: '/products', label: t('nav.products') },
                { path: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-brand-gold font-bold mb-4">{t('footer.contact_us')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-brand-gold shrink-0" />
                <span>{t('contact_page.location_desc')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Clock size={16} className="text-brand-gold shrink-0" />
                <span>{t('contact_page.hours_desc')}</span>
              </li>
              <li>
                <a
                  href="https://wa.me/97300000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={16} className="text-green-400 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-brand-gold font-bold mb-4">{t('footer.follow_us')}</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold/20 hover:border-brand-gold/30 transition-all duration-300"
              >
                <Instagram size={18} className="text-white/70" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            &copy; {currentYear} {t('footer.brand')}. {t('footer.rights')}.
          </p>
          <div className="golden-divider md:hidden" />
        </div>
      </div>
    </footer>
  );
}
