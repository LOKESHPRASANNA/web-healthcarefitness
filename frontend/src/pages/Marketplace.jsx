import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Search, Filter, ShoppingCart, Tag, ChevronRight, Zap } from 'lucide-react';

const products = [
  { id: 1, name: 'Whey Protein Isolate - Vanilla', category: 'Supplements', price: 49.99, rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1517838277536-d74e571900a9?q=80&w=400&auto=format&fit=crop', badge: 'Best Seller' },
  { id: 2, name: '12-Week Shred Program (by Alex C.)', category: 'Digital Plans', price: 29.99, rating: 4.9, reviews: 890, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop', badge: 'Premium' },
  { id: 3, name: 'Pro Lifting Belt - Leather', category: 'Accessories', price: 35.00, rating: 4.6, reviews: 124, image: 'https://images.unsplash.com/photo-1584852934891-62d41b65b11a?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Pre-Workout Energy - Blue Raspberry', category: 'Supplements', price: 39.99, rating: 4.7, reviews: 512, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Custom Keto Meal Plan (Monthly)', category: 'Digital Plans', price: 19.99, rating: 4.5, reviews: 67, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'FitnessPlus Tech Hoodie', category: 'Merchandise', price: 55.00, rating: 4.8, reviews: 215, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Supplements', 'Digital Plans', 'Accessories', 'Merchandise'];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-bold mb-2 border border-accent/20 text-xs uppercase tracking-wider">
            <ShoppingBag size={14} /> Official Store
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">Marketplace</h1>
          <p className="text-slate-400">Shop premium supplements, gear, and exclusive digital plans from top trainers.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-slate-900/60 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-white/10 flex items-center gap-2">
            <Tag size={16} /> Wishlist
          </button>
          <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 text-sm font-bold relative">
            <ShoppingCart size={18} /> Cart
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 font-bold">2</span>
          </button>
        </div>
      </motion.div>

      {/* Hero Banner (Featured) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full h-64 md:h-80 rounded-3xl mb-10 relative overflow-hidden bg-slate-900 border border-white/5 flex items-center"
      >
        <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" alt="Featured" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="relative z-10 px-8 md:px-12 max-w-2xl">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg mb-4 inline-block uppercase tracking-wider">Limited Time Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Summer Shred Digital Bundle</h2>
          <p className="text-slate-300 mb-6">Get 3 premium workout plans and 1 custom nutrition guide from Head Trainer David Miller. 40% Off this week only.</p>
          <button className="bg-white text-slate-900 hover:bg-slate-200 transition-colors font-bold py-3 px-8 rounded-xl flex items-center gap-2">
            View Bundle <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 overflow-x-auto w-full md:w-auto scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-slate-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-accent transition-colors text-sm"
          />
        </div>
      </div>

      {/* Product Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            key={product.id}
            className="card bg-slate-900/60 border border-white/5 overflow-hidden flex flex-col group"
          >
            <div className="h-48 relative overflow-hidden bg-slate-800">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
              
              {product.badge && (
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
                  {product.badge}
                </div>
              )}
              
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs font-bold">{product.rating}</span>
                <span className="text-slate-400 text-[10px]">({product.reviews})</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2">{product.category}</span>
              <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 leading-tight">{product.name}</h3>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
                <button className="bg-slate-800 hover:bg-accent text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all p-3 rounded-xl border border-white/10 hover:border-accent">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
