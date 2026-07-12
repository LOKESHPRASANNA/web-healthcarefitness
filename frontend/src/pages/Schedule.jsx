import React from 'react';
import { motion } from 'framer-motion';

export default function Schedule() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-12 min-h-[600px] flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-xl border border-white/10"
    >
      <h1 className="text-4xl font-bold text-white mb-4">Schedule Module</h1>
      <p className="text-slate-400">This module is currently under development in the next phase.</p>
    </motion.div>
  );
}
