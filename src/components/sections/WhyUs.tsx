import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Hand, PenTool, Landmark, Award } from 'lucide-react';

const features = [
  { key: 'handmade', icon: Hand },
  { key: 'personalized', icon: PenTool },
  { key: 'heritage', icon: Landmark },
  { key: 'quality', icon: Award },
];

function useFeatureScroll(sectionRef: React.RefObject<HTMLElement | null>, index: number) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const delay = index * 0.04;
  const y = useTransform(scrollYProgress, [0.05 + delay, 0.3 + delay, 0.7, 0.95], [60, 0, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0.05 + delay, 0.25 + delay, 0.75, 0.95], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.05 + delay, 0.3 + delay, 0.75, 0.95], [0.8, 1, 1, 0.8]);

  return { y, opacity, scale };
}

function FeatureCard({
  feat,
  index,
  sectionRef,
  t,
}: {
  feat: (typeof features)[0];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  t: (key: string) => string;
}) {
  const { y, opacity, scale } = useFeatureScroll(sectionRef, index);
  const Icon = feat.icon;

  return (
    <motion.div
      style={{ y, opacity, scale }}
      whileHover={{ y: -8 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-gold/20 group-hover:border-brand-gold/40 transition-colors duration-300"
      >
        <Icon size={28} className="text-brand-gold" />
      </motion.div>
      <h3 className="text-white font-bold text-lg mb-2">
        {t(`why_us.${feat.key}`)}
      </h3>
      <p className="text-white/70 text-sm leading-relaxed">
        {t(`why_us.${feat.key}_desc`)}
      </p>
    </motion.div>
  );
}

export default function WhyUs() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const orb1X = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5]);

  const titleY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 1], ['0%', '100%', '100%', '0%']);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-dark relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pattern-overlay opacity-20" />
      <motion.div
        style={{ x: orb1X, scale: orb1Scale }}
        className="absolute top-10 left-10 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ x: orb2X }}
        className="absolute bottom-10 right-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-12">
          <motion.span
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3 block"
          >
            {t('why_us.label')}
          </motion.span>
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {t('why_us.title')}
          </motion.h2>
          <div className="flex justify-center mt-4">
            <motion.div
              style={{ width: dividerWidth }}
              className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <FeatureCard key={feat.key} feat={feat} index={i} sectionRef={sectionRef} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
