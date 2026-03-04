import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Hand, PenTool, Landmark, Award } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const features = [
  { key: 'handmade', icon: Hand },
  { key: 'personalized', icon: PenTool },
  { key: 'heritage', icon: Landmark },
  { key: 'quality', icon: Award },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pattern-overlay opacity-20" />
      <div className="absolute top-10 left-10 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <SectionTitle
          label={t('why_us.label')}
          title={t('why_us.title')}
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-gold/20 group-hover:border-brand-gold/40 transition-all duration-300">
                  <Icon size={28} className="text-brand-gold" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {t(`why_us.${feat.key}`)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t(`why_us.${feat.key}_desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
