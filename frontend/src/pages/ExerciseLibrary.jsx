import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Play, Box, ChevronRight, Activity } from 'lucide-react';

const library = [
  { id: 1, name: 'Barbell Back Squat', category: 'Legs', difficulty: 'Hard', equipment: 'Barbell', muscles: 'Quads, Glutes', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Conventional Deadlift', category: 'Back', difficulty: 'Expert', equipment: 'Barbell', muscles: 'Hamstrings, Lower Back', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b-d25dfeac3438?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Dumbbell Bench Press', category: 'Chest', difficulty: 'Medium', equipment: 'Dumbbell', muscles: 'Pecs, Triceps', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Pull-Ups', category: 'Back', difficulty: 'Hard', equipment: 'Bodyweight', muscles: 'Lats, Biceps', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Bulgarian Split Squat', category: 'Legs', difficulty: 'Medium', equipment: 'Dumbbell', muscles: 'Quads, Glutes', image: 'https://images.unsplash.com/photo-1517838277536-d74e571900a9?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Kettlebell Swings', category: 'Full Body', difficulty: 'Medium', equipment: 'Kettlebell', muscles: 'Hamstrings, Core', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop' }
];

export default function ExerciseLibrary() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Full Body'];
  
  const filteredExercises = activeCategory === 'All' 
    ? library 
    : library.filter(e => e.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold mb-2 border border-cyan-500/20 text-xs uppercase tracking-wider">
            <Activity size={14} /> Interactive Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-800 tracking-tight mb-2">Exercise Library</h1>
          <p className="text-surface-500">Browse movements, view 3D muscle targeting, and watch AR-ready tutorials.</p>
        </div>
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-surface-200/50 overflow-x-auto w-full md:w-auto scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-cyan-500 text-surface-800 shadow-lg shadow-blue-900/5 shadow-cyan-500/25' : 'text-surface-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
          <input 
            type="text" 
            placeholder="Search exercises..." 
            className="w-full bg-slate-900/60 border border-surface-200 rounded-xl pl-12 pr-4 py-3 text-surface-800 outline-none focus:border-cyan-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise, index) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            key={exercise.id}
            className="card bg-slate-900/60 border border-surface-200/50 overflow-hidden flex flex-col group"
          >
            <div className="h-48 relative overflow-hidden bg-[#EEF4FF]">
              <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm cursor-pointer">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                  <Play className="text-surface-800 ml-1" size={24} />
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{exercise.category}</span>
                <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                  exercise.difficulty === 'Hard' || exercise.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                }`}>{exercise.difficulty}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-surface-900 mb-4 line-clamp-1">{exercise.name}</h3>
              
              <div className="space-y-2 mb-6 text-sm text-surface-600">
                <div className="flex justify-between">
                  <span className="text-surface-500">Equipment:</span>
                  <span className="font-semibold text-surface-800">{exercise.equipment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Target:</span>
                  <span className="font-semibold text-surface-800">{exercise.muscles}</span>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-surface-200/50 pt-4">
                <button className="flex items-center justify-center gap-2 text-sm font-bold text-surface-800 bg-[#EEF4FF] hover:bg-slate-700 py-2 rounded-xl transition-colors border border-surface-200/50">
                  <Play size={16} /> Tutorial
                </button>
                <button className="flex items-center justify-center gap-2 text-sm font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Box size={16} /> 3D View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
