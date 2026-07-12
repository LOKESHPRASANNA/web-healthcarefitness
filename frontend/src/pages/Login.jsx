import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Star, ShieldCheck } from 'lucide-react';

const quotes = [
  { text: "The only bad workout is the one that didn't happen.", author: "Daily Motivation" },
  { text: "Push harder than yesterday if you want a different tomorrow.", author: "FitnessPlus Pro" },
  { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Elite Training" }
];

export default function Login() {
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const successMessage = location.state?.message;

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
          className="absolute inset-0 bg-cover bg-center bg-blend-multiply transition-transform duration-1000 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop")' }}
        >
          {/* Subtle warm gradient overlay to ensure text legibility while keeping image rich */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-16 flex flex-col justify-end h-full w-full">
          <div className="min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="font-display text-4xl md:text-5xl font-bold text-white max-w-lg leading-[1.1]">
                  "{quotes[quoteIndex].text}"
                </blockquote>
                <p className="text-surface-300 mt-6 text-lg font-medium tracking-wide flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-accent inline-block"></span> {quotes[quoteIndex].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
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
            <div className="relative group">
              <input 
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                id="usernameOrEmail"
                className="input-base peer pt-6 pb-2" 
                placeholder=" " 
              />
              <label 
                htmlFor="usernameOrEmail"
                className="absolute text-sm text-surface-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent cursor-text"
              >
                Email or Username
              </label>
            </div>

            <div className="relative group">
              <input 
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                id="password"
                className="input-base peer pt-6 pb-2 pr-12" 
                placeholder=" " 
              />
              <label 
                htmlFor="password"
                className="absolute text-sm text-surface-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent cursor-text"
              >
                Password
              </label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center text-sm pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-accent focus:ring-accent/20 transition-colors" />
                <span className="text-surface-600 font-medium group-hover:text-surface-800 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-accent hover:text-accent-dark font-semibold transition-colors">Forgot password?</a>
            </div>

            <button disabled={loading} type="submit" className="btn-primary w-full mt-4 text-base py-4 hover:shadow-premium-hover transition-shadow relative overflow-hidden group">
              <span className="relative z-10">{loading ? 'Signing In...' : 'Sign In'}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </form>

          {/* Social Login Stubs */}
          <div className="mt-8">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-surface-200"></div>
              <span className="flex-shrink-0 mx-4 text-surface-400 text-sm font-medium">Or continue with</span>
              <div className="flex-grow border-t border-surface-200"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors font-medium text-surface-700 bg-white shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors font-medium text-surface-700 bg-white shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.97 3.67 2.15-3.23 1.96-2.67 6.01.44 7.22-.72 1.4-1.57 2.64-2.76 3.64zm-3.34-14.2c.67-1.74-.29-3.78-2.24-4.08-.82 1.83.47 3.84 2.24 4.08z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>
          
          <p className="text-center mt-8 text-surface-500 font-medium">
            Don't have an account? <Link to="/signup" className="text-accent hover:text-accent-dark font-bold transition-colors ml-1">Sign up for free</Link>
          </p>

          {/* Trust Strip */}
          <div className="mt-12 flex justify-center items-center gap-6 text-surface-400">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <ShieldCheck size={16} className="text-success" />
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Star size={16} className="text-orange-400 fill-orange-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
