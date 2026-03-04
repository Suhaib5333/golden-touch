import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/97300000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg whatsapp-pulse hover:bg-green-600 transition-colors duration-300 group"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} className="text-white fill-white group-hover:scale-110 transition-transform" />
    </motion.a>
  );
}
