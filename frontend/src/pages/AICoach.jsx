import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Send, Zap, Dumbbell, Apple, Moon, Heart, TrendingUp,
  RotateCcw, Sparkles, User, ChevronRight, Target, Flame, Clock, Star,
  CheckCircle2, MessageSquare, Activity, Award
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const QUICK_PROMPTS = [
  { icon: Dumbbell, label: 'Create a workout plan', color: 'text-blue-500', bg: 'bg-blue-500/10', prompt: 'Create a personalized 5-day workout plan for me based on muscle building.' },
  { icon: Apple, label: 'Suggest a meal plan', color: 'text-green-500', bg: 'bg-green-500/10', prompt: 'Suggest a high-protein meal plan for muscle gain for the week.' },
  { icon: TrendingUp, label: 'Track my progress', color: 'text-purple-500', bg: 'bg-purple-500/10', prompt: 'How do I track my fitness progress effectively? Give me a strategy.' },
  { icon: Moon, label: 'Recovery tips', color: 'text-indigo-500', bg: 'bg-indigo-500/10', prompt: 'What are the best recovery strategies after intense workouts?' },
  { icon: Flame, label: 'Fat loss strategy', color: 'text-orange-500', bg: 'bg-orange-500/10', prompt: 'Give me a proven fat loss strategy combining diet and exercise.' },
  { icon: Heart, label: 'Cardio advice', color: 'text-red-500', bg: 'bg-red-500/10', prompt: 'What is the best cardio routine for improving cardiovascular health?' },
];

const AI_RESPONSES = {
  default: [
    "Great question! Based on your fitness profile, I recommend focusing on compound movements like squats, deadlifts, and bench press 3-4x per week. Combine this with 150g+ of protein daily for optimal muscle growth.",
    "That's a smart approach! For the best results, make sure you're progressively overloading your workouts each week — increase weight or reps by at least 5% every 2 weeks.",
    "Excellent choice! Recovery is just as important as training. Aim for 7-9 hours of sleep, stay hydrated with 3-4L of water daily, and consider active recovery sessions on rest days.",
    "I've analyzed your request. Here's what I recommend: Start with 3 full-body workouts per week, track your macros (protein: 2g/kg bodyweight), and monitor your energy levels throughout the day.",
  ],
  workout: "Here's your personalized 5-Day Workout Plan:\n\n💪 **Day 1 – Chest & Triceps**\n• Bench Press: 4×8-10\n• Incline Dumbbell Press: 3×12\n• Cable Flyes: 3×15\n• Tricep Pushdown: 3×12\n\n🦵 **Day 2 – Legs**\n• Squats: 4×8-10\n• Leg Press: 3×12\n• Romanian Deadlift: 3×10\n• Leg Curls: 3×12\n\n🏋️ **Day 3 – Back & Biceps**\n• Deadlifts: 4×6-8\n• Pull-ups: 3×10\n• Barbell Rows: 3×10\n• Bicep Curls: 3×12\n\n🎯 **Day 4 – Shoulders**\n• Overhead Press: 4×8-10\n• Lateral Raises: 3×15\n• Face Pulls: 3×15\n\n🔥 **Day 5 – Full Body HIIT**\n• 30-min circuit training\n• Box jumps, burpees, kettlebell swings",
  meal: "Here's your High-Protein Weekly Meal Plan:\n\n🌅 **Breakfast (400-500 kcal)**\n• 4 scrambled eggs with spinach\n• Oatmeal with banana and almond butter\n• Greek yogurt with berries\n\n🌞 **Lunch (500-600 kcal)**\n• 200g grilled chicken breast\n• Brown rice (1 cup)\n• Steamed broccoli\n• Olive oil dressing\n\n🌆 **Dinner (500-600 kcal)**\n• Salmon fillet (200g)\n• Sweet potato\n• Mixed vegetables\n\n🥤 **Macros Target:**\n• Protein: 180-200g\n• Carbs: 250-300g\n• Fat: 60-80g",
  fat: "**Proven Fat Loss Strategy:**\n\n🔥 **Caloric Deficit**\nAim for a 300-500 calorie deficit daily. Use a TDEE calculator to find your maintenance calories.\n\n💪 **Strength Training (4x/week)**\nMuscle burns calories 24/7 — prioritize lifting over pure cardio.\n\n🏃 **Cardio (3x/week)**\n• 2 sessions: 30-min LISS (walking, cycling)\n• 1 session: 20-min HIIT\n\n🥗 **Nutrition**\n• High protein (1.8-2g per kg)\n• Whole foods focus\n• Limit processed sugars\n\n😴 **Sleep & Stress**\n7-9 hours sleep. Cortisol from stress causes fat retention — manage it!",
};

function getAIResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('workout') || msg.includes('plan') || msg.includes('exercise')) return AI_RESPONSES.workout;
  if (msg.includes('meal') || msg.includes('food') || msg.includes('diet') || msg.includes('nutrition') || msg.includes('eat')) return AI_RESPONSES.meal;
  if (msg.includes('fat') || msg.includes('weight loss') || msg.includes('lose')) return AI_RESPONSES.fat;
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

const STATS = [
  { label: 'Workouts Advised', value: '128', icon: Dumbbell, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Avg. Response', value: '0.8s', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { label: 'Goals Achieved', value: '94%', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Coach Rating', value: '4.9★', icon: Star, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const TODAY_PLAN = [
  { time: '07:00', task: 'Morning stretch — 10 min mobility', done: true, icon: Activity },
  { time: '09:00', task: 'Upper body strength session', done: true, icon: Dumbbell },
  { time: '13:00', task: 'High-protein lunch (chicken + rice)', done: false, icon: Apple },
  { time: '17:00', task: '30-min cardio walk', done: false, icon: Flame },
  { time: '21:00', task: 'Protein shake + recovery stretch', done: false, icon: Moon },
];

function formatResponse(text) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-surface-900 mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
    }
    if (line.startsWith('•')) {
      return <p key={i} className="text-surface-700 ml-2">• {line.slice(1)}</p>;
    }
    if (line.startsWith('#')) {
      return <p key={i} className="font-semibold text-surface-800 mt-2">{line.replace(/#/g, '').trim()}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return <p key={i} className="text-surface-700">{line}</p>;
  });
}

export default function AICoach() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Hey ${user?.full_name?.split(' ')[0] || 'Champion'}! 👋 I'm your personal AI Fitness Coach. I can help you with workout plans, nutrition advice, recovery strategies, and anything fitness-related.\n\nWhat would you like to work on today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [todayPlan, setTodayPlan] = useState(TODAY_PLAN);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMessage = {
      role: 'user',
      content: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const aiResponse = getAIResponse(msg);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setIsTyping(false);
    }, delay);
  };

  const toggleTask = (idx) => {
    setTodayPlan(prev => prev.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  };

  const completedTasks = todayPlan.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-surface-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-glow">
            <Brain size={28} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-surface-900">AI Coach</h1>
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
              Online · Powered by FitnessPlus AI
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-surface-200 shadow-premium p-4 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-surface-900">{stat.value}</p>
              <p className="text-xs text-surface-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white rounded-3xl border border-surface-200 shadow-premium flex flex-col overflow-hidden"
          style={{ height: '620px' }}
        >
          {/* Chat Header */}
          <div className="p-5 border-b border-surface-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-surface-900">FitnessPlus AI Coach</p>
              <p className="text-xs text-surface-500">Responds instantly · Personalized to you</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setMessages([{
                  role: 'ai',
                  content: `Chat cleared! Ready to help you again, ${user?.full_name?.split(' ')[0] || 'Champion'}! 💪 What's on your fitness agenda today?`,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }])}
                className="flex items-center gap-1 text-xs text-surface-500 hover:text-accent transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-100"
              >
                <RotateCcw size={12} /> Clear
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-surface-50/50">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-tr-sm'
                        : 'bg-white border border-surface-200 text-surface-800 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.role === 'ai' ? (
                        <div className="space-y-0.5">{formatResponse(msg.content)}</div>
                      ) : (
                        msg.content
                      )}
                    </div>
                    <p className="text-xs text-surface-400 px-1">{msg.time}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={14} className="text-surface-600" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                  <Brain size={14} className="text-white" />
                </div>
                <div className="bg-white border border-surface-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-accent"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-5 py-3 border-t border-surface-100 overflow-x-auto">
            <div className="flex gap-2">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p.prompt)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border border-surface-200 hover:border-accent/40 hover:bg-accent/5 transition-all ${p.color}`}
                >
                  <p.icon size={12} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-surface-100 flex gap-3 bg-white">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything about fitness, nutrition, recovery..."
              className="flex-1 bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center shadow-glow hover:bg-accent-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Panel */}
        <div className="flex flex-col gap-6">
          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-surface-200 shadow-premium p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-surface-900">Today's Plan</h3>
                <p className="text-xs text-surface-500">{completedTasks}/{todayPlan.length} completed</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award size={18} className="text-accent" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-surface-100 h-2 rounded-full mb-5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedTasks / todayPlan.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
              />
            </div>

            <div className="space-y-3">
              {todayPlan.map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  onClick={() => toggleTask(i)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    task.done ? 'bg-green-50 border border-green-100' : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    task.done ? 'bg-green-500' : 'bg-surface-100'
                  }`}>
                    {task.done
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <task.icon size={14} className="text-surface-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-tight ${task.done ? 'line-through text-surface-400' : 'text-surface-800'}`}>
                      {task.task}
                    </p>
                    <p className="text-xs text-surface-400 mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> {task.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Tip Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-accent to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/5 rounded-full" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-yellow-300" />
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">AI Tip of the Day</p>
              </div>
              <p className="text-base font-semibold leading-relaxed mb-4">
                "Progressive overload is the #1 driver of muscle growth. Increase weight by just 2.5kg each week and you'll double your strength in a year."
              </p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Brain size={14} />
                <span>FitnessPlus AI Coach</span>
              </div>
            </div>
          </motion.div>

          {/* Ask Anything Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl border border-surface-200 shadow-premium p-6"
          >
            <h3 className="font-display font-bold text-surface-900 mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-accent" />
              Popular Questions
            </h3>
            <div className="space-y-2">
              {[
                'How many calories should I eat?',
                'Best exercises for weight loss?',
                'How to build muscle fast?',
                'What to eat before workout?',
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl text-sm text-surface-700 font-medium hover:bg-accent/5 hover:text-accent border border-transparent hover:border-accent/20 transition-all group"
                >
                  <span>{q}</span>
                  <ChevronRight size={14} className="text-surface-400 group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}