import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WhatsAppIcon from '../ui/WhatsAppIcon';

export default function CtaBanner() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  const titleY = useTransform(scrollYProgress, [0.05, 0.35, 0.7, 1], [30, 0, 0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.3, 0.75, 1], [0, 1, 1, 0]);

  const descY = useTransform(scrollYProgress, [0.1, 0.38, 0.7, 1], [25, 0, 0, -25]);
  const descOpacity = useTransform(scrollYProgress, [0.1, 0.33, 0.75, 1], [0, 1, 1, 0]);

  const btnY = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 1], [20, 0, 0, -20]);
  const btnOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          style={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
          className="relative bg-brand-dark rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl"
          />

          <div className="relative">
            <motion.h2
              style={{ y: titleY, opacity: titleOpacity }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {t('cta_banner.title')}
            </motion.h2>
            <motion.p
              style={{ y: descY, opacity: descOpacity }}
              className="text-white/70 mb-8 max-w-md mx-auto"
            >
              {t('cta_banner.description')}
            </motion.p>
            <motion.div style={{ y: btnY, opacity: btnOpacity }}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/97336855778"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <WhatsAppIcon size={18} className="text-white" />
                {t('cta_banner.button')}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
