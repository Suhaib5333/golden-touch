import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-brand-dark rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta_banner.title')}
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              {t('cta_banner.description')}
            </p>
            <a
              href="https://wa.me/97300000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            >
              <MessageCircle size={18} className="fill-white" />
              {t('cta_banner.button')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
