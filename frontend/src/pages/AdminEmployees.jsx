import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Search, Filter, Briefcase, Plus, MoreVertical, ShieldAlert } from 'lucide-react';

const initialEmployees = [
  { id: 1, name: 'David Miller', role: 'Head Trainer', branch: 'Downtown Core HQ', salary: '$5,200/mo', status: 'Active' },
  { id: 2, name: 'Sarah Jenkins', role: 'Branch Manager', branch: 'Downtown Core HQ', salary: '$6,500/mo', status: 'Active' },
  { id: 3, name: 'Elena Rostova', role: 'Nutritionist', branch: 'North Hills Strength', salary: '$4,800/mo', status: 'Active' },
  { id: 4, name: 'Marcus Thorne', role: 'Branch Manager', branch: 'Westside Athletics', salary: '$6,000/mo', status: 'Active' },
  { id: 5, name: 'James Chen', role: 'Receptionist', branch: 'Downtown Core HQ', salary: '$3,200/mo', status: 'On Leave' },
];

export default function AdminEmployees() {
  const [employees, setEmployees] = useState(initialEmployees);

  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Employee Directory & Payroll</h1>
          <p className="text-slate-400">Manage staff roles, branch assignments, and process monthly payroll.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-white/5 flex items-center gap-2">
            <DollarSign size={16} /> Process Payroll
          </button>
          <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 text-sm font-bold">
            <Plus size={18} /> Add Employee
          </button>
        </div>
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search employees by name or role..." 
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors w-full md:w-auto">
            <Filter size={18} /> Filter by Branch
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors w-full md:w-auto">
            <Briefcase size={18} /> Filter by Role
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card bg-slate-900/60 border border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Employee</th>
                <th className="p-4 font-semibold">Role & Access</th>
                <th className="p-4 font-semibold">Branch</th>
                <th className="p-4 font-semibold">Salary / Payroll</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-accent font-bold border border-white/10">
                        {emp.name.charAt(0)}
                      </div>
                      <span className="text-white font-bold">{emp.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-slate-300 font-medium">{emp.role}</span>
                      {emp.role.includes('Manager') && (
                        <span className="text-xs text-red-400 flex items-center gap-1 mt-1"><ShieldAlert size={12}/> Admin Access</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{emp.branch}</td>
                  <td className="p-4 font-medium text-green-400">{emp.salary}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${emp.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
