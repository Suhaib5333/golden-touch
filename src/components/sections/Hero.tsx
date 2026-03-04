import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function Hero() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // As user scrolls past hero, content fades + moves up + scales down
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax zoom */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 bg-brand-dark">
        <div className="absolute inset-0 pattern-overlay opacity-30" />
        {/* Animated floating orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl"
        />
        <svg className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]" viewBox="0 0 400 800">
          <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
          </pattern>
          <rect width="400" height="800" fill="url(#geo)" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
      >
        <div className="max-w-3xl mx-auto">
          {/* Sparkle icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center"
            >
              <Sparkles className="text-brand-gold" size={32} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="text-gradient-gold">{t('hero.title')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/products"
              className="group flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
            >
              {t('hero.cta')}
              {isRTL ? (
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-white/5 transition-all duration-300"
            >
              {t('hero.secondary_cta')}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
    </section>
  );
}
