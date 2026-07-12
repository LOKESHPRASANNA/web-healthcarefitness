import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Bell, Clock, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetch(`/api/notifications/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setNotifications(data);
          }
        })
        .catch(err => console.error("Failed to load notifications:", err));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {}
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/#programs' },
    { name: 'Nutrition', path: '/#nutrition' },
    { name: 'Membership', path: '/#membership' },
    { name: 'Trainers', path: '/#trainers' },
    { name: 'AI Coach', path: '/#ai-coach' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass-panel shadow-sm bg-white/80' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight z-50">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-glow">
              <Activity size={24} strokeWidth={2.5} />
            </div>
            <span className="text-surface-900">Fitness<span className="text-accent">Plus</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-surface-600">
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.path} className="hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-6">
                {/* Notification Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifs(!showNotifs)} 
                    className="relative text-surface-600 hover:text-accent transition-colors p-2 rounded-full hover:bg-surface-100"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
                    )}
                  </button>
                  
                  {showNotifs && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-surface-200 shadow-2xl rounded-2xl overflow-hidden z-50">
                      <div className="p-4 border-b border-surface-200 bg-surface-50 flex justify-between items-center">
                        <h4 className="font-bold text-surface-900">Notifications</h4>
                        <span className="text-xs bg-accent text-white px-2 py-1 rounded-full font-bold">{unreadCount} New</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-surface-500 text-sm">No notifications yet.</div>
                        ) : (
                          notifications.map(n => (
                            <div key={n.id} className={`p-4 border-b border-surface-100 hover:bg-surface-50 transition-colors cursor-pointer ${!n.isRead ? 'bg-accent/5' : ''}`} onClick={() => !n.isRead && markAsRead(n.id)}>
                              <div className="flex justify-between items-start mb-1">
                                <h5 className={`text-sm ${!n.isRead ? 'font-bold text-surface-900' : 'font-medium text-surface-700'}`}>{n.title}</h5>
                                {!n.isRead && <span className="w-2 h-2 rounded-full bg-accent mt-1.5"></span>}
                              </div>
                              <p className="text-xs text-surface-500 leading-relaxed mb-2">{n.message}</p>
                              <div className="flex items-center gap-1 text-[10px] text-surface-400 font-medium">
                                <Clock size={12} /> {new Date(n.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/dashboard" className="font-semibold text-surface-800 hover:text-accent transition-colors">
                  Dashboard
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-surface-100 text-surface-800 rounded-full hover:bg-surface-200 transition-colors font-semibold border border-surface-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-2.5 text-surface-800 font-semibold hover:text-accent transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2.5 bg-accent text-white rounded-full hover:bg-accent-dark transition-colors font-semibold shadow-premium hover:shadow-glow"
                >
                  Start Free Trial
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-surface-800 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-surface-200 shadow-xl py-6 px-6 flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-surface-800 py-2 border-b border-surface-100">
                {link.name}
              </a>
            ))}
            {!user ? (
              <div className="flex flex-col gap-3 mt-4">
                <button onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }} className="btn-secondary w-full">Log In</button>
                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }} className="btn-primary w-full">Start Free Trial</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center">Go to Dashboard</Link>
                <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="btn-secondary w-full">Sign Out</button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
