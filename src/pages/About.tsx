import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, Award, Sparkles } from 'lucide-react';

const values = [
  { key: 'authenticity', icon: Sparkles, color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { key: 'creativity', icon: Lightbulb, color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { key: 'quality', icon: Award, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'love', icon: Heart, color: 'bg-pink-50 border-pink-200 text-pink-700' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-gold text-sm tracking-widest uppercase mb-3 block">
              {t('about_page.hero_title')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('about_page.hero_subtitle')}
            </h1>
            <div className="golden-divider-wide mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-brand-gold/5 rounded-full -translate-x-1/2" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-brand-gold text-sm tracking-widest uppercase mb-3 block">
                {t('about_page.story_label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                {t('about_page.story_title')}
              </h2>
              <div className="golden-divider-wide mx-auto mt-4" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-brand-dark/70 leading-relaxed text-lg text-center">
                {t('about_page.story_p1')}
              </p>
              <p className="text-brand-dark/70 leading-relaxed text-lg text-center">
                {t('about_page.story_p2')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-brand-gold text-sm tracking-widest uppercase mb-3 block">
              {t('about_page.mission_label')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
              {t('about_page.mission_title')}
            </h2>
            <div className="golden-divider-wide mx-auto mb-8" />
            <p className="text-brand-dark/70 leading-relaxed text-lg">
              {t('about_page.mission_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('about_page.values.title')}
            </h2>
            <div className="golden-divider-wide mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center group hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${val.color} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {t(`about_page.values.${val.key}`)}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t(`about_page.values.${val.key}_desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
