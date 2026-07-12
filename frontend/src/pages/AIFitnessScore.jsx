import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const scoreData = [
  { name: 'Consistency', value: 85, fill: '#3B82F6' },
  { name: 'Nutrition', value: 72, fill: '#10B981' },
  { name: 'Workout Intensity', value: 94, fill: '#F59E0B' },
  { name: 'Recovery (Sleep)', value: 65, fill: '#8B5CF6' },
];

export default function AIFitnessScore() {
  const totalScore = 79; // Out of 100

  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold mb-4 border border-green-500/20">
          <ShieldCheck size={18} /> Score Updated 2 hours ago
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">AI Fitness <span className="text-green-400">Score</span></h1>
        <p className="text-slate-400 max-w-2xl">A unified metric calculated from your workout volume, nutrition tracking, sleep quality, and gym attendance.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Score Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 card p-8 bg-slate-900/60 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500"></div>
          
          <h3 className="text-lg font-bold text-white mb-8">Overall Fitness Score</h3>
          
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            {/* Pulsing rings */}
            <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-4 border-4 border-green-500/40 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
            
            <div className="w-full h-full rounded-full border-8 border-slate-800 flex flex-col items-center justify-center bg-slate-900 shadow-2xl relative z-10">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-green-600 tracking-tighter">
                {totalScore}
              </span>
              <span className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">/ 100</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-4 py-2 rounded-xl mb-4">
            <ChevronUp size={20} /> +4 Points this week
          </div>
          
          <p className="text-sm text-slate-300">You are in the <strong className="text-white">Top 15%</strong> of members in your age group.</p>
        </motion.div>

        {/* Radar/Radial Breakdown */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card p-6 bg-slate-900/60 border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-white">Score Breakdown</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-lg text-xs font-bold border border-white/10">Weekly</span>
              <span className="px-3 py-1 bg-accent text-white rounded-lg text-xs font-bold shadow-lg shadow-accent/20">Monthly</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-[300px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={15} data={scoreData}>
                  <RadialBar
                    minAngle={15}
                    background={{ fill: '#1E293B' }}
                    clockWise
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              {scoreData.map((item, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="font-semibold text-slate-200">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white">{item.value}</span>
                    {item.value > 80 ? <ChevronUp size={16} className="text-green-500"/> : <ChevronDown size={16} className="text-red-500"/>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Action Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 card p-8 bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="text-indigo-400" /> AI Action Plan to Reach 85+
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-black/20 rounded-xl border border-white/5">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 block">Priority 1: Recovery</span>
              <p className="text-sm text-slate-300">Your sleep score (65) is pulling down your average. Go to bed 30 minutes earlier to increase deep sleep cycles.</p>
            </div>
            <div className="p-5 bg-black/20 rounded-xl border border-white/5">
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 block">Priority 2: Nutrition</span>
              <p className="text-sm text-slate-300">You are missing protein macros on workout days. Add a protein shake post-workout to boost your nutrition score to 80+.</p>
            </div>
            <div className="p-5 bg-black/20 rounded-xl border border-white/5">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">Maintain: Intensity</span>
              <p className="text-sm text-slate-300">Your workout intensity is phenomenal (94). Maintain this level, but ensure you take at least 1 full rest day a week.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
