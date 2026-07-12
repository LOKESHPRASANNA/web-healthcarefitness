import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Users, Phone, Plus, Edit2, Trash2 } from 'lucide-react';

const initialBranches = [
  { id: 1, name: 'Downtown Core HQ', address: '120 Fitness Blvd, Financial District', manager: 'Sarah Jenkins', phone: '+1 555-0192', activeMembers: 1250, status: 'Active' },
  { id: 2, name: 'Westside Athletics', address: '450 West Ave, Near University', manager: 'Marcus Thorne', phone: '+1 555-0193', activeMembers: 850, status: 'Active' },
  { id: 3, name: 'North Hills Strength', address: '880 North Blvd, Tech Park', manager: 'Elena Rostova', phone: '+1 555-0194', activeMembers: 420, status: 'Maintenance' },
];

export default function AdminBranches() {
  const [branches, setBranches] = useState(initialBranches);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Branch Management</h1>
          <p className="text-surface-500">Oversee multiple gym locations, assign managers, and track branch status.</p>
        </div>
        <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2">
          <Plus size={18} /> Add New Branch
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch, index) => (
          <motion.div 
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-slate-900/60 border border-surface-200/50 overflow-hidden flex flex-col"
          >
            {/* Branch Header Image Placeholder */}
            <div className="h-32 bg-[#EEF4FF] relative bg-[url('https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-14e5300c3a48?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center">
               <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
               <div className="absolute bottom-4 left-4 flex items-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${branch.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'} shadow-[0_0_10px_currentColor]`}></div>
                 <span className="text-white font-bold text-sm bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">{branch.status}</span>
               </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-display text-xl font-bold text-surface-900 mb-4 flex items-center gap-2"><Building2 size={20} className="text-accent" /> {branch.name}</h3>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-3 text-surface-600 text-sm">
                  <MapPin size={16} className="text-surface-500 shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3 text-surface-600 text-sm">
                  <Users size={16} className="text-surface-500 shrink-0" />
                  <span>Manager: <strong className="text-surface-800">{branch.manager}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-surface-600 text-sm">
                  <Phone size={16} className="text-surface-500 shrink-0" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-surface-600 text-sm">
                  <Activity size={16} className="text-surface-500 shrink-0" /> {/* Activity icon fallback if users used */}
                  <span>Active Members: <strong className="text-surface-800">{branch.activeMembers}</strong></span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-surface-200/50">
                <button className="text-surface-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
                  <Edit2 size={16} /> Edit Details
                </button>
                <button className="text-surface-500 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-semibold">
                  <Trash2 size={16} /> Disable
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
