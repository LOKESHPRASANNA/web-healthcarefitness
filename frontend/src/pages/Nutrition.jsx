import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nutritionData } from '../data/nutritionData';
import { Search, Flame, Droplets, Apple, ChevronRight, Activity, CalendarDays } from 'lucide-react';

const categories = ['All', 'Vegetables', 'Fruits', 'Proteins', 'Healthy Fats', 'Carbohydrates'];

export default function Nutrition() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = nutritionData.filter(food => {
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">Nutrition Center</h1>
          <p className="text-slate-500">Discover macronutrients, build meal plans, and track your intake.</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search foods..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-slate-800 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2">
            <CalendarDays size={18} /> Meal Plan
          </button>
        </div>
      </motion.div>

      {/* AI Diet Insight */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-10 bg-gradient-to-r from-accent/20 to-purple-500/20 border border-accent/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
          <Activity className="text-accent" size={32} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">AI Diet Insight</h3>
          <p className="text-slate-600">Based on your recent heavy workouts, you are slightly under your protein goal. Consider adding a serving of <span className="text-accent font-semibold">Chicken Breast</span> or <span className="text-accent font-semibold">Greek Yogurt</span> to your dinner.</p>
        </div>
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-slate-800 rounded-xl font-medium transition-colors border border-slate-200 backdrop-blur-md whitespace-nowrap">
          Generate Full Diet
        </button>
      </motion.div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-6 hide-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-accent border-accent text-slate-800 shadow-lg shadow-blue-900/5 shadow-accent/20' 
                : 'bg-slate-800/50 border-slate-200 text-slate-600 hover:bg-slate-700 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        <AnimatePresence>
          {filteredData.map((food, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={food.id}
              className="card overflow-hidden group border border-slate-100 bg-slate-900/60 hover:bg-slate-800/80 transition-all hover:border-accent/30"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-slate-800 border border-slate-200">
                  {food.serving}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{food.name}</h3>
                    <p className="text-xs text-accent font-medium">{food.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400 font-bold bg-orange-400/10 px-2 py-1 rounded-lg text-sm">
                    <Flame size={14} /> {food.calories}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-[#EEF4FF] rounded-lg p-2 text-center border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">PRO</p>
                    <p className="text-sm font-bold text-slate-800">{food.protein}g</p>
                  </div>
                  <div className="bg-[#EEF4FF] rounded-lg p-2 text-center border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">CARB</p>
                    <p className="text-sm font-bold text-slate-800">{food.carbs}g</p>
                  </div>
                  <div className="bg-[#EEF4FF] rounded-lg p-2 text-center border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">FAT</p>
                    <p className="text-sm font-bold text-slate-800">{food.fat}g</p>
                  </div>
                </div>

                <div className="flex items-center text-slate-500 text-xs mb-5 line-clamp-1">
                  <Apple size={14} className="mr-1 shrink-0 text-green-400" /> 
                  <span className="truncate">{food.vitamins.join(', ')}</span>
                </div>

                <button className="w-full py-2.5 bg-white/5 hover:bg-accent hover:text-white text-slate-600 rounded-xl text-sm font-semibold transition-all border border-slate-200 group-hover:border-transparent flex items-center justify-center gap-2">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredData.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500 text-lg">No foods found matching "{searchQuery}" in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
