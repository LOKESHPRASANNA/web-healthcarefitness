import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workoutData } from '../data/workoutData';
import { Search, Flame, Timer, PlayCircle, Filter, Activity, ArrowRight } from 'lucide-react';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs', 'Cardio', 'Yoga'];

export default function Workouts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkouts = workoutData.filter(workout => {
    const matchesCategory = activeCategory === 'All' || workout.category === activeCategory;
    const matchesDifficulty = activeDifficulty === 'All' || workout.difficulty === activeDifficulty;
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8"
      >
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Workout Center</h1>
          <p className="text-surface-500">100+ precision-engineered exercises for maximum results.</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
            <input 
              type="text" 
              placeholder="Search exercises..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-100/50 border border-surface-200 rounded-xl py-2.5 pl-10 pr-4 text-surface-800 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 whitespace-nowrap">
            <Activity size={18} /> AI Generator
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-3">Muscle Group</p>
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? 'bg-accent border-accent text-white' 
                    : 'bg-slate-800/30 border-surface-200/50 text-surface-500 hover:bg-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="md:w-64 shrink-0">
          <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-3">Difficulty</p>
          <div className="flex bg-surface-100/50 p-1 rounded-xl border border-surface-200/50">
            {difficulties.slice(1).map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(activeDifficulty === diff ? 'All' : diff)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeDifficulty === diff
                    ? 'bg-surface-100/10 text-surface-800 shadow-sm'
                    : 'text-surface-500 hover:text-slate-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        <AnimatePresence>
          {filteredWorkouts.map((workout) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={workout.id}
              className="card overflow-hidden group border border-surface-200/50 bg-slate-900/60 hover:bg-slate-800/80 transition-all hover:border-accent/30 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative shrink-0">
                <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 rounded md backdrop-blur-md text-xs font-bold text-surface-800 border border-surface-200 ${
                    workout.difficulty === 'Beginner' ? 'bg-green-500/40' :
                    workout.difficulty === 'Intermediate' ? 'bg-orange-500/40' : 'bg-red-500/40'
                  }`}>
                    {workout.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded md bg-black/40 backdrop-blur-md text-xs font-bold text-surface-800 border border-surface-200">
                    {workout.category}
                  </span>
                </div>
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent/90 text-surface-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl shadow-accent/40">
                  <PlayCircle size={24} />
                </button>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-surface-900 mb-2 line-clamp-1">{workout.name}</h3>
                
                <div className="flex items-center gap-4 text-xs font-medium text-surface-500 mb-4">
                  <span className="flex items-center gap-1"><Flame size={14} className="text-orange-400"/> {workout.calories} kcal</span>
                  <span className="flex items-center gap-1"><Timer size={14} className="text-cyan-400"/> {workout.duration}</span>
                </div>

                <div className="bg-surface-100/50 rounded-xl p-3 border border-surface-200/50 mb-4 mt-auto">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-surface-500">Sets</span>
                    <span className="text-surface-800 font-bold">{workout.sets}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-surface-500">Reps</span>
                    <span className="text-surface-800 font-bold">{workout.reps}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-surface-500">Rest</span>
                    <span className="text-surface-800 font-bold">{workout.rest}</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-surface-100/5 hover:bg-surface-100/10 text-surface-800 rounded-lg text-sm font-semibold transition-all border border-surface-200 flex items-center justify-center gap-2">
                  Start Exercise <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredWorkouts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-surface-500 text-lg">No exercises found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
