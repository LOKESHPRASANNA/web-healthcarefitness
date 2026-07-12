import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, QrCode, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const attendanceData = [
  { name: 'Present', value: 24, color: '#22c55e' },
  { name: 'Absent', value: 4, color: '#ef4444' },
  { name: 'Late', value: 2, color: '#f59e0b' },
];

const checkinHistory = [
  { id: 1, date: 'Today, 06:30 AM', location: 'Downtown Hub', status: 'Checked In', type: 'present' },
  { id: 2, date: 'Yesterday, 06:45 AM', location: 'Downtown Hub', status: 'Late', type: 'late' },
  { id: 3, date: 'Wed, Jun 12', location: '-', status: 'Absent', type: 'absent' },
  { id: 4, date: 'Tue, Jun 11, 06:20 AM', location: 'Downtown Hub', status: 'Checked In', type: 'present' },
  { id: 5, date: 'Mon, Jun 10, 06:15 AM', location: 'Downtown Hub', status: 'Checked In', type: 'present' },
];

export default function Attendance() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Attendance</h1>
          <p className="text-surface-500">Track your gym visits and access your digital entry pass.</p>
        </div>
        <button 
          onClick={() => setShowQR(!showQR)}
          className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-blue-900/5 shadow-accent/25"
        >
          <QrCode size={18} /> {showQR ? 'Hide Entry Pass' : 'Show Entry Pass'}
        </button>
      </motion.div>

      {/* QR Code Modal/Section */}
      {showQR && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mb-10 card p-8 bg-gradient-to-br from-indigo-900/80 to-white border border-indigo-500/30 flex flex-col items-center justify-center text-center"
        >
          <div className="bg-surface-100 p-4 rounded-2xl mb-6 shadow-xl shadow-blue-900/5">
            {/* Mock QR Code Image */}
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FitnessPlusUser123" alt="Entry Pass" className="w-48 h-48 rounded-xl" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800 mb-2">Your Digital Pass</h3>
          <p className="text-surface-600 max-w-md">Scan this code at the turnstile to enter the gym. The code refreshes every 60 seconds.</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Attendance Stats Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card p-6 bg-slate-900/60 border border-surface-200/50 flex flex-col justify-center items-center"
        >
          <h3 className="font-bold text-xl text-surface-800 mb-6 self-start w-full">Monthly Overview</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display text-3xl md:text-4xl font-bold text-surface-900">80%</span>
              <span className="text-xs text-surface-500">Attendance</span>
            </div>
          </div>
          <div className="flex justify-between w-full mt-6 px-4">
            {attendanceData.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className="flex items-center gap-1.5 justify-center mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                  <span className="text-xs font-medium text-surface-500">{stat.name}</span>
                </div>
                <span className="font-display text-lg font-bold text-surface-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* History List */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card p-0 bg-slate-900/60 border border-surface-200/50 overflow-hidden"
        >
          <div className="p-6 border-b border-surface-200/50 flex justify-between items-center bg-slate-800/30">
            <h3 className="font-bold text-xl text-surface-800">Recent Activity</h3>
            <button className="text-sm font-semibold text-accent hover:text-accent-light transition-colors">View Calendar</button>
          </div>
          <div className="divide-y divide-white/5">
            {checkinHistory.map((record) => (
              <div key={record.id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${
                    record.type === 'present' ? 'bg-green-500/10 text-green-500' :
                    record.type === 'late' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {record.type === 'present' ? <CheckCircle size={20} /> :
                     record.type === 'late' ? <Clock size={20} /> : <XCircle size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-surface-800 text-base">{record.status}</h4>
                    <p className="text-sm text-surface-500 flex items-center gap-1">
                      <CalendarIcon size={14} /> {record.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-surface-600 font-medium flex items-center gap-1 justify-end">
                    <MapPin size={14} className="text-surface-500" /> {record.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
