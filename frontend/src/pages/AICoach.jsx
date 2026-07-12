import React from 'react';
import { motion } from 'framer-motion';

export default function AICoach() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-12 min-h-[600px] flex flex-col items-center justify-center bg-surface-100/70 backdrop-blur-xl border border-surface-200"
    >
      <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 mb-4">AICoach Module</h1>
      <p className="text-surface-500">This module is currently under development in the next phase.</p>
    </motion.div>
  );
}
