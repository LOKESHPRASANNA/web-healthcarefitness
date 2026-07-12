import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Star, Plus } from 'lucide-react';

const trainers = [
  { id: 1, name: 'Alex Johnson', role: 'Elite Coach', rating: '4.9', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Sarah Miller', role: 'Yoga Specialist', rating: '4.8', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Marcus Wong', role: 'Strength Coach', rating: '5.0', img: 'https://images.unsplash.com/photo-1581009146145-14e5300c3a48?q=80&w=200&auto=format&fit=crop' },
];

const classes = [
  { id: 1, name: 'Morning HIIT', time: '06:00 AM - 07:00 AM', trainer: 'Alex Johnson', spots: 4, type: 'Cardio' },
  { id: 2, name: 'Power Lifting', time: '08:30 AM - 09:30 AM', trainer: 'Marcus Wong', spots: 0, type: 'Strength' },
  { id: 3, name: 'Vinyasa Flow', time: '10:00 AM - 11:00 AM', trainer: 'Sarah Miller', spots: 12, type: 'Yoga' },
  { id: 4, name: 'Evening Crossfit', time: '06:00 PM - 07:30 PM', trainer: 'Alex Johnson', spots: 2, type: 'Endurance' },
];

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('classes');

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Bookings & Schedule</h1>
          <p className="text-slate-400">Book personal trainers, reserve class spots, and manage your schedule.</p>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('classes')}
            className={`flex-1 md:w-32 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'classes' ? 'bg-accent text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Group Classes
          </button>
          <button 
            onClick={() => setActiveTab('trainers')}
            className={`flex-1 md:w-32 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'trainers' ? 'bg-accent text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Personal Trainers
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Lists */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'classes' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Today's Classes</h3>
                <input type="date" className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none focus:border-accent" />
              </div>
              
              <div className="space-y-4">
                {classes.map(cls => (
                  <div key={cls.id} className="card p-5 bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-800 flex flex-col items-center justify-center text-accent border border-white/5">
                        <span className="text-lg font-bold">{cls.time.split(' ')[0]}</span>
                        <span className="text-xs font-semibold uppercase">{cls.time.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{cls.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1"><User size={14}/> {cls.trainer}</span>
                          <span className="flex items-center gap-1"><Clock size={14}/> 60 min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="text-right">
                        <p className={`text-sm font-bold ${cls.spots === 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {cls.spots === 0 ? 'Full' : `${cls.spots} Spots Left`}
                        </p>
                        <p className="text-xs text-slate-500">{cls.type}</p>
                      </div>
                      <button 
                        disabled={cls.spots === 0}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all ${cls.spots === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
                      >
                        {cls.spots === 0 ? 'Waitlist' : 'Book'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainers.map(trainer => (
                <div key={trainer.id} className="card p-6 bg-slate-900/60 border border-white/5 flex flex-col items-center text-center hover:border-accent/30 transition-all group">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-accent/20 group-hover:border-accent transition-colors">
                    <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{trainer.name}</h4>
                  <p className="text-sm text-accent font-medium mb-3">{trainer.role}</p>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold mb-6 bg-yellow-500/10 px-3 py-1 rounded-full">
                    <Star size={14} fill="currentColor" /> {trainer.rating}
                  </div>
                  <button className="w-full py-2.5 bg-white/5 hover:bg-accent text-white rounded-xl text-sm font-semibold transition-all border border-white/10 group-hover:border-transparent flex items-center justify-center gap-2">
                    <CalendarIcon size={16} /> Book Session
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right Col: Mini Calendar / Upcoming */}
        <div className="space-y-6">
          <div className="card p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/20 backdrop-blur-md">
            <h3 className="font-bold text-lg text-white mb-4">Your Upcoming Schedule</h3>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="flex flex-col items-center justify-center border-r border-white/10 pr-4 shrink-0 text-accent">
                    <span className="text-xs font-bold uppercase">Jun</span>
                    <span className="text-2xl font-bold">14</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Personal Training</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><Clock size={12}/> 09:00 AM</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><User size={12}/> Alex Johnson</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
