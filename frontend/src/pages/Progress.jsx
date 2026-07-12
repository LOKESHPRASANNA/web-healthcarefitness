import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Scale, Target, Activity, Camera, TrendingDown, TrendingUp, Trophy, Plus, Medal } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const weightData = [
  { month: 'Jan', weight: 85, fat: 22 },
  { month: 'Feb', weight: 84, fat: 21.5 },
  { month: 'Mar', weight: 82.5, fat: 20 },
  { month: 'Apr', weight: 81, fat: 19 },
  { month: 'May', weight: 79.5, fat: 18.2 },
  { month: 'Jun', weight: 78, fat: 17.5 },
];

const metrics = [
  { label: 'Current Weight', value: '78.0 kg', change: '-7.0 kg', icon: Scale, trend: 'down', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { label: 'Body Fat', value: '17.5%', change: '-4.5%', icon: Activity, trend: 'down', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Muscle Mass', value: '34.2 kg', change: '+2.1 kg', icon: Target, trend: 'up', color: 'text-green-400', bg: 'bg-green-400/10' },
];

const bodyMeasurements = [
  { part: 'Chest', current: '102 cm', start: '98 cm' },
  { part: 'Waist', current: '84 cm', start: '92 cm' },
  { part: 'Hips', current: '98 cm', start: '104 cm' },
  { part: 'Arms', current: '38 cm', start: '35 cm' },
  { part: 'Legs', current: '62 cm', start: '58 cm' },
];

export default function Progress() {
  const { user } = useContext(AuthContext);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPRs = async () => {
    if (!user || !user.id) return;
    try {
      const res = await fetch(`/api/personal-records/user/${user.id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPrs(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPRs();
  }, [user]);

  const handleAddPR = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPr = {
      userId: user.id,
      exerciseName: formData.get('exerciseName'),
      weight: parseFloat(formData.get('weight')),
      reps: parseInt(formData.get('reps')),
    };
    
    setLoading(true);
    try {
      await fetch('/api/personal-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPr)
      });
      fetchPRs();
      e.target.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group PRs by exercise for the chart
  const getChartData = () => {
    const grouped = {};
    prs.forEach(pr => {
      if (!grouped[pr.exerciseName] || grouped[pr.exerciseName].weight < pr.weight) {
        grouped[pr.exerciseName] = { name: pr.exerciseName, max: pr.weight };
      }
    });
    return Object.values(grouped).slice(0, 5); // top 5 exercises
  };

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Body Tracker</h1>
          <p className="text-surface-500">Track your transformation, measurements, and body composition over time.</p>
        </div>
        <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2">
          <Camera size={18} /> Add Progress Photo
        </button>
      </motion.div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((m, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={m.label}
            className="card p-6 bg-slate-900/60 border border-surface-200/50 backdrop-blur-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${m.bg} ${m.color}`}>
                <m.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${m.trend === 'down' ? 'text-green-400' : 'text-accent'}`}>
                {m.trend === 'down' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                {m.change}
              </div>
            </div>
            <p className="text-surface-500 text-sm font-medium mb-1">{m.label}</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">{m.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card p-6 bg-slate-900/60 border border-surface-200/50 backdrop-blur-md flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl font-bold text-surface-900">Weight & Fat % Trend</h3>
            <select className="bg-[#EEF4FF] text-surface-600 text-sm rounded-lg px-3 py-1.5 border border-surface-200 outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                <YAxis yAxisId="left" stroke="#94a3b8" axisLine={false} tickLine={false} fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
                <YAxis yAxisId="right" orientation="right" stroke="#F97316" axisLine={false} tickLine={false} fontSize={12} domain={[10, 25]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Area yAxisId="left" type="monotone" dataKey="weight" name="Weight (kg)" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                <Area yAxisId="right" type="monotone" dataKey="fat" name="Fat (%)" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorFat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Measurements List */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="card p-6 bg-slate-900/60 border border-surface-200/50 backdrop-blur-md flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl font-bold text-surface-900">Measurements</h3>
            <button className="text-accent text-sm font-semibold hover:underline">Update</button>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {bodyMeasurements.map((item, idx) => (
              <div key={idx} className="bg-surface-100/50 rounded-xl p-4 border border-surface-200/50 flex items-center justify-between">
                <div>
                  <p className="text-surface-800 font-bold mb-1">{item.part}</p>
                  <p className="text-xs text-surface-500">Start: {item.start}</p>
                </div>
                <div className="text-right">
                  <p className="text-accent font-bold text-lg">{item.current}</p>
                  <p className="text-xs text-green-400 font-medium">Improved</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Personal Records Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold text-surface-800 mb-6 flex items-center gap-2"><Trophy className="text-yellow-500" /> Personal Records</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="card p-6 bg-slate-900/60 border border-surface-200/50">
            <h4 className="font-bold text-surface-900 mb-4">Log a New PR</h4>
            <form onSubmit={handleAddPR} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-surface-500 uppercase mb-2">Exercise Name</label>
                <input required name="exerciseName" type="text" placeholder="e.g. Bench Press" className="w-full bg-[#EEF4FF] border border-surface-200 rounded-lg px-4 py-2 focus:border-accent outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-500 uppercase mb-2">Weight (kg/lbs)</label>
                  <input required name="weight" type="number" step="0.5" placeholder="100" className="w-full bg-[#EEF4FF] border border-surface-200 rounded-lg px-4 py-2 focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-500 uppercase mb-2">Reps</label>
                  <input required name="reps" type="number" placeholder="5" className="w-full bg-[#EEF4FF] border border-surface-200 rounded-lg px-4 py-2 focus:border-accent outline-none" />
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full btn-primary py-2.5 rounded-lg flex justify-center items-center gap-2">
                <Plus size={16} /> {loading ? 'Saving...' : 'Save Record'}
              </button>
            </form>
          </div>
          
          <div className="lg:col-span-2 card p-6 bg-slate-900/60 border border-surface-200/50 flex flex-col">
            <h4 className="font-bold text-surface-900 mb-4">Top Records Overview</h4>
            {prs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-surface-400">
                <Medal size={40} className="mb-2 opacity-50" />
                <p>No personal records logged yet.</p>
              </div>
            ) : (
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                    <YAxis axisLine={false} tickLine={false} fontSize={12} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="max" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} name="Max Weight" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Progress Photos */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-surface-800 mb-6 flex items-center gap-2"><Camera className="text-accent" /> Transformation Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { date: 'Jan 1', label: 'Day 1', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop' },
            { date: 'Mar 1', label: 'Month 3', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop' },
            { date: 'May 1', label: 'Month 5', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
            { date: 'Jun 1', label: 'Current', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b-d25dfeac3438?q=80&w=400&auto=format&fit=crop' }
          ].map((photo, i) => (
            <div key={i} className="card p-2 bg-slate-900/40 border border-surface-200 group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                <img src={photo.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-surface-800 font-bold text-sm">{photo.label}</p>
                  <p className="text-xs text-surface-600">{photo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
