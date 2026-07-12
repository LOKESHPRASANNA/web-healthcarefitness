import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Apple, Dumbbell, CalendarCheck, 
  CreditCard, Medal, Activity, MessageSquare, 
  CalendarDays, Users, User, Settings, ShieldAlert, Scan, Building2, Briefcase, Store, PenTool, Box, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Nutrition', path: '/nutrition', icon: Apple },
  { name: 'Workouts', path: '/workouts', icon: Dumbbell },
  { name: 'Progress', path: '/progress', icon: Activity },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { name: 'Schedule', path: '/schedule', icon: CalendarDays },
  { name: 'Membership', path: '/membership', icon: Medal },
  { name: 'Payments', path: '/payments', icon: CreditCard },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'AI Coach', path: '/ai-coach', icon: MessageSquare },
  { name: 'AI Health Twin', path: '/ai-health-twin', icon: Activity },
  { name: 'AI Fitness Score', path: '/ai-fitness-score', icon: Medal },
  { name: 'AI Vision', path: '/ai-vision', icon: Scan },
  { name: '3D Anatomy', path: '/anatomy', icon: Box },
  { name: 'Exercise Library', path: '/exercises', icon: Layers },
  { name: 'Marketplace', path: '/marketplace', icon: Store },
  { name: 'Creator Studio', path: '/creator', icon: PenTool },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Business KPIs', path: '/admin/business', icon: ShieldAlert },
  { name: 'Branches', path: '/admin/branches', icon: Building2 },
  { name: 'Employees', path: '/admin/employees', icon: Briefcase },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/10 flex flex-col z-40 bg-slate-900/80 backdrop-blur-2xl">
      <div className="p-6">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-8">
          <Activity className="text-accent" size={28} strokeWidth={2.5} />
          <span>Fitness<span className="text-accent">Plus</span></span>
        </div>

        <nav className="flex flex-col gap-1.5 overflow-y-auto h-[calc(100vh-120px)] pb-20 pr-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-semibold text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
