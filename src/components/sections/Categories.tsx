import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shirt, ShoppingBag, Gem } from 'lucide-react';

const categories = [
  {
    key: 'boys',
    icon: Shirt,
    gradient: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    key: 'bags',
    icon: ShoppingBag,
    gradient: 'from-amber-50 to-amber-100',
    iconColor: 'text-amber-700',
    borderColor: 'border-amber-200',
  },
  {
    key: 'accessories',
    icon: Gem,
    gradient: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
];

function useCardScroll(sectionRef: React.RefObject<HTMLElement | null>, index: number) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const delay = index * 0.04;
  const y = useTransform(scrollYProgress, [0 + delay, 0.25 + delay, 0.7, 1], [80, 0, 0, -80]);
  const opacity = useTransform(scrollYProgress, [0 + delay, 0.2 + delay, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0 + delay, 0.25 + delay, 0.75, 1], [0.85, 1, 1, 0.85]);
  const rotateY = useTransform(scrollYProgress, [0 + delay, 0.25 + delay, 0.75, 1], [15, 0, 0, -15]);

  return { y, opacity, scale, rotateY };
}

function CategoryCard({
  cat,
  index,
  sectionRef,
  t,
}: {
  cat: (typeof categories)[0];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  t: (key: string) => string;
}) {
  const { y, opacity, scale, rotateY } = useCardScroll(sectionRef, index);
  const Icon = cat.icon;

  return (
    <motion.div style={{ y, opacity, scale, rotateY }}>
      <Link
        to="/products"
        className={`block p-8 rounded-2xl bg-gradient-to-br ${cat.gradient} border ${cat.borderColor} card-hover group text-center h-full`}
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mx-auto mb-5 shadow-sm"
        >
          <Icon size={28} className={cat.iconColor} />
        </motion.div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">
          {t(`categories.${cat.key}`)}
        </h3>
        <p className="text-sm text-brand-dark/70 leading-relaxed">
          {t(`categories.${cat.key}_desc`)}
        </p>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 1], ['0%', '100%', '100%', '0%']);

  const ring1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.2, 0.3]);
  const ring1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0]);
  const ring2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden" style={{ perspective: 1000 }}>
      <motion.div
        style={{ scale: ring1Scale, opacity: ring1Opacity }}
        className="absolute top-10 left-10 w-32 h-32 border border-brand-gold rounded-full"
      />
      <motion.div
        style={{ scale: ring2Scale, opacity: ring1Opacity }}
        className="absolute bottom-10 right-10 w-24 h-24 border border-brand-gold rounded-full"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3 block"
          >
            {t('categories.label')}
          </motion.span>
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-3xl md:text-4xl font-bold text-brand-dark"
          >
            {t('categories.title')}
          </motion.h2>
          <div className="flex justify-center mt-4">
            <motion.div
              style={{ width: dividerWidth }}
              className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.key} cat={cat} index={i} sectionRef={sectionRef} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
