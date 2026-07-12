import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Droplets, Target, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', calories: 400 },
  { name: 'Tue', calories: 300 },
  { name: 'Wed', calories: 550 },
  { name: 'Thu', calories: 450 },
  { name: 'Fri', calories: 600 },
  { name: 'Sat', calories: 800 },
  { name: 'Sun', calories: 750 },
];

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    className="card p-6 flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-primary dark:text-white tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-primary dark:text-white tracking-tight">Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-2">Welcome back. Here's your performance analysis.</p>
        </div>
        <button className="px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all font-medium border border-slate-200 dark:border-slate-700 text-sm shadow-sm flex items-center gap-2">
          This Week <ChevronDown size={16} />
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Calories" value="3,850 kcal" icon={Flame} colorClass="bg-orange-500 shadow-lg shadow-orange-500/20" delay={0.1} />
        <StatCard title="Workout Time" value="4h 20m" icon={Activity} colorClass="bg-accent shadow-lg shadow-accent/20" delay={0.2} />
        <StatCard title="Water Intake" value="2.8 L" icon={Droplets} colorClass="bg-cyan-500 shadow-lg shadow-cyan-500/20" delay={0.3} />
        <StatCard title="Weekly Goal" value="85%" icon={Target} colorClass="bg-success shadow-lg shadow-success/20" delay={0.4} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 card p-6 lg:p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl text-primary dark:text-white tracking-tight">Activity Trend</h3>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#3B82F6', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="calories" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorCalories)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Recommendations Side Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="card p-6 lg:p-8 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-xl text-primary dark:text-white tracking-tight">AI Insights</h3>
          </div>
          
          <div className="space-y-5">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs text-accent font-bold mb-2 uppercase tracking-wider">Workout Prediction</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Based on your recent strain, a light yoga or mobility session is recommended today to optimize recovery.</p>
            </div>
            
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs text-success font-bold mb-2 uppercase tracking-wider">Nutrition Tip</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Your protein intake was 15% lower yesterday. Try adding a lean protein source to your post-workout meal.</p>
            </div>

            <button className="w-full mt-2 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-sm font-semibold transition-all border border-slate-200 dark:border-slate-700 shadow-sm text-primary dark:text-white">
              View Full Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
