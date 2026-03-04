import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import SectionTitle from '../ui/SectionTitle';

export default function AboutPreview() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <SectionTitle label={t('about_preview.label')} title={t('about_preview.title')} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-brand-dark/70 leading-relaxed text-lg mb-8">
            {t('about_preview.description')}
          </p>

          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-brand-gold font-bold hover:text-brand-gold-dark transition-colors"
          >
            {t('about_preview.read_more')}
            {isRTL ? (
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
