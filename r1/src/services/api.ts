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
  ChatMessage
} from '../types';

export const api = {
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  async getAuthMe() {
    const res = await fetch('/api/auth/me');
    return res.json();
  },

  async loginAsDemo() {
    const res = await fetch('/api/auth/demo', { method: 'POST' });
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async signup(name: string, email: string, password: string) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },

  async logout() {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    return res.json();
  },

  async completeOnboarding(data: {
    name: string;
    educationLevel: string;
    currentClass: string;
    interests: string[];
    workPreferences: string[];
    targetCareer?: string;
  }) {
    const res = await fetch('/api/onboarding/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getDashboard() {
    const res = await fetch('/api/dashboard');
    return res.json();
  },

  async getCareers(): Promise<Career[]> {
    const res = await fetch('/api/careers');
    return res.json();
  },

  async getCareerDetail(id: string) {
    const res = await fetch(`/api/careers/${id}`);
    return res.json();
  },

  async compareCareers(careerIdA: string, careerIdB: string) {
    const res = await fetch('/api/careers/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ careerIdA, careerIdB }),
    });
    return res.json();
  },

  async setCareerGoal(careerId: string, timeline?: string) {
    const res = await fetch('/api/career-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ careerId, timeline }),
    });
    return res.json();
  },

  async getSkills() {
    const res = await fetch('/api/skills');
    return res.json();
  },

  async updateSkill(skillName: string, proficiency: number) {
    const res = await fetch('/api/skills/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillName, proficiency }),
    });
    return res.json();
  },

  async getLearning() {
    const res = await fetch('/api/learning');
    return res.json();
  },

  async updateLearningProgress(resourceId: string, progress: number, completed?: boolean) {
    const res = await fetch('/api/learning/update-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId, progress, completed }),
    });
    return res.json();
  },

  async chatWithCoach(message: string, history: { sender: string; text: string }[]) {
    const res = await fetch('/api/ai/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    return res.json();
  },

  async startMockInterview(role: string, difficulty: string, type: string) {
    const res = await fetch('/api/ai/mock-interview/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, difficulty, type }),
    });
    return res.json();
  },

  async submitInterviewAnswer(payload: {
    role: string;
    difficulty: string;
    type: string;
    questionNumber: number;
    questionText: string;
    userAnswer: string;
    previousQA: any[];
  }) {
    const res = await fetch('/api/ai/mock-interview/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async completeMockInterview(payload: {
    role: string;
    difficulty: string;
    type: string;
    qaList: { question: string; answer: string }[];
  }) {
    const res = await fetch('/api/ai/mock-interview/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async getInterviewSessions(): Promise<InterviewSession[]> {
    const res = await fetch('/api/interview-sessions');
    return res.json();
  },

  async getAchievements(): Promise<Achievement[]> {
    const res = await fetch('/api/achievements');
    return res.json();
  },

  async resetDemo() {
    const res = await fetch('/api/reset-demo', { method: 'POST' });
    return res.json();
  },
};
