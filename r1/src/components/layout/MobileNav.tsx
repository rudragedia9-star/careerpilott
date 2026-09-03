import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { Home, Bot, Compass, FileText, Brain, Video, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'careers', label: 'Careers', icon: Compass },
    { id: 'assessment', label: 'Diagnostic', icon: Brain },
    { id: 'interview', label: 'Interview', icon: Video },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'coach', label: 'Coach', icon: Bot },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-1 py-1.5 flex items-center justify-around shadow-lg shadow-slate-900/10">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 min-h-[44px] rounded-lg transition-colors ${
              isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 scale-110' : 'text-slate-400'}`} />
            <span className="text-[9px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

