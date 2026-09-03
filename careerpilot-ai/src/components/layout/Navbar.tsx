import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bot, Mic, RotateCcw, Compass, LogIn, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openInterviewModal,
    resetToDemo,
    isAuthenticated,
    openAuthModal,
    readinessScore,
    user,
    theme,
    toggleTheme
  } = useApp();

  const getTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Executive Career Dashboard';
      case 'careers':
        return 'Career Explorer & Matching Hub';
      case 'assessment':
        return 'Diagnostic & Skills Assessment Center';
      case 'learn':
        return 'Milestone Roadmap & Course Modules';
      case 'interview':
        return 'AI Mock Interview Studio';
      case 'resume':
        return 'AI Resume & ATS Optimizer';
      case 'market':
        return 'Industry Salary & Market Trends (2026)';
      case 'mentors':
        return 'Alumni & Elite Mentorship Network';
      case 'coach':
        return 'AI Career Pilot 24/7 Coach';
      case 'profile':
        return 'Profile, Skills Ledger & Pro Settings';
      default:
        return 'CareerPilot AI';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#2b2639] px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Section Title / Mobile Logo */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7b9cff] via-[#5f7afc] to-[#52ddc2] flex items-center justify-center text-white font-black text-sm shadow-sm">
            C
          </div>
          <span className="font-bold text-base tracking-[-0.04em] text-slate-900">
            CareerPilot
            <span className="ml-1 bg-gradient-to-r from-[#4fd5ff] via-[#7d8fff] to-[#53ddb2] bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg font-extrabold text-[#12212b]">{getTitle()}</h1>
          <p className="text-xs text-[#66757f] font-medium">Your career workspace</p>
        </div>
      </div>

      {/* Right: Hackathon Quick Actions - High Density style */}
      <div className="flex items-center gap-3">
        {/* Readiness Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f5f7f8] border border-[#dce4e7] text-xs text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-500 font-medium">Readiness:</span>
          <span className="font-bold text-indigo-600">{readinessScore?.overall || 72}/100</span>
          <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">(+8%)</span>
        </div>

        {/* Quick Mock Interview Button */}
        <button
          onClick={() => setActiveTab('interview')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Mic className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mock Interview Studio</span>
          <span className="sm:hidden">Studio</span>
        </button>

        {/* AI Coach Quick Nav */}
        {activeTab !== 'coach' && (
          <button
            onClick={() => setActiveTab('coach')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f5f7f8] hover:bg-[#e8f0f1] text-[#12212b] text-xs font-semibold border border-[#dce4e7] transition"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Ask AI Coach</span>
          </button>
        )}

        {/* User Pill Badge (Theme layout) */}
        <div
          onClick={() => setActiveTab('profile')}
          className="hidden sm:flex bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 items-center gap-2.5 cursor-pointer hover:border-slate-300 transition"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
            {user?.name ? user.name[0] : '?'}
          </div>
          <span className="font-medium text-xs text-slate-800">{user?.name || 'Your profile'}</span>
        </div>

        {/* Upgrade Pro / Action Button */}
        <button
          onClick={() => setActiveTab('resume')}
          className="bg-[#2457d6] hover:bg-[#1d46ad] text-white px-3.5 py-2 rounded-xl font-medium text-xs shadow-sm transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Resume ATS</span>
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={resetToDemo}
          title="Reset demo profile"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition border border-slate-200"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition border border-slate-200"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {!isAuthenticated && (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
