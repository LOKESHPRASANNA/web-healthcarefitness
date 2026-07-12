import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Star, Users, Dumbbell, ArrowRight, ShieldCheck, Zap, Trophy, Heart } from 'lucide-react';

const stats = [
  { label: 'Active Members', value: '10,000+', icon: Users },
  { label: 'Expert Trainers', value: '50+', icon: Star },
  { label: 'Workout Programs', value: '100+', icon: Dumbbell },
  { label: 'Success Stories', value: '5,000+', icon: Trophy },
];

const programs = [
  { name: 'Strength Training', desc: 'Build muscle and get stronger with heavy compound lifts.', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-14e5300c3a48?q=80&w=400&auto=format&fit=crop' },
  { name: 'HIIT Cardio', desc: 'Burn maximum calories in minimum time.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b-d25dfeac3438?q=80&w=400&auto=format&fit=crop' },
  { name: 'Yoga & Flexibility', desc: 'Improve mobility and reduce stress.', img: 'https://images.unsplash.com/photo-1581009146145?q=80&w=400&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFD] overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-semibold mb-6">
              <Zap size={16} /> Welcome to the Future of Fitness
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 tracking-tight mb-6">
              Unleash Your <span className="text-accent">Ultimate</span> Potential
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the world's most advanced AI-powered fitness platform. Get personalized workouts, real-time nutrition coaching, and achieve your dream physique faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                Start Your Free Trial <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn-secondary py-4 px-8 text-lg flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-slate-800 backdrop-blur-md">
                Member Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 relative z-10 border-y border-slate-100 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <stat.icon size={32} />
              </div>
              <h3 className="text-4xl font-bold text-slate-800 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Programs */}
      <div className="py-24 relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">World-Class Programs</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Discover workout plans crafted by industry experts, tailored dynamically to your progress by our AI engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card overflow-hidden group cursor-pointer border border-slate-100 bg-white/50 hover:border-accent/50 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={prog.img} alt={prog.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              </div>
              <div className="p-8 relative -mt-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{prog.name}</h3>
                <p className="text-slate-500 mb-6">{prog.desc}</p>
                <div className="flex items-center text-accent font-semibold group-hover:gap-3 transition-all">
                  Explore Program <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Coach Preview */}
      <div className="py-24 relative z-10 bg-gradient-to-b from-transparent to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Meet Your New <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">AI Personal Trainer</span></h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Our advanced AI analyzes your metrics, workout history, and nutrition logs to generate real-time recommendations. From adjusting your macros to correcting your form, the AI coach is available 24/7.
              </p>
              <ul className="space-y-4 mb-8">
                {['Dynamic Workout Generation', 'Macro & Calorie Calculations', 'Injury Prevention Advice', 'Real-time Progress Predictions'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <ShieldCheck className="text-accent" size={20} /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="btn-primary py-3 px-8 text-lg inline-block">Experience AI Coaching</Link>
            </motion.div>
          </div>
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-blue-900/5 shadow-purple-500/20"
            >
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71-839cc802b528?q=80&w=800&auto=format&fit=crop" alt="AI Interface" className="w-full h-auto" />
              <div className="absolute bottom-6 right-6 left-6 p-6 glass-panel rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent"><Activity size={20}/></div>
                  <div>
                    <h4 className="text-slate-800 font-bold">AI Insight</h4>
                    <p className="text-xs text-slate-500">Just now</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">Based on your sleep data and previous leg day, I recommend increasing your protein intake by 15g today and focusing on mobility work.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 relative z-10 bg-[#F7F9FC] text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight text-slate-800 mb-6">
          <Activity className="text-accent" size={28} />
          <span>Fitness<span className="text-accent">Plus</span></span>
        </div>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">Transforming lives through technology, dedication, and world-class coaching.</p>
        <div className="text-slate-600 text-sm">
          &copy; 2026 FitnessPlus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
