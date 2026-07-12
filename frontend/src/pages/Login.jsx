import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const successMessage = location.state?.message;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        login(data.user);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-primary-dark overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-primary-dark/40"></div>
        </div>
        <div className="relative z-10 p-12 flex flex-col justify-end h-full w-full">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white max-w-lg leading-tight"
          >
            "The only bad workout is the one that didn't happen."
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 mt-4 text-lg"
          >
            Join millions pushing their limits daily.
          </motion.p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-primary-light dark:bg-primary-dark">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md card p-10"
        >
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">Welcome Back</h2>
          <p className="text-secondary dark:text-slate-400 mb-6">Please enter your details to sign in.</p>
          
          {successMessage && (
            <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-secondary dark:text-slate-300 mb-1.5">Email or Username</label>
              <input 
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary dark:text-white" 
                placeholder="Enter your email or username" 
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
                placeholder="Enter your password" 
              />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-accent focus:ring-accent" />
                <span className="text-secondary dark:text-slate-300">Remember me</span>
              </label>
              <a href="#" className="text-accent hover:text-accent-dark font-medium transition-colors">Forgot password?</a>
            </div>

            <button disabled={loading} type="submit" className="w-full py-3.5 mt-2 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center mt-8 text-secondary dark:text-slate-400 text-sm">
            Don't have an account? <Link to="/signup" className="text-accent hover:text-accent-dark font-semibold transition-colors">Sign up for free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
