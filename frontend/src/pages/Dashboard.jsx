import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Target, ChevronDown, CheckCircle, CreditCard, Calendar, Droplets, Heart, Medal, Trophy, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AuthContext } from '../context/AuthContext';

const activityData = [
  { name: 'Mon', calories: 400, hr: 120 },
  { name: 'Tue', calories: 300, hr: 110 },
  { name: 'Wed', calories: 550, hr: 135 },
  { name: 'Thu', calories: 450, hr: 125 },
  { name: 'Fri', calories: 600, hr: 145 },
  { name: 'Sat', calories: 800, hr: 160 },
  { name: 'Sun', calories: 750, hr: 150 },
];

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, delay, gradientClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`card p-6 flex flex-col gap-4 border border-white/5 backdrop-blur-md relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${gradientClass} rounded-full blur-3xl opacity-20 -mr-10 -mt-10`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-3 rounded-2xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>}
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welcome back, {user?.fullName || 'Athlete'}</h1>
          <p className="text-slate-400 text-base">Here is your daily fitness summary.</p>
        </div>
        <button className="px-6 py-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-all font-medium border border-white/10 text-sm shadow-sm flex items-center gap-2 text-white">
          This Week <ChevronDown size={16} />
        </button>
      </motion.div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Calories" value="3,850 kcal" subtitle="12% ahead of goal"
          icon={Flame} colorClass="bg-orange-500" gradientClass="bg-orange-500" delay={0.1} 
        />
        <StatCard 
          title="Exercise Streak" value="5 Days" subtitle="Personal Best: 14 Days"
          icon={Star} colorClass="bg-yellow-500" gradientClass="bg-yellow-500" delay={0.2} 
        />
        <StatCard 
          title="Water Intake" value="2.4 / 3L" subtitle="2 glasses remaining"
          icon={Droplets} colorClass="bg-cyan-500" gradientClass="bg-cyan-500" delay={0.3} 
        />
        <StatCard 
          title="Avg Heart Rate" value="132 bpm" subtitle="Cardio zone active"
          icon={Heart} colorClass="bg-rose-500" gradientClass="bg-rose-500" delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 card p-6 bg-slate-900/60 border border-white/5 backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-white">Performance Overview</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs text-slate-400"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Calories</span>
              <span className="flex items-center gap-2 text-xs text-slate-400"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Heart Rate</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                <YAxis yAxisId="left" stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }} />
                <Area yAxisId="left" type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCal)" />
                <Area yAxisId="right" type="monotone" dataKey="hr" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorHr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          {/* AI Coach Mini */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="card p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/20 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Activity size={20} />
              </div>
              <h3 className="font-bold text-lg text-white">AI Coach Insight</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Your recovery score is optimal today. I recommend taking on the <span className="font-bold text-accent">Advanced HIIT Cardio</span> session to maximize fat burn.
            </p>
            <button className="w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl text-sm font-semibold transition-all border border-purple-500/30">
              Start Recommended Workout
            </button>
          </motion.div>

          {/* Leaderboard Mini */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="card p-6 bg-slate-900/60 border border-white/5 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={20} className="text-yellow-500" />
              <h3 className="font-bold text-lg text-white">Global Leaderboard</h3>
            </div>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'Alex Johnson', pts: '12,450' },
                { rank: 2, name: 'Sarah Miller', pts: '11,200' },
                { rank: 3, name: user?.fullName || 'You', pts: '10,850', isUser: true },
              ].map((p, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${p.isUser ? 'bg-accent/10 border-accent/30' : 'bg-slate-800/50 border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${p.rank === 1 ? 'text-yellow-500' : p.rank === 2 ? 'text-slate-300' : 'text-orange-400'}`}>#{p.rank}</span>
                    <span className="text-sm text-white font-medium">{p.name}</span>
                  </div>
                  <span className="text-xs text-accent font-bold">{p.pts} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
