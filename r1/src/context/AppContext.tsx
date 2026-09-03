import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserProfile,
  CareerGoal,
  Career,
  UserSkill,
  SkillGap,
  LearningResource,
  InterviewSession,
  Achievement,
  ReadinessScoreData,
  ActiveTab
} from '../types';
import { api } from '../services/api';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Appearance
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Auth & Profile
  user: UserProfile | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;

  // Dashboard Data
  readinessScore: ReadinessScoreData | null;
  careerGoal: CareerGoal | null;
  skills: { strengths: UserSkill[]; focusAreas: UserSkill[]; all: UserSkill[] };
  skillGaps: SkillGap[];
  quickStats: { careerMatch: number; assessment: number; learning: number; interview: number };
  continueActivity: any;
  nextBestAction: any;

  // Careers
  careers: Career[];
  selectedCareer: Career | null;
  setSelectedCareer: (career: Career | null) => void;
  setCareerGoal: (careerId: string, timeline?: string) => Promise<void>;
  compareCareerA: Career | null;
  compareCareerB: Career | null;
  openCompareModal: (careerA?: Career, careerB?: Career) => void;
  closeCompareModal: () => void;

  // Learning
  learningResources: LearningResource[];
  learningProgress: { overall_percentage: number; completed_modules: number; total_modules: number; current_streak_days: number };
  updateResourceProgress: (resourceId: string, progress: number, completed?: boolean) => Promise<void>;

  // Interview
  interviewSessions: InterviewSession[];
  isInterviewModalOpen: boolean;
  openInterviewModal: (defaultRole?: string) => void;
  closeInterviewModal: () => void;
  interviewInitialRole: string;

  // Modals & Flows
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;

  // Achievements
  achievements: Achievement[];

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // AI Context
  aiContext: {
    name: string;
    educationLevel: string;
    careerGoal: string;
    selectedCareer: string;
    careerMatch: number;
    readinessScore: number;
    skills: { name: string; proficiency: number; isStrength: boolean }[];
    skillGaps: { name: string; gapSize: number; priority: string; reason?: string }[];
    learningProgress: number;
    recentInterviewScore: number;
    assessmentSummary: string;
    roadmapFocus: string[];
  };

  // System
  refreshAllData: () => Promise<void>;
  resetToDemo: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.localStorage.getItem('careerpilot-theme') === 'light' ? 'light' : 'dark';
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [interviewInitialRole, setInterviewInitialRole] = useState('Software Engineer');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [compareCareerA, setCompareCareerA] = useState<Career | null>(null);
  const [compareCareerB, setCompareCareerB] = useState<Career | null>(null);

  // Data
  const [readinessScore, setReadinessScore] = useState<ReadinessScoreData | null>(null);
  const [careerGoal, setCareerGoalState] = useState<CareerGoal | null>(null);
  const [skills, setSkills] = useState<{ strengths: UserSkill[]; focusAreas: UserSkill[]; all: UserSkill[] }>({
    strengths: [],
    focusAreas: [],
    all: [],
  });
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [quickStats, setQuickStats] = useState({ careerMatch: 91, assessment: 86, learning: 64, interview: 78 });
  const [continueActivity, setContinueActivity] = useState<any>(null);
  const [nextBestAction, setNextBestAction] = useState<any>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [learningResources, setLearningResources] = useState<LearningResource[]>([]);
  const [learningProgress, setLearningProgress] = useState({
    overall_percentage: 64,
    completed_modules: 5,
    total_modules: 8,
    current_streak_days: 5,
  });
  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('careerpilot-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  const aiContext = useMemo(() => {
    const sortedSkills = [...skills.all].sort((a, b) => (b.proficiency ?? 0) - (a.proficiency ?? 0));
    const sortedGaps = [...skillGaps].sort((a, b) => (b.gap_size ?? 0) - (a.gap_size ?? 0));
    const strongestSkill = sortedSkills[0]?.skill_name || 'Problem Solving';
    const highestGap = sortedGaps[0];
    const topRoadmap = [...learningResources]
      .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
      .slice(0, 3)
      .map(r => r.title);

    return {
      name: user?.name || 'Career Learner',
      educationLevel: user?.education_level || user?.educationLevel || 'Student',
      careerGoal: careerGoal?.career_title || selectedCareer?.title || 'your target career',
      selectedCareer: selectedCareer?.title || careerGoal?.career_title || 'your target career',
      careerMatch: careerGoal?.match_score ?? quickStats.careerMatch ?? 0,
      readinessScore: readinessScore?.overall ?? 72,
      skills: skills.all.map(skill => ({
        name: skill.skill_name,
        proficiency: skill.proficiency,
        isStrength: Boolean(skill.is_strength),
      })),
      skillGaps: skillGaps.map(gap => ({
        name: gap.skill_name,
        gapSize: gap.gap_size,
        priority: gap.priority,
        reason: gap.reason,
      })),
      learningProgress: learningProgress.overall_percentage,
      recentInterviewScore: interviewSessions[0]?.score ?? 78,
      assessmentSummary: `${strongestSkill} is your strongest area, and ${highestGap ? highestGap.skill_name : 'SQL'} is your highest-priority gap to close for ${careerGoal?.career_title || selectedCareer?.title || 'your target role'}.`,
      roadmapFocus: topRoadmap.length ? topRoadmap : ['SQL Fundamentals', 'Data Structures', 'Interview Practice'],
    };
  }, [user, skills, skillGaps, learningResources, learningProgress, readinessScore, careerGoal, selectedCareer, quickStats, interviewSessions]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshAllData = async () => {
    try {
      setIsLoading(true);
      const [dashData, careersData, learnData, sessionsData, achData] = await Promise.all([
        api.getDashboard(),
        api.getCareers(),
        api.getLearning(),
        api.getInterviewSessions(),
        api.getAchievements(),
      ]);

      if (dashData) {
        setUser(dashData.user);
        setIsOnboarded(Boolean(dashData.user?.is_onboarded));
        setReadinessScore(dashData.readinessScore);
        setCareerGoalState(dashData.careerGoal);
        setSkills(dashData.skills || { strengths: [], focusAreas: [], all: [] });
        setSkillGaps(dashData.skillGaps || []);
        setQuickStats(dashData.quickStats || { careerMatch: 91, assessment: 86, learning: 64, interview: 78 });
        setContinueActivity(dashData.continueWhereYouLeftOff);
        setNextBestAction(dashData.nextBestAction);
      }

      if (careersData) {
        setCareers(careersData);
      }

      if (learnData) {
        setLearningResources(learnData.resources || []);
        if (learnData.progress) {
          setLearningProgress(learnData.progress);
        }
      }

      if (sessionsData) {
        setInterviewSessions(sessionsData);
      }

      if (achData) {
        setAchievements(achData);
      }
    } catch (err) {
      console.error('Failed to load application data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const auth = await api.getAuthMe();
        setIsAuthenticated(Boolean(auth.isAuthenticated));
        if (auth.isAuthenticated) await refreshAllData();
      } catch (err) {
        console.error('Failed to restore auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await api.login(email, password);
    if (!result.success) throw new Error(result.error || 'Unable to sign in');
    setIsAuthenticated(true);
    await refreshAllData();
    return result;
  };

  const signup = async (name: string, email: string, password: string) => {
    const result = await api.signup(name, email, password);
    if (!result.success) throw new Error(result.error || 'Unable to create your account');
    await login(email, password);
    return result;
  };

  const loginAsDemo = async () => {
    try {
      await api.loginAsDemo();
      setIsAuthenticated(true);
      setIsOnboarded(true);
      await refreshAllData();
      addToast({
        type: 'success',
        title: 'Demo profile loaded',
        message: 'Welcome back! Your career progress has been loaded.',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await api.logout();
    setIsAuthenticated(false);
    addToast({
      type: 'info',
      title: 'Logged out',
      message: 'You have been signed out. Demo mode remains available anytime.',
    });
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const updated = await api.completeOnboarding(data as any);
      if (updated.profile) {
        setUser(updated.profile);
        setIsOnboarded(true);
      }
      await refreshAllData();
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your preferences and readiness score were updated.',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const setCareerGoal = async (careerId: string, timeline?: string) => {
    try {
      const goal = await api.setCareerGoal(careerId, timeline);
      setCareerGoalState(goal);
      await refreshAllData();
      addToast({
        type: 'success',
        title: 'Career Goal Updated',
        message: `Your target career is now set to ${goal.career_title}.`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openCompareModal = (careerA?: Career, careerB?: Career) => {
    setCompareCareerA(careerA || careers[0]);
    setCompareCareerB(careerB || careers[1]);
  };

  const closeCompareModal = () => {
    setCompareCareerA(null);
    setCompareCareerB(null);
  };

  const updateResourceProgress = async (resourceId: string, progress: number, completed?: boolean) => {
    try {
      const res = await api.updateLearningProgress(resourceId, progress, completed);
      await refreshAllData();
      addToast({
        type: 'success',
        title: completed ? 'Module Completed! 🎉' : 'Progress Saved',
        message: `Updated progress to ${progress}%. Readiness recalculated.`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openInterviewModal = (defaultRole?: string) => {
    if (defaultRole) setInterviewInitialRole(defaultRole);
    else if (careerGoal?.career_title) setInterviewInitialRole(careerGoal.career_title);
    setIsInterviewModalOpen(true);
  };

  const closeInterviewModal = () => {
    setIsInterviewModalOpen(false);
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
  };

  const resetToDemo = async () => {
    try {
      await api.resetDemo();
      await refreshAllData();
      addToast({
        type: 'info',
        title: 'Demo Data Reset',
        message: 'Successfully reloaded the demo profile and its starting progress.',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        user,
        isAuthenticated,
        login,
        signup,
        isOnboarded,
        loginAsDemo,
        logout,
        updateProfile,
        readinessScore,
        careerGoal,
        skills,
        skillGaps,
        quickStats,
        continueActivity,
        nextBestAction,
        careers,
        selectedCareer,
        setSelectedCareer,
        setCareerGoal,
        compareCareerA,
        compareCareerB,
        openCompareModal,
        closeCompareModal,
        learningResources,
        learningProgress,
        updateResourceProgress,
        interviewSessions,
        isInterviewModalOpen,
        openInterviewModal,
        closeInterviewModal,
        interviewInitialRole,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        achievements,
        toasts,
        addToast,
        removeToast,
        aiContext,
        refreshAllData,
        resetToDemo,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
