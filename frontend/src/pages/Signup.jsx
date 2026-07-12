import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        navigate('/login', { state: { message: 'Registration successful! Please sign in.' } });
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-primary-light dark:bg-primary-dark overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md card p-8 my-8"
        >
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">Create Account</h2>
          <p className="text-secondary dark:text-slate-400 mb-6">Join the world's most advanced fitness platform.</p>
          
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-secondary dark:text-slate-300 mb-1.5">Full Name</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary dark:text-white" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary dark:text-slate-300 mb-1.5">Username</label>
              <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary dark:text-white" 
                placeholder="johndoe99" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary dark:text-slate-300 mb-1.5">Email</label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary dark:text-white" 
                placeholder="john@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary dark:text-slate-300 mb-1.5">Password</label>
              <input 
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary dark:text-white" 
                placeholder="Create a strong password" 
              />
            </div>

            <button disabled={loading} type="submit" className="w-full py-3.5 mt-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-secondary dark:text-slate-400 text-sm">
            Already have an account? <Link to="/login" className="text-accent hover:text-accent-dark font-semibold transition-colors">Sign in here</Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-primary-dark overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574680096145-d05b474e2155-d25dfeac3438?q=80&w=1470&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-primary-dark/60"></div>
        </div>
        <div className="relative z-10 p-12 flex flex-col justify-end h-full w-full">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white max-w-lg leading-tight"
          >
            "Your body can stand almost anything. It's your mind that you have to convince."
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 mt-4 text-lg"
          >
            Start your transformation today.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
