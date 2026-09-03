import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  Home,
  Bot,
  Compass,
  BookOpen,
  User,
  Sparkles,
  RotateCcw,
  Target,
  ArrowUpRight,
  FileText,
  TrendingUp,
  Brain,
  Video,
  Users
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    careerGoal,
    readinessScore,
    user,
    resetToDemo,
  } = useApp();

  const coreNav: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'careers', label: 'Career Explorer', icon: Compass },
    { id: 'assessment', label: 'Diagnostic Tests', icon: Brain, badge: 'New' },
    { id: 'learn', label: 'Learning Roadmap', icon: BookOpen },
  ];

  const premiumStudio: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'interview', label: 'Interview Studio', icon: Video, badge: 'Live' },
    { id: 'resume', label: 'AI Resume & ATS', icon: FileText, badge: 'Pro' },
    { id: 'market', label: 'Salary & Trends', icon: TrendingUp, badge: '2026' },
    { id: 'mentors', label: 'Elite Mentors', icon: Users, badge: '1:1' },
    { id: 'coach', label: 'AI Career Coach', icon: Bot, badge: '24/7' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 bg-[#0d0b14] flex-shrink-0 text-white h-screen sticky top-0 select-none z-30 border-r border-[#2b2639]">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7b9cff] via-[#5f7afc] to-[#52ddc2] flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-900/30">
          C
        </div>
        <div>
          <span className="font-bold text-base tracking-[-0.04em] text-white">
            CareerPilot
            <span className="ml-1 bg-gradient-to-r from-[#7ae8ff] via-[#8ea7ff] to-[#8fe8c8] bg-clip-text text-transparent font-black">
              AI
            </span>
          </span>
          <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
            Executive Pro Engine
          </p>
        </div>
      </div>

      {/* Target Goal Micro-Widget */}
      <div className="mx-3 mt-3 p-3 rounded-xl bg-[#17323a] border border-[#294952]">
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-1">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Target className="w-3.5 h-3.5" />
            Target Goal
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
            {careerGoal?.match_score || 91}% Match
          </span>
        </div>
        <p className="text-xs font-bold text-white truncate">
          {careerGoal?.career_title || 'Software Engineer'}
        </p>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>Readiness:</span>
          <span className="font-bold text-indigo-400">{readinessScore?.overall || 72}/100</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {/* Core Group */}
        <div className="space-y-1">
          <p className="px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Core Hub
          </p>
          {coreNav.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#17323a]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Premium Studio Group */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-0.5">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
              Career Prep Studio
            </span>
            <span className="px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[8px] font-black">
              PRO
            </span>
          </div>
          {premiumStudio.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#17323a]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Live'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-slate-800 text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Profile Item */}
        <div className="space-y-1 pt-1">
          <p className="px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Settings
          </p>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-white' : 'text-slate-400'}`} />
              <span>Profile & Skills Ledger</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Trial Plan / AI Credits Widget */}
      <div className="p-3 bg-slate-800/50 mx-3 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pro Tier Active</p>
          <span className="text-[10px] text-emerald-400 font-bold">Unlimited</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full mb-2 overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full w-4/5" />
        </div>
        <p className="text-[10px] text-slate-400">All 5 Studios Unlocked</p>
      </div>

      {/* Hackathon Demo Reset Control & User Profile Card */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          onClick={resetToDemo}
          title="Reset demo profile"
          className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-xs font-medium text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition border border-transparent hover:border-slate-700"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo Profile</span>
        </button>

        <div
          onClick={() => setActiveTab('profile')}
          className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 transition cursor-pointer border border-slate-700/60 flex items-center gap-2.5"
        >
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
            alt="User avatar"
            className="w-7 h-7 rounded-lg object-cover border border-indigo-500/40"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Your profile'}</p>
            <p className="text-[9px] text-slate-400 truncate">{user?.current_class || '12th Grade / CS'}</p>
          </div>
          <div className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
            Pro
          </div>
        </div>
      </div>
    </aside>
  );
};

