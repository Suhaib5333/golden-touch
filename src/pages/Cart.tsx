import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

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
              {t('cart.title')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('cart.title')}
            </h1>
            <div className="golden-divider-wide mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <motion.section
        ref={sectionRef}
        style={{ y: sectionY, opacity: sectionOpacity }}
        className="py-16 bg-brand-cream min-h-[50vh]"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag size={64} className="text-brand-gold/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-brand-dark mb-3">
                {t('cart.empty')}
              </h2>
              <p className="text-brand-dark/60 mb-8">{t('cart.empty_desc')}</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-gold-light transition-all duration-300"
              >
                {t('cart.browse')}
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-brand-gold/10 shadow-sm flex flex-col sm:flex-row items-center gap-6"
                >
                  {/* Product image */}
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-brand-cream-dark to-brand-cream overflow-hidden shrink-0">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={isAr ? item.product.nameAr : item.product.nameEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={28} className="text-brand-gold/30" />
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="flex-1 text-center sm:text-start">
                    <h3 className="font-bold text-brand-dark text-lg">
                      {isAr ? item.product.nameAr : item.product.nameEn}
                    </h3>
                    <p className="text-brand-gold font-medium">
                      {item.product.price} {t('cart.bhd')}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-9 h-9 rounded-full bg-brand-cream flex items-center justify-center hover:bg-brand-gold/20 transition-colors"
                    >
                      <Minus size={16} className="text-brand-dark" />
                    </button>
                    <span className="w-8 text-center font-bold text-brand-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-9 h-9 rounded-full bg-brand-cream flex items-center justify-center hover:bg-brand-gold/20 transition-colors"
                    >
                      <Plus size={16} className="text-brand-dark" />
                    </button>
                  </div>

                  {/* Item total */}
                  <div className="text-center min-w-[80px]">
                    <p className="font-bold text-brand-dark">
                      {(item.product.price * item.quantity).toFixed(1)} {t('cart.bhd')}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}

              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-brand-dark">
                    {t('cart.total')}
                  </span>
                  <span className="text-2xl font-bold text-brand-gold">
                    {totalPrice.toFixed(1)} {t('cart.bhd')}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/products"
                    className="flex-1 text-center border border-brand-dark/20 text-brand-dark px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-dark/5 transition-all duration-300"
                  >
                    {t('cart.continue_shopping')}
                  </Link>
                  <Link
                    to="/checkout"
                    className="flex-1 text-center bg-brand-gold text-brand-dark px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
                  >
                    {t('cart.checkout')}
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
}
