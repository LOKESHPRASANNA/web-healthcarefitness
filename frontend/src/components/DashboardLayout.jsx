import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import VoiceAssistant from './VoiceAssistant';

// Background images per route
const BG_IMAGES = {
  '/dashboard':        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=60&w=1800&auto=format&fit=crop',
  '/nutrition':        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=60&w=1800&auto=format&fit=crop',
  '/workouts':         'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=60&w=1800&auto=format&fit=crop',
  '/progress':         'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=60&w=1800&auto=format&fit=crop',
  '/attendance':       'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=60&w=1800&auto=format&fit=crop',
  '/schedule':         'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=60&w=1800&auto=format&fit=crop',
  '/membership':       'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=60&w=1800&auto=format&fit=crop',
  '/payments':         'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=60&w=1800&auto=format&fit=crop',
  '/ai-coach':         'https://images.unsplash.com/photo-1485727749690-d091e8284ef3?q=60&w=1800&auto=format&fit=crop',
  '/ai-health-twin':   'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=60&w=1800&auto=format&fit=crop',
  '/ai-fitness-score': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=60&w=1800&auto=format&fit=crop',
  '/ai-vision':        'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=60&w=1800&auto=format&fit=crop',
  '/exercises':        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=60&w=1800&auto=format&fit=crop',
  '/anatomy':          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=60&w=1800&auto=format&fit=crop',
  '/community':        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=60&w=1800&auto=format&fit=crop',
  '/marketplace':      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=60&w=1800&auto=format&fit=crop',
  '/creator':          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=60&w=1800&auto=format&fit=crop',
  '/profile':          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=60&w=1800&auto=format&fit=crop',
  '/settings':         'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=60&w=1800&auto=format&fit=crop',
};

const DEFAULT_BG = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=60&w=1800&auto=format&fit=crop';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const bgImage = BG_IMAGES[location.pathname] || DEFAULT_BG;

  return (
    <div className="min-h-screen flex relative" style={{ backgroundColor: '#F8FAFC' }}>

      {/* Layer 1: Background image — clearly visible, subtle */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.12,        // 12% — clearly visible as a watermark
          pointerEvents: 'none',
        }}
      />

      {/* Layer 2: Soft white gradient overlay — preserves text/card readability */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(248,250,252,0.82) 0%, rgba(238,245,255,0.78) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Sidebar — above overlays */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <Sidebar />
      </div>

      {/* Main content — above everything */}
      <main
        className="flex-1 ml-64 p-10 h-screen overflow-y-auto"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>

      <VoiceAssistant />
    </div>
  );
}
