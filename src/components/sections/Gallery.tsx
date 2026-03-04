import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const galleryItems = [
  { id: 1, aspect: 'row-span-2', label: 'حقيبة مطرزة' },
  { id: 2, aspect: '', label: 'ثوب أولاد' },
  { id: 3, aspect: '', label: 'فستان بنات' },
  { id: 4, aspect: '', label: 'إكسسوارات' },
  { id: 5, aspect: '', label: 'تطريز مخصص' },
  { id: 6, aspect: 'col-span-2', label: 'مجموعة العيد' },
];

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-brand-cream">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle label={t('gallery.label')} title={t('gallery.title')} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${item.aspect} relative group overflow-hidden rounded-2xl bg-gradient-to-br from-brand-cream-dark to-white border border-brand-gold/10 min-h-[200px] cursor-pointer`}
            >
              {/* Placeholder shimmer */}
              <div className="absolute inset-0 shimmer" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-all duration-500 flex items-center justify-center">
                <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {item.label}
                </span>
              </div>

              {/* Gold corner accent */}
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-brand-gold/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-brand-gold/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
