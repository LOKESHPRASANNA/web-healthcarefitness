import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Target, ChevronDown, CheckCircle, CreditCard, Calendar, Droplets, Heart, Medal, Trophy, Star, User } from 'lucide-react';
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
    className={`card p-6 flex flex-col gap-4 border border-surface-200/50 backdrop-blur-md relative overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${gradientClass} rounded-full blur-3xl opacity-20 -mr-10 -mt-10`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-3 rounded-2xl ${colorClass}`}>
        <Icon size={24} className="text-surface-800" />
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-surface-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="font-display text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">{value}</h3>
      {subtitle && <p className="text-xs text-surface-500 mt-2 font-medium">{subtitle}</p>}
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const profileIncomplete = user && (!user.fullName || !user.avatarUrl);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      
      {profileIncomplete && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-surface-100/30 border border-accent/30 rounded-xl p-4 flex items-center justify-between shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-surface-900">Complete your profile</p>
              <p className="text-xs text-surface-500 font-medium">Add a photo and your full name to get the most out of FitnessPlus.</p>
            </div>
          </div>
          <a href="/settings" className="text-sm font-bold text-accent hover:text-accent-dark transition-colors px-4 py-2 bg-accent/10 rounded-lg">
            Go to Settings
          </a>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Welcome back, {user?.fullName || 'Athlete'}</h1>
          <p className="text-surface-500 text-base">Here is your daily fitness summary.</p>
        </div>
        <button className="px-6 py-2.5 bg-surface-100/50 hover:bg-slate-700 rounded-xl transition-all font-medium border border-surface-200 text-sm shadow-sm flex items-center gap-2 text-surface-800">
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
          title="Exercise Streak" value={`${user?.currentStreak || 0} Days`} subtitle="Keep the momentum going!"
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
          className="lg:col-span-2 card p-6 bg-surface-100 border border-surface-200/50 backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-surface-800">Performance Overview</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs text-surface-500"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Calories</span>
              <span className="flex items-center gap-2 text-xs text-surface-500"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Heart Rate</span>
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
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} opacity={0.8} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                <YAxis yAxisId="left" stroke="#64748b" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ color: '#1e293b' }} />
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
            className="card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-100 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                <Activity size={20} />
              </div>
              <h3 className="font-bold text-lg text-surface-800">AI Coach Insight</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Your recovery score is optimal today. I recommend taking on the <span className="font-bold text-purple-700">Advanced HIIT Cardio</span> session to maximize fat burn.
            </p>
            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-purple-500/20">
              Start Recommended Workout
            </button>
          </motion.div>

          {/* Leaderboard Mini */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="card p-6 bg-surface-100 border border-surface-200/50 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={20} className="text-yellow-500" />
              <h3 className="font-bold text-lg text-surface-800">Global Leaderboard</h3>
            </div>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'Alex Johnson', pts: '12,450' },
                { rank: 2, name: 'Sarah Miller', pts: '11,200' },
                { rank: 3, name: user?.fullName || 'You', pts: '10,850', isUser: true },
              ].map((p, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${p.isUser ? 'bg-blue-50 border-blue-100' : 'bg-surface-50 border-surface-200/50'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${p.rank === 1 ? 'text-yellow-500' : p.rank === 2 ? 'text-surface-500' : 'text-orange-400'}`}>#{p.rank}</span>
                    <span className="text-sm text-surface-800 font-medium">{p.name}</span>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">{p.pts} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
