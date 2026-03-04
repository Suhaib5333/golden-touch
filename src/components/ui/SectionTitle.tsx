import { motion } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
  light?: boolean;
}

export default function SectionTitle({ label, title, light = false }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="text-brand-gold font-medium text-sm tracking-widest uppercase mb-3 block">
        {label}
      </span>
      <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-brand-dark'}`}>
        {title}
      </h2>
      <div className="golden-divider-wide mx-auto mt-4" />
    </motion.div>
  );
}
