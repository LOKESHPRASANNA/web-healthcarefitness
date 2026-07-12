import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, DollarSign, FileText, Image as ImageIcon, CheckCircle, Package, TrendingUp } from 'lucide-react';

export default function CreatorDashboard() {
  const [publishStep, setPublishStep] = useState(1);
  const [published, setPublished] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    setPublishStep(3);
    setTimeout(() => {
      setPublished(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto h-full pb-20">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex justify-between items-end"
      >
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold mb-2 border border-blue-500/20 text-xs uppercase tracking-wider">
            <Upload size={14} /> Creator Studio
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-2">Publish Digital Plan</h1>
          <p className="text-surface-500">Upload your premium workout or nutrition plan to the Marketplace.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Upload Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="card p-8 bg-slate-900/60 border border-surface-200/50 relative overflow-hidden">
            {published ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-surface-800 mb-2">Successfully Published!</h2>
                <p className="text-surface-500 max-w-md mx-auto mb-8">Your digital plan is now live on the Marketplace. You will earn 85% of all sales directly to your connected bank account.</p>
                <button 
                  onClick={() => { setPublished(false); setPublishStep(1); }}
                  className="btn-primary py-3 px-8 rounded-xl font-bold"
                >
                  Publish Another Plan
                </button>
              </div>
            ) : (
              <form onSubmit={handlePublish} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-surface-600">Plan Title</label>
                  <input type="text" placeholder="e.g. 8-Week Hypertrophy Program" required className="w-full bg-surface-100/50 border border-surface-200 rounded-xl px-4 py-3 text-surface-800 outline-none focus:border-accent" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-600">Category</label>
                    <select className="w-full bg-surface-100/50 border border-surface-200 rounded-xl px-4 py-3 text-surface-800 outline-none focus:border-accent">
                      <option>Workout Plan</option>
                      <option>Nutrition Plan</option>
                      <option>Video Course</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-surface-600">Price (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500" size={18} />
                      <input type="number" step="0.01" placeholder="29.99" required className="w-full bg-surface-100/50 border border-surface-200 rounded-xl pl-10 pr-4 py-3 text-surface-800 outline-none focus:border-accent" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-surface-600">Description</label>
                  <textarea rows="4" placeholder="Describe what members will get..." required className="w-full bg-surface-100/50 border border-surface-200 rounded-xl px-4 py-3 text-surface-800 outline-none focus:border-accent resize-none"></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-surface-600">Cover Image</label>
                  <div className="w-full h-32 border-2 border-dashed border-blue-100 rounded-xl bg-slate-800/30 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
                    <ImageIcon size={24} className="text-surface-500 mb-2" />
                    <span className="text-surface-600 text-sm font-semibold">Click to upload cover photo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-surface-600">Digital File (PDF/ZIP)</label>
                  <div className="w-full h-32 border-2 border-dashed border-blue-100 rounded-xl bg-slate-800/30 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
                    <FileText size={24} className="text-surface-500 mb-2" />
                    <span className="text-surface-600 text-sm font-semibold">Upload the plan file</span>
                    <span className="text-surface-500 text-xs mt-1">Users will receive this after purchase</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-200">
                  <button type="submit" disabled={publishStep === 3} className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg">
                    {publishStep === 3 ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Publishing...</>
                    ) : (
                      <><Upload size={20} /> Publish to Marketplace</>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </motion.div>

        {/* Right Col: Creator Stats Mock */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="card p-6 bg-slate-900/60 border border-surface-200/50">
            <h3 className="font-bold text-surface-800 mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-accent"/> Your Sales Performance</h3>
            
            <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50 mb-4">
              <span className="text-xs text-surface-500 font-bold uppercase tracking-wider block mb-1">Total Earnings</span>
              <span className="text-3xl font-black text-surface-800">$1,245.50</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50">
                <span className="text-xs text-surface-500 font-bold uppercase tracking-wider block mb-1">Sales</span>
                <span className="font-display text-xl font-bold text-surface-900">42</span>
              </div>
              <div className="bg-surface-100/50 p-4 rounded-xl border border-surface-200/50">
                <span className="text-xs text-surface-500 font-bold uppercase tracking-wider block mb-1">Rating</span>
                <span className="text-xl font-bold text-yellow-400">4.9 ★</span>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-slate-900/60 border border-surface-200/50">
            <h3 className="font-bold text-surface-800 mb-4 flex items-center gap-2"><Package size={18} className="text-accent"/> Active Listings</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/30 rounded-xl border border-surface-200/50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-surface-800">Advanced Core Routine</h4>
                  <span className="text-xs text-surface-500">12 Sales</span>
                </div>
                <span className="font-bold text-accent">$14.99</span>
              </div>
              <div className="p-3 bg-slate-800/30 rounded-xl border border-surface-200/50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-surface-800">Vegan Meal Prep Guide</h4>
                  <span className="text-xs text-surface-500">30 Sales</span>
                </div>
                <span className="font-bold text-accent">$19.99</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
