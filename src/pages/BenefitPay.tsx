import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';

export default function BenefitPay() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="container mx-auto px-4 md:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('benefit_pay.title')}
            </h1>
            <div className="golden-divider-wide mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-brand-cream min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-10 border border-brand-gold/10 shadow-sm text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#D71E28]/10 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#D71E28" />
                <text x="8" y="28" fontSize="18" fontWeight="bold" fill="white">BP</text>
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-brand-dark mb-3">
              {t('benefit_pay.coming_soon')}
            </h2>
            <p className="text-brand-dark/60 mb-8">
              {t('benefit_pay.description')}
            </p>

            <div className="space-y-4">
              <a
                href="https://wa.me/97336855778"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-all duration-300"
              >
                <WhatsAppIcon size={18} className="text-white" />
                WhatsApp
              </a>

              <Link
                to="/checkout"
                className="group flex items-center justify-center gap-2 text-brand-dark/60 hover:text-brand-dark font-medium transition-colors"
              >
                {isRTL ? (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                )}
                {t('benefit_pay.back')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
