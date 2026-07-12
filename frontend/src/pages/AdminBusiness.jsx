import React from 'react';
import { motion } from 'framer-motion';
import { Building2, DollarSign, Users, TrendingUp, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 59000 },
  { month: 'Jun', revenue: 75000 },
];

const branchData = [
  { name: 'Downtown', active: 1250, new: 145 },
  { name: 'Westside', active: 850, new: 80 },
  { name: 'North Hills', active: 420, new: 50 },
];

export default function AdminBusiness() {
  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-bold mb-2 border border-purple-500/20 text-xs uppercase tracking-wider">
            <Building2 size={14} /> Enterprise Command Center
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Business Dashboard</h1>
          <p className="text-surface-500">High-level financial and operational analytics across all branches.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#EEF4FF] hover:bg-slate-700 text-surface-800 px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-surface-200/50 flex items-center gap-2">
            <Download size={16} /> Export Q2 Report
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 bg-slate-900/60 border border-surface-200/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl text-green-400"><DollarSign size={24} /></div>
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">+18% vs Last Month</span>
          </div>
          <h3 className="text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Total MRR</h3>
          <p className="font-display text-3xl md:text-4xl font-bold text-surface-900">$75,000</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 bg-slate-900/60 border border-surface-200/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Users size={24} /></div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg">+12% vs Last Month</span>
          </div>
          <h3 className="text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Active Members</h3>
          <p className="font-display text-3xl md:text-4xl font-bold text-surface-900">2,520</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6 bg-slate-900/60 border border-surface-200/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Building2 size={24} /></div>
            <span className="text-xs font-bold text-surface-500 bg-[#EEF4FF] px-2 py-1 rounded-lg">Stable</span>
          </div>
          <h3 className="text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Total Branches</h3>
          <p className="font-display text-3xl md:text-4xl font-bold text-surface-900">3</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6 bg-slate-900/60 border border-surface-200/50">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400"><TrendingUp size={24} /></div>
            <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-lg">+2.1% Churn</span>
          </div>
          <h3 className="text-surface-500 text-sm font-bold uppercase tracking-wider mb-1">Avg LTV (Lifetime Value)</h3>
          <p className="font-display text-3xl md:text-4xl font-bold text-surface-900">$1,240</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Analytics */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 card p-6 bg-slate-900/60 border border-surface-200/50">
          <h3 className="font-display text-lg font-bold text-surface-900 mb-6">Revenue Analytics (YTD)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                <YAxis stroke="#64748B" axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Branch Performance */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-1 card p-6 bg-slate-900/60 border border-surface-200/50">
          <h3 className="font-display text-lg font-bold text-surface-900 mb-6">Branch Performance</h3>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#64748B" axisLine={false} tickLine={false} fontSize={12} width={80} />
                <Tooltip cursor={{fill: '#1E293B'}} contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }}/>
                <Bar dataKey="active" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Active Members" />
                <Bar dataKey="new" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="New (This Month)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-orange-400 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-orange-400 text-sm font-bold mb-1">North Hills Needs Attention</h4>
              <p className="text-surface-600 text-xs">Member acquisition is down 15% WoW. Recommend deploying marketing budget.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
