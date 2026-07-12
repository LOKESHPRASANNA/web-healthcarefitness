import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, X, Shield, Star, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    period: '/month',
    desc: 'Perfect for beginners getting started.',
    color: 'text-slate-300',
    bg: 'bg-slate-800',
    border: 'border-white/10',
    features: [
      { name: 'Full Gym Access', included: true },
      { name: 'Basic Equipment', included: true },
      { name: 'Locker Room', included: true },
      { name: 'Group Classes', included: false },
      { name: 'AI Coach', included: false },
      { name: 'Personal Trainer', included: false },
    ]
  },
  {
    name: 'Pro',
    price: '$59',
    period: '/month',
    desc: 'Most popular for dedicated athletes.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/50',
    isPopular: true,
    features: [
      { name: 'Full Gym Access', included: true },
      { name: 'All Equipment', included: true },
      { name: 'Locker Room & Sauna', included: true },
      { name: 'Unlimited Group Classes', included: true },
      { name: 'Basic AI Coach', included: true },
      { name: 'Personal Trainer', included: false },
    ]
  },
  {
    name: 'Elite',
    price: '$129',
    period: '/month',
    desc: 'The ultimate VIP fitness experience.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/50',
    features: [
      { name: 'Full VIP Access', included: true },
      { name: 'Priority Equipment', included: true },
      { name: 'Private Locker & Spa', included: true },
      { name: 'Unlimited Classes', included: true },
      { name: 'Advanced AI Coach', included: true },
      { name: '4 PT Sessions/month', included: true },
    ]
  }
];

export default function Membership() {
  return (
    <div className="max-w-7xl mx-auto h-full pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500 font-bold mb-4">
          <Crown size={18} /> Premium Memberships
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Choose Your <span className="text-yellow-500">Tier</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Upgrade your fitness journey with access to advanced AI coaching, premium facilities, and dedicated personal trainers.</p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`card relative overflow-hidden bg-slate-900/80 backdrop-blur-xl border ${plan.border} flex flex-col p-8 transition-transform hover:-translate-y-2`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 inset-x-0 h-1 bg-accent"></div>
            )}
            
            <h3 className={`text-2xl font-bold mb-2 ${plan.color}`}>{plan.name}</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">{plan.desc}</p>
            
            <div className="flex items-end gap-1 mb-8">
              <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
              <span className="text-slate-500 font-medium mb-1">{plan.period}</span>
            </div>

            <button className={`w-full py-4 rounded-xl font-bold transition-all mb-8 shadow-lg ${
              plan.isPopular 
                ? 'bg-accent text-white hover:bg-accent-dark shadow-accent/25' 
                : plan.name === 'Elite' 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/25'
                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-white/5'
            }`}>
              Select {plan.name}
            </button>

            <div className="space-y-4 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  {feature.included ? (
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                      <X size={12} className="text-slate-500" />
                    </div>
                  )}
                  <span className={feature.included ? 'text-slate-300 text-sm font-medium' : 'text-slate-600 text-sm'}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current Subscription Status */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto card p-8 bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center shrink-0 border border-yellow-500/30">
            <Star size={32} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold text-white mb-2">Elite VIP Access</h3>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <Shield size={16} className="text-green-400" /> Auto-renews on Dec 15, 2026
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all">Cancel Plan</button>
          <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
            <Zap size={18} /> Upgrade Add-ons
          </button>
        </div>
      </motion.div>
    </div>
  );
}
