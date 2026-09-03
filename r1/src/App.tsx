import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Dashboard } from './components/home/Dashboard';
import { AICoach } from './components/coach/AICoach';
import { CareerExplorer } from './components/careers/CareerExplorer';
import { LearningRoadmap } from './components/learn/LearningRoadmap';
import { ProfileView } from './components/profile/ProfileView';
import { ResumeATSBuilder } from './components/resume/ResumeATSBuilder';
import { AssessmentCenter } from './components/assessment/AssessmentCenter';
import { MarketTrends } from './components/market/MarketTrends';
import { MentorNetwork } from './components/mentors/MentorNetwork';
import { InterviewStudio } from './components/interview/InterviewStudio';
import { CareerDetailModal } from './components/careers/CareerDetailModal';
import { CareerCompareModal } from './components/careers/CareerCompareModal';
import { MockInterviewModal } from './components/interview/MockInterviewModal';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { ToastContainer } from './components/common/Toast';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { Sparkles, Globe, LayoutDashboard } from 'lucide-react';
import { ActiveTab } from './types';

const pathToTabMap: Record<string, ActiveTab> = {
  '/': 'home',
  '/dashboard': 'home',
  '/careers': 'careers',
  '/assessment': 'assessment',
  '/learn': 'learn',
  '/interview': 'interview',
  '/resume': 'resume',
  '/market': 'market',
  '/mentors': 'mentors',
  '/coach': 'coach',
  '/profile': 'profile'
};

const tabToPathMap: Record<ActiveTab, string> = {
  home: '/dashboard',
  careers: '/careers',
  assessment: '/assessment',
  learn: '/learn',
  interview: '/interview',
  resume: '/resume',
  market: '/market',
  mentors: '/mentors',
  coach: '/coach',
  profile: '/profile'
};

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab, isLoading, isAuthenticated, theme } = useApp();
  const [showLanding, setShowLanding] = useState(false);
  const [showLogin, setShowLogin] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/' || window.location.pathname === '/login';
  });

  // Sync initial URL on mount and handle browser back/forward buttons (Multi-page routing)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.toLowerCase();
      if (pathname === '/landing') {
        setShowLanding(true);
        setShowLogin(false);
        return;
      }
      if (pathname === '/login') {
        setShowLogin(true);
        setShowLanding(false);
        return;
      }
      setShowLogin(false);
      setShowLanding(false);
      const matchedTab = pathToTabMap[pathname];
      if (matchedTab && matchedTab !== activeTab) {
        setActiveTab(matchedTab);
      }
    };

    // On initial mount
    const pathname = window.location.pathname.toLowerCase();
    if (pathname === '/landing') {
      setShowLanding(true);
    } else if (pathname === '/') {
      setShowLogin(true);
    } else if (pathname === '/login') {
      setShowLogin(true);
    } else if (pathToTabMap[pathname]) {
      setActiveTab(pathToTabMap[pathname]);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setActiveTab('home');
    window.history.pushState(null, '', '/dashboard');
  };

  // When activeTab changes, synchronize browser URL without full page reload
  useEffect(() => {
    if (!showLanding) {
      if (showLogin) return;
      const targetPath = tabToPathMap[activeTab] || '/dashboard';
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }
  }, [activeTab, showLanding, showLogin]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && showLogin) {
      setShowLogin(false);
      setActiveTab('home');
      window.history.replaceState(null, '', '/dashboard');
    }
  }, [isLoading, isAuthenticated, showLogin, setActiveTab]);

  const handleOpenLanding = () => {
    setShowLanding(true);
    window.history.pushState(null, '', '/landing');
  };

  const handleReturnToApp = () => {
    setShowLanding(false);
    const targetPath = tabToPathMap[activeTab] || '/dashboard';
    window.history.pushState(null, '', targetPath);
  };

  if (showLanding) {
    return (
      <>
        {/* Floating Banner to Return to Live Dashboard */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleReturnToApp}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-xl shadow-indigo-900/40 hover:bg-indigo-500 transition border border-indigo-400/30 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Open Executive App ({useApp().user?.name || 'Your profile'})</span>
          </button>
        </div>
        <LandingPage onEnterApp={handleReturnToApp} />
        <AuthModal />
        <OnboardingModal />
        <ToastContainer />
      </>
    );
  }

  if (showLogin) {
    return <LoginPage onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={`premium-app theme-${theme} min-h-screen flex antialiased font-sans`}>
      {/* Desktop Sidebar (10 Pages with Core & Studio groups) - High Density Theme */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 overflow-x-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Global Demo Switcher & Landing Page Toggle Strip */}
        <div className="bg-[#0d0b14] text-slate-300 px-4 sm:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#2b2639]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="font-semibold text-white">Career workspace:</span>
            <span>Active Profile: <strong>{useApp().user?.name || 'Career Learner'}</strong> (Readiness: {useApp().readinessScore?.overall ?? 72}/100 • Goal: {useApp().careerGoal?.career_title || 'Career Target'})</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenLanding}
              className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Landing Page</span>
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Page Content Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-28 text-slate-400 space-y-3">
              <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold">Loading CareerPilot AI intelligence...</p>
            </div>
          ) : (
            <>
              {activeTab === 'home' && <Dashboard />}
              {activeTab === 'careers' && <CareerExplorer />}
              {activeTab === 'assessment' && <AssessmentCenter />}
              {activeTab === 'learn' && <LearningRoadmap />}
              {activeTab === 'interview' && <InterviewStudio />}
              {activeTab === 'resume' && <ResumeATSBuilder />}
              {activeTab === 'market' && <MarketTrends />}
              {activeTab === 'mentors' && <MentorNetwork />}
              {activeTab === 'coach' && <AICoach />}
              {activeTab === 'profile' && <ProfileView />}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals & Notifications */}
      <CareerDetailModal />
      <CareerCompareModal />
      <MockInterviewModal />
      <AuthModal />
      <OnboardingModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

