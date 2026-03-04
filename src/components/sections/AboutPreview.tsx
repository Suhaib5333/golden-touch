import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function AboutPreview() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Content animations - appear as section enters viewport, reverse as it leaves
  const labelY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -40]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const titleY = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0.9, 1, 1, 0.9]);

  const textY = useTransform(scrollYProgress, [0.05, 0.35, 0.75, 1], [60, 0, 0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const linkY = useTransform(scrollYProgress, [0.1, 0.4, 0.75, 1], [30, 0, 0, -30]);
  const linkOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.8, 1], [0, 1, 1, 0]);

  const dividerWidth = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 1], ['0%', '100%', '100%', '0%']);

  // Decorative blob parallax
  const blob1X = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.3, 0.6]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Parallax decorative blobs */}
      <motion.div
        style={{ x: blob1X, scale: blob1Scale }}
        className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/5 rounded-full"
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-12">
          <motion.span
            style={{ y: labelY, opacity: labelOpacity }}
            className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3 block"
          >
            {t('about_preview.label')}
          </motion.span>
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
            className="text-3xl md:text-4xl font-bold text-brand-dark"
          >
            {t('about_preview.title')}
          </motion.h2>
          <div className="flex justify-center mt-4">
            <motion.div
              style={{ width: dividerWidth }}
              className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            style={{ y: textY, opacity: textOpacity }}
            className="text-brand-dark/80 leading-relaxed text-lg mb-8"
          >
            {t('about_preview.description')}
          </motion.p>

          <motion.div style={{ y: linkY, opacity: linkOpacity }}>
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
      </div>
    </section>
  );
}
