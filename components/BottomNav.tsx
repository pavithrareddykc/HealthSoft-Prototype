import React from 'react';
import { Home, Grid, Zap, Settings } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems: { id: ViewState; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={24} />, label: 'Home' },
    { id: 'rooms', icon: <Grid size={24} />, label: 'Rooms' },
    { id: 'automation', icon: <Zap size={24} />, label: 'Auto' },
    { id: 'settings', icon: <Settings size={24} />, label: 'Config' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-black text-white rounded-full shadow-[0px_8px_16px_rgba(0,0,0,0.2)] px-6 py-4 flex justify-between items-center z-40">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onChangeView(item.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            currentView === item.id ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-80'
          }`}
        >
          {item.icon}
          <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </div>
  );
};