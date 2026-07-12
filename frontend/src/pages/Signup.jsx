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
    <div className="min-h-screen flex bg-surface-50">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md my-8"
        >
          <div className="mb-10">
            <h2 className="font-display text-4xl font-bold text-surface-900 mb-3">Create Account</h2>
            <p className="text-surface-500 text-lg">Join the world's most advanced fitness platform.</p>
          </div>
          
          {error && (
            <div className="bg-danger-light/30 border border-danger/30 text-danger-800 px-4 py-3 rounded-xl mb-8 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Full Name</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input-base" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Username</label>
              <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="input-base" 
                placeholder="johndoe99" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-2">Email</label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-base" 
                placeholder="john@example.com" 
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
                placeholder="Create a strong password" 
              />
            </div>

            <button disabled={loading} type="submit" className="btn-primary w-full mt-4 text-base py-4">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="text-center mt-10 text-surface-500 font-medium">
            Already have an account? <Link to="/login" className="text-accent hover:text-accent-dark font-bold transition-colors ml-1">Sign in here</Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Full Bleed Editorial Image */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-blend-multiply transition-transform duration-1000 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=1470&auto=format&fit=crop")' }}
        >
          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-16 flex flex-col justify-end h-full w-full">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold text-white max-w-lg leading-[1.1]"
          >
            "Surround yourself with those who challenge you, push you, and inspire you."
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-surface-200 mt-6 text-lg font-medium tracking-wide flex items-center gap-2"
          >
            <span className="w-8 h-[2px] bg-accent inline-block"></span> Find your community today.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
