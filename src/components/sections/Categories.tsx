import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shirt, ShoppingBag, Gem } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const categories = [
  {
    key: 'boys',
    icon: Shirt,
    gradient: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    key: 'girls',
    icon: Shirt,
    gradient: 'from-pink-50 to-pink-100',
    iconColor: 'text-pink-600',
    borderColor: 'border-pink-200',
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

export default function Categories() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle label={t('categories.label')} title={t('categories.title')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to="/products"
                  className={`block p-8 rounded-2xl bg-gradient-to-br ${cat.gradient} border ${cat.borderColor} card-hover group text-center`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon size={28} className={cat.iconColor} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    {t(`categories.${cat.key}`)}
                  </h3>
                  <p className="text-sm text-brand-dark/60 leading-relaxed">
                    {t(`categories.${cat.key}_desc`)}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
