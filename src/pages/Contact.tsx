import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Send } from 'lucide-react';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';

function ContactInfoSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

  const leftY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rightY = useTransform(scrollYProgress, [0.05, 0.25, 0.8, 1], [50, 0, 0, -50]);
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.85, 1], [0, 1, 1, 0]);

  const card1Y = useTransform(scrollYProgress, [0.02, 0.22, 0.8, 1], [40, 0, 0, -40]);
  const card1Opacity = useTransform(scrollYProgress, [0.02, 0.18, 0.85, 1], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.06, 0.26, 0.8, 1], [40, 0, 0, -40]);
  const card2Opacity = useTransform(scrollYProgress, [0.06, 0.22, 0.85, 1], [0, 1, 1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [40, 0, 0, -40]);
  const card3Opacity = useTransform(scrollYProgress, [0.1, 0.26, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity, scale: sectionScale }}
      className="py-20 bg-brand-cream"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <motion.div style={{ y: leftY, opacity: leftOpacity }} className="space-y-8">
            {/* WhatsApp Card */}
            <motion.div
              style={{ y: card1Y, opacity: card1Opacity }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <WhatsAppIcon size={24} className="text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">
                    {t('contact_page.whatsapp_title')}
                  </h3>
                  <p className="text-brand-dark/50 text-sm">
                    {t('contact_page.whatsapp_desc')}
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/97336855778"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <WhatsAppIcon size={18} className="text-white" />
                {t('contact_page.whatsapp_button')}
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              style={{ y: card2Y, opacity: card2Opacity }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                  <MapPin size={24} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">
                    {t('contact_page.location_title')}
                  </h3>
                  <p className="text-brand-dark/50 text-sm">
                    {t('contact_page.location_desc')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              style={{ y: card3Y, opacity: card3Opacity }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Clock size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">
                    {t('contact_page.hours_title')}
                  </h3>
                  <p className="text-brand-dark/50 text-sm">
                    {t('contact_page.hours_desc')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div style={{ y: rightY, opacity: rightOpacity }}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm h-full"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-6">
                {t('contact_page.form_title')}
              </h3>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-brand-dark/70 mb-2">
                    {t('contact_page.form_name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 bg-brand-cream/50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-brand-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark/70 mb-2">
                    {t('contact_page.form_email')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 bg-brand-cream/50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-brand-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark/70 mb-2">
                    {t('contact_page.form_message')}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 bg-brand-cream/50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all resize-none text-brand-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-brand-dark text-brand-gold px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-charcoal transition-all duration-300 hover:shadow-lg"
                >
                  <Send size={16} />
                  {t('contact_page.form_submit')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold text-sm tracking-widest uppercase mb-3 block">
              {t('contact_page.hero_title')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('contact_page.hero_subtitle')}
            </h1>
            <div className="golden-divider-wide mx-auto" />
          </motion.div>
        </div>
      </section>

      <ContactInfoSection />
    </>
  );
}
