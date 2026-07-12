import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Droplets, Moon, Scale, Target, Zap, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const healthData = [
  { month: 'Jan', weight: 85, bmi: 26.5, bodyFat: 22 },
  { month: 'Feb', weight: 83, bmi: 25.8, bodyFat: 20 },
  { month: 'Mar', weight: 81, bmi: 25.2, bodyFat: 19 },
  { month: 'Apr', weight: 80, bmi: 24.9, bodyFat: 18.5 },
  { month: 'May', weight: 78, bmi: 24.3, bodyFat: 17 },
  { month: 'Jun', weight: 77, bmi: 24.0, bodyFat: 16.2 },
];

export default function AIHealthTwin() {
  const [activeMetric, setActiveMetric] = useState('weight');

  const metrics = [
    { id: 'weight', label: 'Body Weight', value: '77 kg', icon: Scale, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'bodyFat', label: 'Body Fat %', value: '16.2%', icon: Target, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 'bmi', label: 'Current BMI', value: '24.0', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10' },
    { id: 'heart', label: 'Resting HR', value: '62 bpm', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 'sleep', label: 'Avg Sleep', value: '7h 45m', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 'water', label: 'Daily Water', value: '2.8 L', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-bold mb-4 border border-accent/20">
          <Zap size={18} /> Neural Synchronization Active
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Your AI <span className="text-accent">Health Twin</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto">A predictive digital representation of your body based on historical workout, diet, and biometric data.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: 3D Twin Visualization Mock */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 flex flex-col items-center justify-center card p-8 bg-slate-900/40 border border-white/5 relative overflow-hidden"
        >
          {/* Scanning Line Animation */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-accent/50 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10"
          />

          <h3 className="text-lg font-bold text-white self-start w-full mb-6">Biometric Map</h3>
          
          <div className="relative w-64 h-96 mx-auto bg-[url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center rounded-3xl opacity-50 border border-white/10 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
             
             {/* Data Nodes on Body */}
             <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent rounded-full animate-ping"></div>
             <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
             <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="w-full mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
            <p className="text-sm text-accent font-semibold flex items-center gap-2 mb-1">
              <Zap size={16} /> AI Prediction
            </p>
            <p className="text-sm text-slate-300">Based on your current trajectory, you will reach your target body fat (14%) in approximately 4.2 weeks.</p>
          </div>
        </motion.div>

        {/* Right Col: Metrics & Charts */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Key Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {metrics.map(metric => (
              <div 
                key={metric.id}
                onClick={() => setActiveMetric(metric.id)}
                className={`card p-5 cursor-pointer transition-all border ${activeMetric === metric.id ? 'border-accent bg-slate-800/80' : 'border-white/5 bg-slate-900/40 hover:bg-slate-800/50'}`}
              >
                <div className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center mb-3`}>
                  <metric.icon size={20} className={metric.color} />
                </div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{metric.label}</p>
                <h4 className="text-xl font-bold text-white">{metric.value}</h4>
              </div>
            ))}
          </motion.div>

          {/* Dynamic Area Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 bg-slate-900/60 border border-white/5"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white capitalize">{activeMetric} History (6 Months)</h3>
              <button className="text-sm font-semibold text-accent hover:text-white transition-colors">Download Report</button>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                  <YAxis stroke="#64748B" axisLine={false} tickLine={false} fontSize={12} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey={activeMetric === 'heart' || activeMetric === 'sleep' || activeMetric === 'water' ? 'weight' : activeMetric} stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorMetric)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Insights Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <AlertCircle size={24} className="text-orange-400 shrink-0" />
              <div>
                <h4 className="font-bold text-orange-400 text-sm mb-1">Hydration Deficit Detected</h4>
                <p className="text-sm text-orange-200/80">Your digital twin predicts a 15% drop in performance tomorrow based on today's water intake. Drink 1L before bed.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
