import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Package } from 'lucide-react';

type Category = 'all' | 'boys' | 'girls' | 'bags' | 'accessories';

const filters: { key: Category; labelKey: string }[] = [
  { key: 'all', labelKey: 'products_page.filter_all' },
  { key: 'boys', labelKey: 'products_page.filter_boys' },
  { key: 'girls', labelKey: 'products_page.filter_girls' },
  { key: 'bags', labelKey: 'products_page.filter_bags' },
  { key: 'accessories', labelKey: 'products_page.filter_accessories' },
];

const placeholderProducts = [
  { id: 1, category: 'boys', nameAr: 'دشداشة مطرزة بالاسم', nameEn: 'Personalized Embroidered Dishdasha', priceAr: 'يبدأ من ١٥ د.ب', priceEn: 'From 15 BHD' },
  { id: 2, category: 'boys', nameAr: 'ثوب العيد للأولاد', nameEn: 'Eid Thobe for Boys', priceAr: 'يبدأ من ١٨ د.ب', priceEn: 'From 18 BHD' },
  { id: 3, category: 'girls', nameAr: 'جلابية تقليدية مزينة', nameEn: 'Decorated Traditional Jalabiya', priceAr: 'يبدأ من ٢٠ د.ب', priceEn: 'From 20 BHD' },
  { id: 4, category: 'girls', nameAr: 'فستان العيد للبنات', nameEn: 'Eid Dress for Girls', priceAr: 'يبدأ من ٢٢ د.ب', priceEn: 'From 22 BHD' },
  { id: 5, category: 'bags', nameAr: 'حقيبة قرقيعان مطرزة', nameEn: 'Embroidered Gergean Bag', priceAr: 'يبدأ من ٨ د.ب', priceEn: 'From 8 BHD' },
  { id: 6, category: 'bags', nameAr: 'حقيبة يد تقليدية', nameEn: 'Traditional Handbag', priceAr: 'يبدأ من ١٠ د.ب', priceEn: 'From 10 BHD' },
  { id: 7, category: 'accessories', nameAr: 'باتش مطرز بالاسم', nameEn: 'Personalized Embroidered Patch', priceAr: 'يبدأ من ٣ د.ب', priceEn: 'From 3 BHD' },
  { id: 8, category: 'accessories', nameAr: 'تعليقة مطرزة', nameEn: 'Embroidered Keychain', priceAr: 'يبدأ من ٥ د.ب', priceEn: 'From 5 BHD' },
];

export default function Products() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const isAr = i18n.language === 'ar';

  const filteredProducts = activeFilter === 'all'
    ? placeholderProducts
    : placeholderProducts.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-gold text-sm tracking-widest uppercase mb-3 block">
              {t('products_page.hero_title')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('products_page.hero_subtitle')}
            </h1>
            <div className="golden-divider-wide mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 bg-brand-cream min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'bg-brand-dark text-brand-gold shadow-lg'
                    : 'bg-white text-brand-dark/70 hover:bg-brand-dark/5 border border-brand-dark/10'
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </motion.div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden border border-brand-gold/10 card-hover group"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-brand-cream-dark to-brand-cream relative overflow-hidden">
                    <div className="absolute inset-0 shimmer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package size={40} className="text-brand-gold/30" />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-all duration-500 flex items-center justify-center">
                      <a
                        href="https://wa.me/97300000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-500 text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-green-600"
                      >
                        <MessageCircle size={14} className="fill-white" />
                        {t('products_page.inquire')}
                      </a>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-brand-dark mb-1">
                      {isAr ? product.nameAr : product.nameEn}
                    </h3>
                    <p className="text-brand-gold font-medium text-sm">
                      {isAr ? product.priceAr : product.priceEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
