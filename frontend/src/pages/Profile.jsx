import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, AlertCircle, Droplet, Phone, Shield, Edit3 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-5xl mx-auto h-full pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Member Profile</h1>
          <p className="text-slate-400">View your account details and emergency health profile.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2"
        >
          <Edit3 size={18} /> {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Basic Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="card p-8 bg-slate-900/60 border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent to-purple-500"></div>
            <div className="w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-800 flex items-center justify-center text-5xl font-bold text-accent shadow-2xl mb-4">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <h2 className="text-2xl font-bold text-white">{user?.fullName || 'User'}</h2>
            <p className="text-sm text-slate-400 mb-6">{user?.email || 'user@example.com'}</p>
            <div className="w-full bg-slate-800/50 rounded-xl p-4 border border-white/5 flex justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Status</p>
                <p className="text-sm text-green-400 font-bold">Elite Member</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold">Joined</p>
                <p className="text-sm text-white font-bold">Jan 2026</p>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-slate-900/60 border border-white/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Activity size={18}/> Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-slate-400 text-sm">Age</span>
                <span className="text-white font-bold">28</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-slate-400 text-sm">Height</span>
                <span className="text-white font-bold">180 cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Current Weight</span>
                <span className="text-white font-bold">77 kg</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Emergency Health Profile */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="card p-8 bg-gradient-to-br from-red-900/20 to-slate-900/60 border border-red-500/20 h-full relative overflow-hidden">
            {/* Background Medical Icon watermark */}
            <Activity className="absolute -bottom-10 -right-10 w-64 h-64 text-red-500/5 rotate-12 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-500/20 rounded-xl text-red-500 border border-red-500/30">
                <AlertCircle size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Emergency Health Profile</h2>
                <p className="text-sm text-slate-400">Critical medical information for trainers and first responders.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-red-400/80 uppercase tracking-wider flex items-center gap-1">
                  <Droplet size={12} /> Blood Group
                </label>
                {isEditing ? (
                  <select className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500">
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                ) : (
                  <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-white font-bold text-lg flex items-center gap-2">
                    <Droplet className="text-red-500" size={18} fill="currentColor" /> O+
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Phone size={12} /> Emergency Contact
                </label>
                {isEditing ? (
                  <input type="text" defaultValue="Sarah Connor (+1 555-0198)" className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500" />
                ) : (
                  <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-white font-medium">
                    Sarah Connor (+1 555-0198)
                  </div>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2 mt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Activity size={12} /> Known Medical Conditions
                </label>
                {isEditing ? (
                  <textarea defaultValue="Mild Asthma (Exercise-induced)" className="w-full h-24 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 resize-none" />
                ) : (
                  <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-4 text-white">
                    <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm border border-red-500/20 font-medium">
                      Mild Asthma (Exercise-induced)
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2 mt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Shield size={12} /> Allergies
                </label>
                {isEditing ? (
                  <textarea defaultValue="Penicillin, Peanuts" className="w-full h-24 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 resize-none" />
                ) : (
                  <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-4 text-white flex gap-2">
                    <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm border border-orange-500/20 font-medium">
                      Penicillin
                    </span>
                    <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm border border-orange-500/20 font-medium">
                      Peanuts
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
