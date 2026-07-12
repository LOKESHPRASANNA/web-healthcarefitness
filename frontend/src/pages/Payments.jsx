import React from 'react';
import { motion } from 'framer-motion';
import { Download, CreditCard, DollarSign, ArrowUpRight, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const paymentData = [
  { month: 'Jan', amount: 129 },
  { month: 'Feb', amount: 129 },
  { month: 'Mar', amount: 159 }, // Bought supplements
  { month: 'Apr', amount: 129 },
  { month: 'May', amount: 129 },
  { month: 'Jun', amount: 229 }, // PT Sessions
];

const invoices = [
  { id: 'INV-2026-006', date: 'Jun 01, 2026', amount: '$229.00', status: 'Paid', method: 'Visa •••• 4242', items: 'Elite Plan + 2 PT Sessions' },
  { id: 'INV-2026-005', date: 'May 01, 2026', amount: '$129.00', status: 'Paid', method: 'Visa •••• 4242', items: 'Elite Plan' },
  { id: 'INV-2026-004', date: 'Apr 01, 2026', amount: '$129.00', status: 'Paid', method: 'Visa •••• 4242', items: 'Elite Plan' },
  { id: 'INV-2026-003', date: 'Mar 01, 2026', amount: '$159.00', status: 'Paid', method: 'Visa •••• 4242', items: 'Elite Plan + Whey Protein' },
  { id: 'INV-2026-002', date: 'Feb 01, 2026', amount: '$129.00', status: 'Paid', method: 'Visa •••• 4242', items: 'Elite Plan' },
  { id: 'INV-2026-001', date: 'Jan 01, 2026', amount: '$129.00', status: 'Paid', method: 'Visa •••• 4242', items: 'Elite Plan' },
];

export default function Payments() {
  return (
    <div className="max-w-7xl mx-auto h-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">Billing & Payments</h1>
          <p className="text-slate-500">Manage your subscription, invoices, and payment methods.</p>
        </div>
        <button className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2">
          <CreditCard size={18} /> Update Payment Method
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Next Billing Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card p-6 bg-gradient-to-br from-indigo-900/50 to-white border border-indigo-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-indigo-400" />
              <h3 className="font-bold text-slate-800">Next Payment</h3>
            </div>
            <p className="text-5xl font-bold text-slate-800 mb-2">$129<span className="text-lg text-slate-500 font-medium">.00</span></p>
            <p className="text-sm text-slate-600">Due on July 01, 2026</p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Auto-pay enabled</span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/20">Active</span>
          </div>
        </motion.div>

        {/* Lifetime Spend Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card p-6 bg-slate-900/60 border border-slate-100"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Spend History</h3>
              <p className="text-sm text-slate-500">Total YTD: <span className="text-slate-800 font-bold">$904.00</span></p>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-slate-200 text-slate-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" axisLine={false} tickLine={false} dy={10} fontSize={12} />
                <YAxis stroke="#64748B" axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  cursor={{ fill: '#1E293B', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Invoice History Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-slate-900/60 border border-slate-100 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-800/30">
          <h3 className="font-bold text-xl text-slate-800">Invoice History</h3>
          <button className="text-sm font-semibold text-accent hover:text-accent-light transition-colors flex items-center gap-1">
            Download All <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 pl-6">Invoice</th>
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6 font-medium text-slate-800">{inv.id}</td>
                  <td className="p-4 text-slate-500">{inv.date}</td>
                  <td className="p-4 text-slate-600">{inv.items}</td>
                  <td className="p-4 font-bold text-slate-800">{inv.amount}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 font-semibold text-xs border border-green-500/20">
                      <CheckCircle size={12} /> {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-600 transition-colors border border-slate-100">
                      <Download size={16} />
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
