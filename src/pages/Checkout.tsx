import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useDirection } from '../hooks/useDirection';

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const isAr = i18n.language === 'ar';
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold text-sm tracking-widest uppercase mb-3 block">
              {t('checkout.title')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('checkout.title')}
            </h1>
            <div className="golden-divider-wide mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-brand-cream min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm">
                <h2 className="text-xl font-bold text-brand-dark mb-6">
                  {t('checkout.order_summary')}
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between py-3 border-b border-brand-dark/5 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-brand-dark">
                          {isAr ? item.product.nameAr : item.product.nameEn}
                        </p>
                        <p className="text-sm text-brand-dark/50">
                          {t('cart.quantity')}: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-brand-dark">
                        {(item.product.price * item.quantity).toFixed(1)} {t('checkout.bhd')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-brand-gold/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-dark">
                      {t('checkout.total')}
                    </span>
                    <span className="text-2xl font-bold text-brand-gold">
                      {totalPrice.toFixed(1)} {t('checkout.bhd')}
                    </span>
                  </div>
                  <p className="text-sm text-brand-dark/50 mt-1">
                    {items.reduce((s, i) => s + i.quantity, 0)} {t('checkout.items')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 border border-brand-gold/10 shadow-sm">
                <h2 className="text-xl font-bold text-brand-dark mb-6">
                  {t('checkout.payment_method')}
                </h2>

                <div className="space-y-4">
                  {/* Apple Pay */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                      <path d="M15.07 12.844c-.029-2.985 2.436-4.42 2.547-4.49-1.387-2.028-3.548-2.306-4.316-2.339-1.835-.186-3.587 1.083-4.52 1.083-.946 0-2.405-1.057-3.953-1.029-2.034.03-3.91 1.184-4.957 3.005-2.117 3.672-.541 9.112 1.52 12.094 1.008 1.459 2.21 3.097 3.79 3.039 1.52-.061 2.095-.984 3.933-.984 1.825 0 2.371.984 3.992.953 1.637-.028 2.676-1.486 3.672-2.95 1.158-1.693 1.635-3.332 1.664-3.418-.036-.016-3.19-1.224-3.222-4.858zM12.067 3.952c.837-1.015 1.402-2.424 1.247-3.832-1.206.05-2.67.804-3.535 1.818-.777.9-1.458 2.338-1.275 3.717 1.346.104 2.72-.684 3.563-1.703z" />
                    </svg>
                    {t('checkout.apple_pay')}
                  </motion.button>

                  {/* BenefitPay */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/benefit-pay"
                      className="w-full flex items-center justify-center gap-3 bg-[#D71E28] text-white px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:bg-[#b8191f]"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="white" />
                        <text x="4" y="17" fontSize="12" fontWeight="bold" fill="#D71E28">BP</text>
                      </svg>
                      {t('checkout.benefit_pay')}
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Back to Cart */}
              <Link
                to="/cart"
                className="group flex items-center justify-center gap-2 text-brand-dark/60 hover:text-brand-dark font-medium transition-colors"
              >
                {isRTL ? (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                )}
                {t('checkout.back_to_cart')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
