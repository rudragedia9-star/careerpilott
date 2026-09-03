import { config as loadEnv } from 'dotenv';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.ts';
import { AIService } from './server/gemini.ts';

loadEnv({ path: '.env.local' });

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1';

app.use(express.json());

// Current active session user (Defaults to Aarav demo user)
let currentUserId = 'demo-user-aarav';

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'CareerPilot AI',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// --- Auth Endpoints ---
app.get('/api/auth/me', (req, res) => {
  const user = db.getUser(currentUserId);
  const profile = db.getProfile(currentUserId);
  res.json({ user, profile, isAuthenticated: Boolean(user) });
});

app.post('/api/auth/demo', (req, res) => {
  currentUserId = 'demo-user-aarav';
  const user = db.getUser(currentUserId);
  const profile = db.getProfile(currentUserId);
  res.json({ success: true, user, profile });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  // If email matches or is demo, sign in as demo or standard user
  currentUserId = 'demo-user-aarav';
  const user = db.getUser(currentUserId);
  const profile = db.getProfile(currentUserId);
  res.json({ success: true, user, profile });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, educationLevel } = req.body;
  currentUserId = 'demo-user-aarav';
  if (name || educationLevel) {
    db.updateProfile(currentUserId, {
      name: name || 'Aarav',
      education_level: educationLevel || 'High School Senior / Early College',
      is_onboarded: false,
    });
  }
  const user = db.getUser(currentUserId);
  const profile = db.getProfile(currentUserId);
  res.json({ success: true, user, profile });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

// --- Profile & Onboarding ---
app.get('/api/profile', (req, res) => {
  const profile = db.getProfile(currentUserId);
  res.json(profile);
});

app.put('/api/profile', (req, res) => {
  const updated = db.updateProfile(currentUserId, req.body);
  res.json(updated);
});

app.post('/api/onboarding/complete', (req, res) => {
  const { name, educationLevel, currentClass, interests, workPreferences, targetCareer } = req.body;
  const updatedProfile = db.updateProfile(currentUserId, {
    name: name || 'Aarav',
    education_level: educationLevel || 'High School Senior / Early College',
    current_class: currentClass || '12th Grade / CS Track',
    interests: interests || ['Technology', 'Problem Solving'],
    work_preferences: workPreferences || ['Solving problems', 'Building things'],
    is_onboarded: true,
  });

  if (targetCareer) {
    db.setCareerGoal(currentUserId, targetCareer);
  }

  // Recalculate readiness
  const readiness = db.recalculateReadiness(currentUserId);
  res.json({ profile: updatedProfile, readiness });
});

// --- Dashboard (Section 4) ---
app.get('/api/dashboard', (req, res) => {
  const profile = db.getProfile(currentUserId);
  const careerGoal = db.getCareerGoal(currentUserId);
  const readiness = db.getReadinessScore(currentUserId);
  const skills = db.getUserSkills(currentUserId);
  const skillGaps = db.getSkillGaps(currentUserId);
  const learningProgress = db.getLearningProgress(currentUserId);
  const learningResources = db.getLearningResources(currentUserId);
  const interviewSessions = db.getInterviewSessions(currentUserId);

  // Separate strengths vs focus areas
  const strengths = skills.filter(s => s.is_strength);
  const focusAreas = skills.filter(s => s.is_gap);

  // Incomplete activity for "Continue where you left off"
  // Example: "Complete your SQL skill assessment" (65%)
  const incompleteActivity = {
    title: 'Complete your SQL skill assessment',
    type: 'assessment',
    skill: 'SQL',
    progress: 65,
    actionUrl: '/learn',
  };

  // Quick stats 4 cards (Section 4)
  const quickStats = {
    careerMatch: careerGoal?.match_score || 91,
    assessment: 86,
    learning: learningProgress?.overall_percentage || 64,
    interview: interviewSessions[0]?.score || 78,
  };

  // AI Recommendation: Your next best action
  const nextBestAction = {
    title: 'Your next best action',
    recommendation: 'Improve your SQL fundamentals before starting Machine Learning.',
    why: 'SQL is currently one of your largest skill gaps for your target career.',
    cta: 'Start Learning',
    targetTab: 'learn',
  };

  res.json({
    user: profile,
    readinessScore: readiness,
    careerGoal,
    continueWhereYouLeftOff: incompleteActivity,
    quickStats,
    skills: {
      strengths,
      focusAreas,
      all: skills,
    },
    skillGaps,
    nextBestAction,
  });
});

// --- Careers & Career Explorer (Sections 8, 9, 10, 11, 12) ---
app.get('/api/careers', (req, res) => {
  const careers = db.getAllCareers();
  res.json(careers);
});

app.get('/api/careers/:id', (req, res) => {
  const career = db.getCareerById(req.params.id);
  if (!career) return res.status(404).json({ error: 'Career not found' });
  const userSkills = db.getUserSkills(currentUserId);
  const skillGaps = db.getSkillGaps(currentUserId);
  res.json({ career, userSkills, skillGaps });
});

app.post('/api/careers/compare', (req, res) => {
  const { careerIdA, careerIdB } = req.body;
  const careerA = db.getCareerById(careerIdA) || db.getAllCareers()[0];
  const careerB = db.getCareerById(careerIdB) || db.getAllCareers()[1];
  res.json({ careerA, careerB });
});

app.post('/api/career-goal', (req, res) => {
  const { careerId, timeline } = req.body;
  const goal = db.setCareerGoal(currentUserId, careerId, timeline);
  res.json(goal);
});

// --- Skills & Skill Gaps ---
app.get('/api/skills', (req, res) => {
  const skills = db.getUserSkills(currentUserId);
  const gaps = db.getSkillGaps(currentUserId);
  res.json({ skills, gaps });
});

app.post('/api/skills/update', (req, res) => {
  const { skillName, proficiency } = req.body;
  const updated = db.updateUserSkill(currentUserId, skillName, proficiency);
  res.json(updated);
});

// --- Learning (Sections 13 & 14) ---
app.get('/api/learning', (req, res) => {
  const resources = db.getLearningResources(currentUserId);
  const progress = db.getLearningProgress(currentUserId);
  const careerGoal = db.getCareerGoal(currentUserId);
  res.json({ resources, progress, careerGoal });
});

app.post('/api/learning/update-progress', (req, res) => {
  const { resourceId, progress, completed } = req.body;
  const updated = db.updateResourceProgress(resourceId, progress, completed);
  const overallProgress = db.getLearningProgress(currentUserId);
  const readiness = db.getReadinessScore(currentUserId);
  res.json({ resource: updated, overallProgress, readiness });
});

// --- AI Coach (Section 5) ---
app.post('/api/ai/coach', async (req, res) => {
  try {
    const { message, history } = req.body;
    const profile = db.getProfile(currentUserId);
    const careerGoal = db.getCareerGoal(currentUserId);
    const readiness = db.getReadinessScore(currentUserId);
    const skills = db.getUserSkills(currentUserId);
    const skillGaps = db.getSkillGaps(currentUserId);
    const learningProgress = db.getLearningProgress(currentUserId);
    const recentInterviews = db.getInterviewSessions(currentUserId);

    const userContext = {
      name: profile?.name || 'Aarav',
      educationLevel: profile?.education_level || 'High School / Early College',
      careerGoal: careerGoal?.career_title || 'Software Engineer',
      careerMatch: careerGoal?.match_score || 91,
      readinessScore: readiness?.overall || 72,
      skills: skills.map(s => ({ name: s.skill_name, proficiency: s.proficiency, isStrength: s.is_strength })),
      skillGaps: skillGaps.map(g => ({ name: g.skill_name, gapSize: g.gap_size, priority: g.priority })),
      learningProgress: learningProgress?.overall_percentage || 64,
      recentInterviewScore: recentInterviews[0]?.score || 78,
    };

    const reply = await AIService.chatWithCoach(userContext, message, history || []);
    res.json(reply);
  } catch (err: any) {
    console.error('Error in AI Coach chat endpoint:', err);
    res.status(500).json({ error: 'Failed to process AI Coach chat', details: err.message });
  }
});

// --- Mock Interview (Sections 6 & 7) ---
app.post('/api/ai/mock-interview/start', async (req, res) => {
  try {
    const { role, difficulty, type } = req.body;
    const question = await AIService.generateInterviewQuestion(
      role || 'Software Engineer',
      difficulty || 'Intermediate',
      type || 'Mixed',
      1,
      [],
      ['SQL', 'System Architecture']
    );
    res.json({
      questionNumber: 1,
      totalQuestions: 4,
      ...question,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to start mock interview', details: err.message });
  }
});

app.post('/api/ai/mock-interview/answer', async (req, res) => {
  try {
    const { role, difficulty, type, questionNumber, questionText, userAnswer, previousQA } = req.body;
    
    // Evaluate answer in real time
    const evaluation = await AIService.evaluateAnswer(role, questionText, userAnswer);

    const currentQA = [...(previousQA || []), { question: questionText, answer: userAnswer, evaluation }];
    const nextQNum = questionNumber + 1;

    let nextQuestion = null;
    if (nextQNum <= 4) {
      nextQuestion = await AIService.generateInterviewQuestion(
        role,
        difficulty,
        type,
        nextQNum,
        currentQA
      );
    }

    res.json({
      evaluation,
      isFinished: nextQNum > 4,
      nextQuestionNumber: nextQNum,
      nextQuestion,
      updatedQA: currentQA,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to evaluate answer', details: err.message });
  }
});

app.post('/api/ai/mock-interview/complete', async (req, res) => {
  try {
    const { role, difficulty, type, qaList } = req.body;
    const evaluationResult = await AIService.evaluateInterviewSession(
      role || 'Software Engineer',
      difficulty || 'Intermediate',
      type || 'Mixed',
      qaList || []
    );

    // Save session to database and update readiness
    const savedSession = db.saveInterviewSession({
      userId: currentUserId,
      role: role || 'Software Engineer',
      difficulty: difficulty || 'Intermediate',
      type: type || 'Mixed',
      score: evaluationResult.score,
      breakdown: evaluationResult.breakdown,
      whatYouDidWell: evaluationResult.whatYouDidWell,
      whatToImprove: evaluationResult.whatToImprove,
      recommendedPractice: evaluationResult.recommendedPractice,
      questionsCount: qaList?.length || 4,
    });

    const updatedReadiness = db.getReadinessScore(currentUserId);
    res.json({
      session: savedSession,
      evaluation: evaluationResult,
      readiness: updatedReadiness,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to complete interview evaluation', details: err.message });
  }
});

app.get('/api/interview-sessions', (req, res) => {
  const sessions = db.getInterviewSessions(currentUserId);
  res.json(sessions);
});

// --- Achievements ---
app.get('/api/achievements', (req, res) => {
  const achievements = db.getAchievements(currentUserId);
  res.json(achievements);
});

// --- Reset Demo Data ---
app.post('/api/reset-demo', (req, res) => {
  db.resetToDemo();
  res.json({ success: true, message: 'Database reset to Aarav demo state' });
});

// --- Start Server with Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`CareerPilot AI Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
