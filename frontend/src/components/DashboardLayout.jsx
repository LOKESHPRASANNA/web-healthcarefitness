import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceAssistant from './VoiceAssistant';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex bg-surface-50">
      <Sidebar />
      <main className="flex-1 ml-64 relative z-10 p-10 h-screen overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
      <VoiceAssistant />
    </div>
  );
}
