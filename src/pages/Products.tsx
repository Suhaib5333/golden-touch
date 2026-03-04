import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Package, Minus, Plus } from 'lucide-react';
import { useCart, type Product } from '../context/CartContext';

type Category = 'all' | 'boys' | 'bags' | 'accessories';

const filters: { key: Category; labelKey: string }[] = [
  { key: 'all', labelKey: 'products_page.filter_all' },
  { key: 'boys', labelKey: 'products_page.filter_boys' },
  { key: 'bags', labelKey: 'products_page.filter_bags' },
  { key: 'accessories', labelKey: 'products_page.filter_accessories' },
];

const products: Product[] = [
  { id: 1, category: 'boys', nameAr: 'دقلة مطرزة - نجمة', nameEn: 'Embroidered Dishdasha - Star Patch', price: 20, priceAr: '٢٠ د.ب', priceEn: '20 BHD', image: '/products/dishdasha-1.png' },
  { id: 2, category: 'boys', nameAr: 'دقلة مطرزة - خط عربي', nameEn: 'Embroidered Dishdasha - Calligraphy', price: 20, priceAr: '٢٠ د.ب', priceEn: '20 BHD', image: '/products/dishdasha-2.png' },
  { id: 3, category: 'boys', nameAr: 'سديري مطرز - بني', nameEn: 'Embroidered Sederi Vest - Brown', price: 14, priceAr: '١٤ د.ب', priceEn: '14 BHD', image: '/products/sederi-brown.png' },
  { id: 4, category: 'boys', nameAr: 'سديري مطرز - أسود', nameEn: 'Embroidered Sederi Vest - Black', price: 14, priceAr: '١٤ د.ب', priceEn: '14 BHD', image: '/products/sederi-black.png' },
  { id: 5, category: 'bags', nameAr: 'شنطة مطرزة ثلاثية الأبعاد', nameEn: '3D Embroidered Festival Bag', price: 16, priceAr: '١٦ د.ب', priceEn: '16 BHD', image: '/products/bag-camel-1.png' },
  { id: 6, category: 'bags', nameAr: 'شنطة مطرزة بالاسم', nameEn: 'Personalized Embroidered Bag', price: 16, priceAr: '١٦ د.ب', priceEn: '16 BHD', image: '/products/bag-camel-2.png' },
  { id: 7, category: 'bags', nameAr: 'بوك جلد مطرز بالاسم', nameEn: 'Embroidered Leather Pouch', price: 6.5, priceAr: '٦.٥ د.ب', priceEn: '6.5 BHD', image: '/products/pouch-black.png' },
  { id: 8, category: 'accessories', nameAr: 'تعليقة جلد بالمغناطيس', nameEn: 'Magnetic Leather Tag', price: 4, priceAr: '٤ د.ب', priceEn: '4 BHD', image: '/products/tag-leather.png' },
];

export default function Products() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const isAr = i18n.language === 'ar';
  const { items, addToCart, updateQuantity } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter);

  const getQuantity = (productId: number) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
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
      <motion.section
        ref={sectionRef}
        style={{ y: sectionY, opacity: sectionOpacity, scale: sectionScale }}
        className="py-16 bg-brand-cream min-h-[60vh]"
      >
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
              {filteredProducts.map((product, i) => {
                const qty = getQuantity(product.id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.07, type: 'spring', stiffness: 150 }}
                    className="bg-white rounded-2xl overflow-hidden border border-brand-gold/10 card-hover group"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-brand-cream-dark to-brand-cream relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={isAr ? product.nameAr : product.nameEn}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 shimmer" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Package size={40} className="text-brand-gold/30" />
                          </div>
                        </>
                      )}
                      {/* Hover overlay with +/- controls */}
                      <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-all duration-500 flex items-end justify-center pb-6">
                        <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                          <button
                            onClick={() => updateQuantity(product.id, qty - 1)}
                            className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-7 text-center text-sm font-bold text-brand-dark">
                            {qty}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center hover:bg-brand-gold-light transition-colors"
                          >
                            <Plus size={14} className="text-brand-dark" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-bold text-brand-dark mb-1">
                        {isAr ? product.nameAr : product.nameEn}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-brand-gold font-medium text-sm">
                          {isAr ? product.priceAr : product.priceEn}
                        </p>

                        {/* Plus / Minus Controls */}
                        <div className="flex items-center gap-1.5">
                          {qty > 0 && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              className="flex items-center gap-1.5 overflow-hidden"
                            >
                              <button
                                onClick={() => updateQuantity(product.id, qty - 1)}
                                className="w-7 h-7 rounded-full bg-brand-cream flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-5 text-center text-sm font-bold text-brand-dark">
                                {qty}
                              </span>
                            </motion.div>
                          )}
                          <button
                            onClick={() => addToCart(product)}
                            className="w-7 h-7 rounded-full bg-brand-gold/10 flex items-center justify-center hover:bg-brand-gold/20 transition-colors"
                          >
                            <Plus size={13} className="text-brand-gold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
    </>
  );
}
