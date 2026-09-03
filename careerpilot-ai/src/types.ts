export type EducationLevel = 
  | 'high_school' 
  | 'freshman' 
  | 'sophomore' 
  | 'junior' 
  | 'senior' 
  | 'graduate' 
  | 'bootcamp';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  education_level?: string;
  educationLevel?: string;
  current_class?: string;
  currentClass?: string;
  interests: string[];
  work_preferences?: string[];
  workPreferences?: string[];
  avatar_url?: string;
  avatarUrl?: string;
  joined_date?: string;
  joinedDate?: string;
  is_onboarded?: boolean;
  isOnboarded?: boolean;
}

export interface CareerGoal {
  id: string;
  user_id?: string;
  userId?: string;
  career_id?: string;
  careerId?: string;
  career_title?: string;
  careerTitle?: string;
  match_score?: number;
  matchScore?: number;
  target_timeline?: string;
  targetTimeline?: string;
  status: 'active' | 'exploring' | 'achieved';
  updated_at?: string;
  updatedAt?: string;
}

export interface CareerSkillRequirement {
  name: string;
  proficiency: number;
  importance?: 'critical' | 'high' | 'medium';
}

export interface CareerRoadmapPhase {
  phase: string;
  description: string;
  duration?: string;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  short_description?: string;
  shortDescription?: string;
  description: string;
  salary_range?: string;
  avgSalary?: string;
  growth_outlook?: string;
  growthRate?: string;
  education_requirement?: string;
  work_style?: string;
  workStyle?: string;
  learning_curve?: string;
  learningCurve?: string;
  difficulty?: 'Moderate' | 'Challenging' | 'High';
  match_score: number;
  matchScore?: number;
  match_tag?: string;
  match_breakdown: {
    aptitude: number;
    interest: number;
    personality: number;
    skills: number;
    currentSkills?: number;
  };
  matchBreakdown?: {
    aptitude: number;
    interests: number;
    personality: number;
    currentSkills: number;
  };
  why_matches?: string;
  whyItMatches?: string;
  day_in_the_life?: string;
  dayInTheLife?: string;
  required_skills: CareerSkillRequirement[];
  requiredSkills?: CareerSkillRequirement[];
  roadmap_preview: CareerRoadmapPhase[];
  roadmapPreview?: CareerRoadmapPhase[];
  responsibilities?: string[];
  recommendedNextStep?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'domain';
  description: string;
}

export interface UserSkill {
  id: string;
  skill_id?: string;
  skillId?: string;
  skill_name: string;
  skillName?: string;
  proficiency: number; // 0 - 100
  is_strength: boolean;
  isStrength?: boolean;
  is_gap: boolean;
  isGap?: boolean;
  targetCareerRelevance?: 'critical' | 'high' | 'medium';
}

export interface SkillGap {
  id: string;
  skill_name: string;
  skillName?: string;
  current_level: number;
  currentLevel?: number;
  required_level: number;
  requiredLevel?: number;
  gap_size: number;
  gapSize?: number;
  priority: 'urgent' | 'medium' | 'low';
  recommended_resource_title?: string;
  recommendedResourceTitle?: string;
  reason?: string;
}

export interface AssessmentQuestion {
  id: string;
  assessmentType: 'aptitude' | 'personality' | 'technical';
  question: string;
  options: {
    label: string;
    value: string;
    traitScore?: Record<string, number>;
  }[];
  category: string;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  assessmentType: string;
  title: string;
  score: number;
  completedAt: string;
  traits: Record<string, number>;
  summary: string;
}

export interface LearningResource {
  id: string;
  title: string;
  stage: number;
  type: string;
  description: string;
  why_recommended: string;
  skills_covered: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_time: string;
  rating: number;
  url: string;
  status: 'completed' | 'in_progress' | 'locked';
  progress: number; // 0 - 100
}

export interface InterviewSession {
  id: string;
  userId?: string;
  user_id?: string;
  role: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Technical' | 'Behavioral' | 'HR' | 'Mixed';
  score: number;
  date: string;
  breakdown: {
    technicalKnowledge: number;
    communication: number;
    problemSolving: number;
    answerRelevance: number;
    structure: number;
  };
  whatYouDidWell: string[];
  whatToImprove: string[];
  recommendedPractice?: string;
  recommended_practice?: string;
  questionsCount?: number;
}

export interface InterviewQuestionItem {
  id: string;
  questionNumber: number;
  category: string;
  question: string;
  difficulty: string;
  suggestedPoints?: string[];
}

export interface Achievement {
  id: string;
  code?: string;
  title: string;
  description: string;
  badge_icon: string;
  icon?: string;
  unlocked: boolean;
  unlockedAt?: string | null;
  progress?: number;
}

export interface ReadinessScoreData {
  overall: number; // e.g. 72
  changeThisMonth: number; // e.g. +8
  breakdown: {
    careerClarity: number; // e.g. 85
    skills: number; // e.g. 70
    communication: number; // e.g. 68
    interviewReadiness: number; // e.g. 78
    learningProgress: number; // e.g. 64
  };
  history: {
    date: string;
    score: number;
    label: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    action: string;
    payload?: any;
  }[];
}

export type ActiveTab = 
  | 'home' 
  | 'careers' 
  | 'assessment' 
  | 'learn' 
  | 'interview' 
  | 'resume' 
  | 'market' 
  | 'mentors' 
  | 'coach' 
  | 'profile';

export interface ResumeData {
  fullName: string;
  targetRole: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    duration: string;
    bullets: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    year: string;
    grade: string;
  }[];
  projects: {
    id: string;
    title: string;
    tech: string[];
    description: string;
    link?: string;
  }[];
}

export interface ATSAnalysisResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C';
  impactVerbsScore: number;
  metricQuantificationScore: number;
  keywordMatchRate: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
}

export interface SalaryBenchmark {
  role: string;
  fresher: number;
  midLevel: number;
  senior: number;
  staff: number;
  projectedGrowth: string;
  demandIndex: number; // 0-100
  topLocations: string[];
  hiringCompanies: {
    name: string;
    openings: number;
    avgPay: string;
    logo: string;
  }[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  experienceYears: number;
  skills: string[];
  rating: number;
  reviewsCount: number;
  bio: string;
  hourlyRate: string;
  availableNext: string;
  isVerified: boolean;
}

