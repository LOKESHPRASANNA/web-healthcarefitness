import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-primary-dark">
      {/* High-quality background image with gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-32 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Train <br/> <span className="text-accent">Intelligently.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300 mb-10 font-light leading-relaxed max-w-lg"
          >
            Experience the world's most advanced fitness platform. Personalized analytics, expert guidance, and seamless integration.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="/signup" className="px-8 py-4 bg-accent text-white font-semibold rounded-full text-center hover:bg-accent-dark transition-colors duration-300 shadow-premium">
              Start Free Trial
            </a>
            <a href="/login" className="px-8 py-4 glass-panel text-white font-semibold rounded-full text-center hover:bg-white/10 transition-colors duration-300">
              Member Login
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
