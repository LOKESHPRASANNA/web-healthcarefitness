import React from 'react';
import { motion } from 'framer-motion';

export default function Community() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-12 min-h-[600px] flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl border border-slate-200"
    >
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Community Module</h1>
      <p className="text-slate-500">This module is currently under development in the next phase.</p>
    </motion.div>
  );
}
