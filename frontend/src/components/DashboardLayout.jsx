import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceAssistant from './VoiceAssistant';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  
  // Background configuration map
  const bgConfig = {
    '/dashboard': 'url("https://images.unsplash.com/photo-1581009146145-14e5300c3a48?q=80&w=1470&auto=format&fit=crop")',
    '/nutrition': 'url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop")',
    '/workouts': 'url("https://images.unsplash.com/photo-1574680096145-d05b474e2155-d25dfeac3438?q=80&w=1470&auto=format&fit=crop")',
    '/attendance': 'radial-gradient(circle at 50% 50%, #0F172A 0%, #1E293B 100%)', // Minimal blue glass
    '/membership': 'linear-gradient(135deg, #1E293B 0%, #4B3800 100%)', // Luxury gold gradient
    '/payments': 'linear-gradient(135deg, #0F172A 0%, #111827 100%)', // Professional finance style
    '/progress': 'url("https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop")', // Transformation
    '/community': 'url("https://images.unsplash.com/photo-1528318269466-69d95fc59aef?q=80&w=1470&auto=format&fit=crop")', // Social style
    '/ai-coach': 'linear-gradient(135deg, #0F172A 0%, #2E1065 100%)', // Purple AI Gradient
    '/settings': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', // Minimal white/gray
  };

  const currentBg = bgConfig[location.pathname] || 'url("https://images.unsplash.com/photo-1581009146145-14e5300c3a48?q=80&w=1470&auto=format&fit=crop")';
  const isDarkBg = !currentBg.includes('#F8FAFC');

  return (
    <div className={`min-h-screen flex ${isDarkBg ? 'dark' : ''}`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ background: currentBg, backgroundSize: 'cover' }}
        ></div>
        {/* Overlay to ensure readability */}
        {isDarkBg ? (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
        ) : (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
        )}
      </div>

      <Sidebar />
      
      <main className="flex-1 ml-64 relative z-10 p-8 h-screen overflow-y-auto">
        {children}
      </main>
      <VoiceAssistant />
    </div>
  );
}
