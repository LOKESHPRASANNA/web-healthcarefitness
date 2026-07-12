import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Moon, Sun, Smartphone, Key, CreditCard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Settings() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-5xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Settings</h1>
        <p className="text-surface-500">Manage your profile, preferences, and account security.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Nav (Static for UI) */}
        <div className="space-y-2">
          {[
            { icon: User, label: 'Profile', active: true },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Shield, label: 'Security & Privacy', active: false },
            { icon: CreditCard, label: 'Billing', active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              item.active ? 'bg-accent/10 text-accent border border-accent/20' : 'text-surface-400 hover:bg-slate-800/50 hover:text-white'
            }`}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-8">
          
          {/* Profile Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 bg-slate-900/60 border border-surface-200/50">
            <h3 className="font-display text-xl font-bold text-surface-900 mb-6">Public Profile</h3>
            <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#EEF4FF] border-2 border-accent flex items-center justify-center text-accent text-3xl font-bold">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <button className="text-sm font-semibold text-surface-600 hover:text-white transition-colors bg-surface-100/5 px-4 py-2 rounded-lg border border-surface-200">Change Avatar</button>
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" defaultValue={user?.fullName || ''} className="w-full bg-[#EEF4FF] border border-surface-200 rounded-xl px-4 py-2.5 text-surface-800 focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Username</label>
                    <input type="text" defaultValue={user?.username || ''} className="w-full bg-[#EEF4FF] border border-surface-200 rounded-xl px-4 py-2.5 text-surface-800 focus:outline-none focus:border-accent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} className="w-full bg-[#EEF4FF] border border-surface-200 rounded-xl px-4 py-2.5 text-surface-800 focus:outline-none focus:border-accent" />
                </div>
                <div className="flex justify-end pt-4">
                  <button className="btn-primary py-2.5 px-6 rounded-xl">Save Changes</button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Preferences Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8 bg-slate-900/60 border border-surface-200/50">
            <h3 className="font-display text-xl font-bold text-surface-900 mb-6">Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-surface-200/50">
                <div>
                  <h4 className="font-bold text-surface-800 flex items-center gap-2"><Moon size={18}/> Theme Mode</h4>
                  <p className="text-sm text-surface-500 mt-1">Switch between dark and light themes.</p>
                </div>
                <div className="flex bg-[#EEF4FF] p-1 rounded-xl border border-surface-200/50">
                  <button 
                    onClick={() => document.documentElement.classList.add('dark')}
                    className="px-4 py-1.5 rounded-lg text-sm font-bold bg-surface-100/10 text-surface-800 flex items-center gap-2 transition-colors hover:bg-surface-100/20">
                    <Moon size={14}/> Dark
                  </button>
                  <button 
                    onClick={() => document.documentElement.classList.remove('dark')}
                    className="px-4 py-1.5 rounded-lg text-sm font-bold text-surface-500 hover:text-white flex items-center gap-2 transition-colors hover:bg-surface-100/5">
                    <Sun size={14}/> Light
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-surface-200/50">
                <div>
                  <h4 className="font-bold text-surface-800 flex items-center gap-2"><Smartphone size={18}/> Push Notifications</h4>
                  <p className="text-sm text-surface-500 mt-1">Receive alerts for workouts, meals, and classes.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-100 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-surface-800 flex items-center gap-2"><Bell size={18}/> Marketing Emails</h4>
                  <p className="text-sm text-surface-500 mt-1">Receive promotional offers and newsletters.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-100 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </motion.section>

          {/* Security Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-8 bg-slate-900/60 border border-surface-200/50 border-l-4 border-l-red-500/50">
            <h3 className="font-display text-xl font-bold text-surface-900 mb-6 flex items-center gap-2"><Key size={20} className="text-red-400" /> Security</h3>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-surface-100/5 hover:bg-surface-100/10 rounded-xl transition-colors text-surface-800 font-medium border border-surface-200/50">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 bg-surface-100/5 hover:bg-surface-100/10 rounded-xl transition-colors text-surface-800 font-medium border border-surface-200/50 flex justify-between items-center">
                <span>Two-Factor Authentication (2FA)</span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-md font-bold">Disabled</span>
              </button>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
