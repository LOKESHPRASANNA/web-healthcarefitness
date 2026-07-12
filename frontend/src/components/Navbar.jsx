import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isHome ? 'bg-transparent py-6' : 'glass-panel py-4 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Activity className="text-accent" size={28} strokeWidth={2.5} />
          <span className="text-primary-dark ">Fitness<span className="text-accent">Plus</span></span>
        </Link>
        <div className="hidden md:flex gap-8 items-center font-medium text-sm text-secondary dark:text-slate-300">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <a href="/#features" className="hover:text-accent transition-colors">Training</a>
          <Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <span className="text-primary  font-semibold">Hi, {user.fullName || user.username}</span>
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 bg-slate-200  text-primary  rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2.5 bg-[#F8FAFD] dark:bg-white text-slate-800 dark:text-primary-dark rounded-full hover:scale-105 transition-transform font-semibold shadow-premium">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
