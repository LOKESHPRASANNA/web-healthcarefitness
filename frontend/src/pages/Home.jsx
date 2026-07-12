import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, Star, Users, Dumbbell, ArrowRight, ShieldCheck, Zap, Trophy, Heart, 
  Flame, LineChart, Brain, Clock, CalendarCheck, CreditCard, CheckCircle2, MessageSquare, Play, X
} from 'lucide-react';

const stats = [
  { label: 'Active Members', value: '50K+' },
  { label: 'Expert Trainers', value: '250+' },
  { label: 'Workouts Completed', value: '1M+' },
  { label: 'Satisfaction', value: '98%' },
];

const features = [
  { title: 'AI Personal Coach', desc: 'Real-time workout corrections and personalized guidance 24/7.', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { title: 'Smart Nutrition', desc: 'Macro tracking and meal plans generated specifically for your body.', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { title: 'Workout Tracking', desc: 'Log sets, reps, and PRs easily with our intuitive interface.', icon: Dumbbell, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { title: 'Progress Reports', desc: 'Visualize your journey with beautiful, detailed charts and analytics.', icon: LineChart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { title: 'Attendance Tracking', desc: 'Scan QR codes at the gym and maintain your workout streak.', icon: CalendarCheck, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { title: 'Community Support', desc: 'Join groups, share achievements, and stay motivated together.', icon: Users, color: 'text-pink-500', bg: 'bg-pink-500/10' },
];

const testimonials = [
  { name: 'Sarah Jenkins', role: 'Lost 30 lbs in 6 months', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', text: 'The AI Coach completely changed my life. It adjusts my workouts when I feel tired and pushes me when I am ready. It is like having a personal trainer in my pocket!' },
  { name: 'Marcus Chen', role: 'Marathon Runner', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', text: 'FitnessPlus helped me drop my marathon time by 15 minutes. The smart nutrition plans are spot on, and the progress tracking keeps me honest every single day.' },
  { name: 'Elena Rodriguez', role: 'Powerlifter', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', text: 'I hit a plateau for two years before joining. The personalized strength programs broke my plateau in 8 weeks. Unbelievable results and a great community.' }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-surface-50 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500&auto=format&fit=crop" 
            alt="Premium Gym Training" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-900/95 via-surface-900/80 to-surface-900/40"></div>
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent-light font-bold mb-6 backdrop-blur-md">
              <Zap size={16} className="text-warning" /> Voted #1 Fitness App 2026
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Transform Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-purple-400">Body With AI.</span>
            </h1>
            
            <p className="text-surface-300 text-lg md:text-xl max-w-lg leading-relaxed mb-10">
              The world's most advanced commercial fitness platform. Personalized workouts, dynamic nutrition, and 24/7 AI coaching—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/signup')} className="btn-primary py-4 px-8 text-lg font-bold shadow-glow hover:shadow-glow flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight size={20} />
              </button>
              <button className="py-4 px-8 text-lg font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2">
                <Play size={20} /> Explore Programs
              </button>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="font-display text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-surface-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Floating Cards */}
          <div className="hidden lg:block relative h-[600px] w-full">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-64 glass-panel p-5 rounded-2xl bg-white/10 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400"><Flame size={24}/></div>
                <div>
                  <p className="text-surface-300 text-xs font-bold uppercase tracking-wider">Calories Burned</p>
                  <p className="font-display text-2xl font-bold text-white">842 kcal</p>
                </div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-300 w-[75%] h-full rounded-full"></div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 left-10 w-72 glass-panel p-5 rounded-2xl bg-white/10 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent-light"><Brain size={24}/></div>
                <div>
                  <p className="text-surface-300 text-xs font-bold uppercase tracking-wider">AI Coach Insight</p>
                  <p className="font-display text-lg font-bold text-white">Perfect Form!</p>
                </div>
              </div>
              <p className="text-sm text-surface-300">Your back is perfectly straight. Keep pushing through the last 2 reps!</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-0 w-48 glass-panel p-5 rounded-2xl bg-white/10 border border-white/20 shadow-2xl text-center"
            >
              <Heart size={32} className="text-danger mx-auto mb-2" fill="currentColor" />
              <p className="font-display text-3xl font-bold text-white mb-1">145</p>
              <p className="text-surface-300 text-xs font-bold uppercase tracking-wider">BPM</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="py-24 bg-white" id="programs">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-surface-900 mb-6">Why Choose Fitness<span className="text-accent">Plus</span>?</h2>
            <p className="text-surface-500 text-lg">We combine elite coaching methodology with state-of-the-art Artificial Intelligence to deliver results you never thought possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Personalized AI Plans', desc: 'Workouts that adapt instantly based on your performance, fatigue levels, and goals.' },
              { icon: Star, title: 'Expert Trainers', desc: 'Programs designed by Olympic-level coaches and verified by sports scientists.' },
              { icon: Flame, title: 'Healthy Diet Plans', desc: 'Dynamic meal recommendations that match your exact macronutrient needs.' },
              { icon: LineChart, title: 'Real-Time Progress', desc: 'Track every pound lifted, mile run, and calorie burned with absolute precision.' },
              { icon: ShieldCheck, title: '24/7 AI Coach', desc: 'Get instant answers to fitness queries, form checks, and motivation at 3 AM.' },
              { icon: Users, title: 'Community Support', desc: 'Train with thousands of like-minded individuals pushing each other to greatness.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-50 rounded-2xl p-8 border border-surface-200 hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-surface-900 mb-3">{item.title}</h3>
                <p className="text-surface-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREMIUM FEATURES */}
      <section className="py-24 bg-surface-50 border-t border-surface-200" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-surface-900 mb-6">Everything You Need. <br/>In One Ecosystem.</h2>
              <p className="text-surface-500 text-lg">Stop juggling 5 different apps for your workouts, macros, and sleep. We integrated it all beautifully into one premium experience.</p>
            </div>
            <button onClick={() => navigate('/signup')} className="btn-primary whitespace-nowrap">Explore All Features</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-surface-200 hover:shadow-premium hover:border-accent/30 transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${feat.bg} ${feat.color}`}>
                  <feat.icon size={24} />
                </div>
                <h4 className="font-bold text-surface-900 mb-2">{feat.title}</h4>
                <p className="text-sm text-surface-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES */}
      <section className="py-24 bg-surface-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-dark/40 via-surface-900 to-surface-900"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6">Real People. Real Results.</h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">Join the 1M+ members who have completely transformed their lives using our platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface-800 rounded-3xl p-8 border border-surface-700 relative"
              >
                <div className="flex text-warning mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-surface-300 text-lg italic mb-8 leading-relaxed">"{test.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={test.img} alt={test.name} className="w-12 h-12 rounded-full object-cover border-2 border-accent" />
                  <div>
                    <h5 className="font-bold text-white">{test.name}</h5>
                    <p className="text-sm text-accent-light">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEMBERSHIP / PRICING */}
      <section className="py-24 bg-white" id="membership">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-surface-900 mb-6">Choose Your Journey</h2>
            <p className="text-surface-500 text-lg max-w-2xl mx-auto">Simple, transparent pricing. Cancel anytime. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Basic */}
            <div className="bg-surface-50 rounded-3xl p-8 border border-surface-200">
              <h3 className="font-display text-2xl font-bold text-surface-900 mb-2">Basic</h3>
              <p className="text-surface-500 text-sm mb-6">For casual gym-goers.</p>
              <div className="mb-8"><span className="text-4xl font-extrabold text-surface-900">$9.99</span><span className="text-surface-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Access to Library', 'Basic Workout Tracking', 'Community Forum'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-surface-600"><CheckCircle2 size={18} className="text-accent" /> {f}</li>
                ))}
                {['AI Personal Coach', 'Smart Nutrition', 'Analytics'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-surface-400 opacity-50"><X size={18} /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-surface-200 text-surface-800 font-bold hover:bg-surface-100 transition-colors">Start Basic</button>
            </div>

            {/* Pro */}
            <div className="bg-surface-900 rounded-3xl p-8 border border-accent shadow-2xl shadow-accent/20 relative transform md:scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-surface-400 text-sm mb-6">For serious athletes.</p>
              <div className="mb-8"><span className="text-5xl font-extrabold text-white">$19.99</span><span className="text-surface-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Everything in Basic', 'AI Personal Coach', 'Smart Nutrition', 'Advanced Analytics'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-surface-200"><CheckCircle2 size={18} className="text-accent-light" /> {f}</li>
                ))}
              </ul>
              <button onClick={() => navigate('/signup')} className="w-full py-4 rounded-xl bg-accent text-white font-bold shadow-glow hover:bg-accent-light transition-colors">Start 14-Day Free Trial</button>
            </div>

            {/* Elite */}
            <div className="bg-surface-50 rounded-3xl p-8 border border-surface-200">
              <h3 className="font-display text-2xl font-bold text-surface-900 mb-2">Elite</h3>
              <p className="text-surface-500 text-sm mb-6">For competitive lifters.</p>
              <div className="mb-8"><span className="text-4xl font-extrabold text-surface-900">$39.99</span><span className="text-surface-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Everything in Pro', '1-on-1 Human Coach', 'Live Video Form Checks', 'Priority Support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-surface-600"><CheckCircle2 size={18} className="text-accent" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-surface-200 text-surface-800 font-bold hover:bg-surface-100 transition-colors">Start Elite</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-surface-900 text-surface-400 py-16 border-t border-surface-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight mb-6">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                <Activity size={20} strokeWidth={2.5} />
              </div>
              <span className="text-white">Fitness<span className="text-accent">Plus</span></span>
            </Link>
            <p className="text-surface-400 leading-relaxed max-w-sm mb-6">
              The world's leading AI-powered fitness ecosystem. Transforming lives through technology and sweat.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'YouTube', 'TikTok'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Product</h4>
            <ul className="space-y-4">
              {['Features', 'AI Coach', 'Pricing', 'Testimonials', 'Download App'].map(link => (
                <li key={link}><a href="#" className="hover:text-accent-light transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map(link => (
                <li key={link}><a href="#" className="hover:text-accent-light transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 FitnessPlus. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm">
            <span>Made with <Heart size={14} className="text-danger inline" fill="currentColor"/> for fitness lovers.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
