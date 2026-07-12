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
        login(data.user, data.token);
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
    <div className="min-h-screen flex bg-surface-50">
      {/* Left side - Full Bleed Editorial Image */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-blend-multiply"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop")' }}
        >
          {/* Subtle warm gradient overlay to ensure text legibility while keeping image rich */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-surface-900/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-16 flex flex-col justify-end h-full w-full">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold text-white max-w-lg leading-[1.1]"
          >
            "The only bad workout is the one that didn't happen."
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-surface-200 mt-6 text-lg font-medium tracking-wide"
          >
            Join millions pushing their limits daily.
          </motion.p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="font-display text-4xl font-bold text-surface-900 mb-3">Welcome Back</h2>
            <p className="text-surface-500 text-lg">Please enter your details to sign in.</p>
          </div>
          
          {successMessage && (
            <div className="bg-success-light/30 border border-success/30 text-success-800 px-4 py-3 rounded-xl mb-8 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="bg-danger-light/30 border border-danger/30 text-danger-800 px-4 py-3 rounded-xl mb-8 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Email or Username</label>
              <input 
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                className="input-base" 
                placeholder="Enter your email or username" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Password</label>
              <input 
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-base" 
                placeholder="Enter your password" 
              />
            </div>
            
            <div className="flex justify-between items-center text-sm pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-accent focus:ring-accent/20 transition-colors" />
                <span className="text-surface-600 font-medium group-hover:text-surface-800 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-accent hover:text-accent-dark font-semibold transition-colors">Forgot password?</a>
            </div>

            <button disabled={loading} type="submit" className="btn-primary w-full mt-4 text-base py-4">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center mt-10 text-surface-500 font-medium">
            Don't have an account? <Link to="/signup" className="text-accent hover:text-accent-dark font-bold transition-colors ml-1">Sign up for free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
