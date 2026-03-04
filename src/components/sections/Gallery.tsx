import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
  { id: 1, labelKey: 'gallery.item_1', image: '/products/dishdasha-1.png', category: 'boys' },
  { id: 2, labelKey: 'gallery.item_2', image: '/products/dishdasha-2.png', category: 'boys' },
  { id: 3, labelKey: 'gallery.item_3', image: '/products/bag-camel-1.png', category: 'bags' },
  { id: 4, labelKey: 'gallery.item_4', image: '/products/sederi-brown.png', category: 'boys' },
  { id: 5, labelKey: 'gallery.item_5', image: '/products/pouch-black.png', category: 'bags' },
  { id: 6, labelKey: 'gallery.item_6', image: '/products/tag-leather.png', category: 'accessories' },
];

function useGalleryItemScroll(sectionRef: React.RefObject<HTMLElement | null>, index: number) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const delay = index * 0.03;
  const y = useTransform(scrollYProgress, [0.05 + delay, 0.3 + delay, 0.7, 0.95], [50, 0, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0.05 + delay, 0.25 + delay, 0.75, 0.95], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.05 + delay, 0.3 + delay, 0.7, 0.95], [0.8, 1, 1, 0.8]);

  return { y, opacity, scale };
}

function GalleryItem({
  item,
  index,
  sectionRef,
  t,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  t: (key: string) => string;
}) {
  const { y, opacity, scale } = useGalleryItemScroll(sectionRef, index);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/products"
        className="block relative group overflow-hidden rounded-2xl bg-gradient-to-br from-brand-cream-dark to-white border border-brand-gold/10 aspect-square cursor-pointer"
      >
        <img
          src={item.image}
          alt={t(item.labelKey)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-all duration-500 flex items-center justify-center">
          <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-sm">
            {t(item.labelKey)}
          </span>
        </div>

        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-brand-gold/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-brand-gold/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100" />
      </Link>
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dividerWidth = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 1], ['0%', '100%', '100%', '0%']);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3 block"
          >
            {t('gallery.label')}
          </motion.span>
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-3xl md:text-4xl font-bold text-brand-dark"
          >
            {t('gallery.title')}
          </motion.h2>
          <div className="flex justify-center mt-4">
            <motion.div
              style={{ width: dividerWidth }}
              className="h-0.5 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {galleryItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} sectionRef={sectionRef} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
