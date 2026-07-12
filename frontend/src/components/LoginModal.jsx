import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  if (!isOpen) return null;

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
        onClose();
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
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-surface-900/60 backdrop-blur-sm"
        ></motion.div>

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none"></div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-surface-500 hover:text-surface-800 hover:bg-surface-100 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="mb-8 text-center relative z-10">
            <h2 className="font-display text-3xl font-bold text-surface-900 mb-2">Welcome Back</h2>
            <p className="text-surface-500">Sign in to continue to your fitness journey.</p>
          </div>
          
          {error && (
            <div className="bg-danger-light/50 border border-danger/30 text-danger-800 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            <div className="relative group">
              <input 
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                id="modal-usernameOrEmail"
                className="w-full bg-surface-50/50 border border-surface-200 rounded-xl px-4 pt-6 pb-2 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 peer"
                placeholder=" " 
              />
              <label 
                htmlFor="modal-usernameOrEmail"
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
                id="modal-password"
                className="w-full bg-surface-50/50 border border-surface-200 rounded-xl px-4 pt-6 pb-2 pr-12 text-surface-800 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 peer"
                placeholder=" " 
              />
              <label 
                htmlFor="modal-password"
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
            
            <div className="flex justify-between items-center text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-accent focus:ring-accent/20 transition-colors" />
                <span className="text-surface-600 font-medium group-hover:text-surface-800 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-accent hover:text-accent-dark font-semibold transition-colors">Forgot password?</a>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-accent to-accent-light text-white rounded-xl py-3.5 font-semibold shadow-premium hover:shadow-premium-hover hover:scale-[1.02] transition-all duration-300 mt-2">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-surface-200"></div>
              <span className="flex-shrink-0 mx-4 text-surface-400 text-sm font-medium">Or</span>
              <div className="flex-grow border-t border-surface-200"></div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors font-medium text-surface-700 bg-white shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
          <p className="text-center mt-6 text-surface-500 text-sm font-medium relative z-10">
            Don't have an account? 
            <button onClick={() => { onClose(); navigate('/signup'); }} className="text-accent hover:text-accent-dark font-bold transition-colors ml-1">
              Create one
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
