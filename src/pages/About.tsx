import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Lightbulb, Award, Sparkles } from 'lucide-react';

const values = [
  { key: 'authenticity', icon: Sparkles, color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { key: 'creativity', icon: Lightbulb, color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { key: 'quality', icon: Award, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'love', icon: Heart, color: 'bg-pink-50 border-pink-200 text-pink-700' },
];

function useValueCardScroll(sectionRef: React.RefObject<HTMLElement | null>, index: number) {
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

function ValueCard({
  val,
  index,
  sectionRef,
  t,
}: {
  val: (typeof values)[0];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  t: (key: string) => string;
}) {
  const { y, opacity, scale } = useValueCardScroll(sectionRef, index);
  const Icon = val.icon;

  return (
    <motion.div
      style={{ y, opacity, scale }}
      whileHover={{ y: -8 }}
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
}

function StorySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]);

  const labelY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -40]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.03, 0.28, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0.03, 0.23, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.06, 0.32, 0.75, 1], [40, 0, 0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0.06, 0.28, 0.8, 1], [0, 1, 1, 0]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 1], ['0%', '100%', '100%', '0%']);

  const blobX = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.3, 0.5]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity, scale: sectionScale }}
      className="py-24 bg-brand-cream relative overflow-hidden"
    >
      <motion.div
        style={{ x: blobX, scale: blobScale }}
        className="absolute top-0 left-0 w-48 h-48 bg-brand-gold/5 rounded-full"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [-60, 60]) }}
        className="absolute bottom-10 right-10 w-36 h-36 bg-brand-gold/5 rounded-full"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              style={{ y: labelY, opacity: labelOpacity }}
              className="text-brand-gold text-sm tracking-widest uppercase mb-3 block"
            >
              {t('about_page.story_label')}
            </motion.span>
            <motion.h2
              style={{ y: titleY, opacity: titleOpacity }}
              className="text-3xl md:text-4xl font-bold text-brand-dark"
            >
              {t('about_page.story_title')}
            </motion.h2>
            <div className="flex justify-center mt-4">
              <motion.div
                style={{ width: dividerWidth }}
                className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
              />
            </div>
          </div>

          <motion.div style={{ y: textY, opacity: textOpacity }} className="space-y-6">
            <p className="text-brand-dark/70 leading-relaxed text-lg text-center">
              {t('about_page.story_p1')}
            </p>
            <p className="text-brand-dark/70 leading-relaxed text-lg text-center">
              {t('about_page.story_p2')}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function MissionSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]);

  const labelY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -40]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.03, 0.28, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0.03, 0.23, 0.8, 1], [0, 1, 1, 0]);
  const descY = useTransform(scrollYProgress, [0.06, 0.32, 0.75, 1], [40, 0, 0, -40]);
  const descOpacity = useTransform(scrollYProgress, [0.06, 0.28, 0.8, 1], [0, 1, 1, 0]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 1], ['0%', '100%', '100%', '0%']);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity, scale: sectionScale }}
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            style={{ y: labelY, opacity: labelOpacity }}
            className="text-brand-gold text-sm tracking-widest uppercase mb-3 block"
          >
            {t('about_page.mission_label')}
          </motion.span>
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-3xl md:text-4xl font-bold text-brand-dark mb-6"
          >
            {t('about_page.mission_title')}
          </motion.h2>
          <div className="flex justify-center mb-8">
            <motion.div
              style={{ width: dividerWidth }}
              className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </div>
          <motion.p
            style={{ y: descY, opacity: descOpacity }}
            className="text-brand-dark/70 leading-relaxed text-lg"
          >
            {t('about_page.mission_desc')}
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}

function ValuesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92]);

  const titleY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 1], ['0%', '100%', '100%', '0%']);

  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity, scale: sectionScale }}
      className="py-24 bg-brand-dark relative overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 pattern-overlay opacity-20" />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-10 right-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-12">
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {t('about_page.values.title')}
          </motion.h2>
          <div className="flex justify-center mt-4">
            <motion.div
              style={{ width: dividerWidth }}
              className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((val, i) => (
            <ValueCard key={val.key} val={val} index={i} sectionRef={sectionRef} t={t} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

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
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
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

      <StorySection />
      <MissionSection />
      <ValuesSection />
    </>
  );
}
