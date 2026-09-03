import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Target,
  Brain,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Mic,
  Compass,
  ChevronRight,
  TrendingUp,
  Award,
  Flame,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const Dashboard: React.FC = () => {
  const {
    user,
    readinessScore,
    careerGoal,
    quickStats,
    continueActivity,
    nextBestAction,
    setActiveTab,
    setSelectedCareer,
    careers,
    openInterviewModal,
    aiContext,
    skills,
  } = useApp();

  const handleViewCareerPath = () => {
    const target = careers.find(c => c.id === careerGoal?.career_id) || careers[0];
    if (target) setSelectedCareer(target);
    setActiveTab('careers');
  };

  const handleContinueActivity = () => {
    setActiveTab('learn');
  };

  const handleNextBestAction = () => {
    setActiveTab('learn');
  };

  // Readiness circle math
  const [todayTasks, setTodayTasks] = React.useState([
    { id: 'sql', title: 'SQL JOINs', duration: 30, skill: 'SQL', done: false },
    { id: 'dsa', title: 'DSA Arrays', duration: 45, skill: 'Data Structures', done: false },
    { id: 'project', title: 'Build mini project', duration: 30, skill: 'Projects', done: false },
    { id: 'interview', title: 'Interview question', duration: 15, skill: 'Communication', done: false },
  ]);

  const completedTasks = todayTasks.filter(task => task.done).length;
  const totalMinutes = todayTasks.reduce((sum, task) => sum + task.duration, 0);

  const score = readinessScore?.overall || 72;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Readiness historical trend
  const trendData = readinessScore?.history || [
    { date: 'June', score: 58, label: 'Baseline' },
    { date: 'July', score: 64, label: 'Assessments' },
    { date: 'August', score: 72, label: 'Current' },
  ];

  const toggleTask = (taskId: string) => {
    setTodayTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Header (High Density Theme) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good afternoon, {user?.name || 'career learner'} 👋
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-0.5">
            A focused view of your progress, priorities, and next move.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-white px-4 py-2 rounded-xl border border-slate-200 items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {user?.name ? user.name[0] : '?'}
            </div>
            <span className="font-medium text-sm text-slate-800">{user?.name || 'Your profile'}</span>
          </div>

          <button
            onClick={() => openInterviewModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium text-sm shadow-md shadow-indigo-200 transition flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            <span>Practice Interview</span>
          </button>
        </div>
      </div>

      {/* 2. Main High Density 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8-Column Track */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Row 1: Career Readiness Gauge (1 col) + Target Career Goal (2 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Career Readiness Gauge Card */}
            <div className="col-span-1 bg-white p-6 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-tight">
                Career Readiness
              </span>
              <div className="relative flex items-center justify-center my-1 w-28 h-28">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="text-slate-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="text-indigo-600 transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg mt-1">
                +8% this month
              </span>
            </div>

            {/* Target Career Goal Card */}
            <div className="col-span-1 md:col-span-2 bg-indigo-900 p-6 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative z-10">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
                  Target Career Goal
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">
                  {careerGoal?.career_title || 'Software Engineer'}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-xs font-bold uppercase">
                    {careerGoal?.match_score || 91}% Match
                  </span>
                  <span className="text-indigo-200 text-xs">High potential fit</span>
                </div>
                <p className="text-xs text-indigo-200/80 mt-3 line-clamp-2 leading-relaxed">
                   A focused path built around your current strengths, skill gaps, and readiness for the next role.
                </p>
              </div>

              <div className="relative z-10 pt-4 flex items-center justify-between">
                <button
                  onClick={handleViewCareerPath}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>View Career Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('careers')}
                  className="text-xs text-indigo-300 hover:text-white font-medium transition"
                >
                  Explore Alternatives
                </button>
              </div>

              {/* Decorative Watermark */}
              <Compass className="w-40 h-40 absolute -right-6 -top-6 text-white opacity-10 pointer-events-none transform rotate-12" />
            </div>
          </div>

          {/* Row 2: Your Career Roadmap (High Density 4-Stage Track) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-base">Your Career Roadmap</h3>
              <button
                onClick={() => setActiveTab('learn')}
                className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Details →
              </button>
            </div>

            <div className="flex items-center gap-1 pt-3 pb-1">
              {/* Foundation Stage */}
              <div className="flex-1 group relative">
                <div className="h-12 bg-emerald-500 rounded-l-xl flex items-center justify-center text-white text-[10px] font-bold px-2 tracking-wider">
                  FOUNDATION
                </div>
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-100 text-emerald-700 text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
                  COMPLETED
                </div>
              </div>

              {/* Core Skills Stage */}
              <div className="flex-1 relative">
                <div className="h-12 bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold px-2 tracking-wider">
                  CORE SKILLS
                </div>
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-700 text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
                  IN PROGRESS
                </div>
              </div>

              {/* Projects Stage */}
              <div className="flex-1">
                <div className="h-12 bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-bold px-2 tracking-wider">
                  PROJECTS
                </div>
              </div>

              {/* Career Ready Stage */}
              <div className="flex-1">
                <div className="h-12 bg-slate-100 rounded-r-xl flex items-center justify-center text-slate-400 text-[10px] font-bold px-2 tracking-wider">
                  CAREER READY
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 italic">
              "Your next major milestone: Building a full-stack portfolio project with relational database."
            </p>
          </div>

          {/* Row 3: Next Best Action (1 col) + Interview Practice (1 col) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next Best Action Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-3">Next Best Action</h3>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                  <p className="text-sm font-bold text-amber-800">
                    {nextBestAction?.recommendation || 'Improve your SQL fundamentals'}
                  </p>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    {nextBestAction?.why || 'SQL is currently one of your largest skill gaps for your target career. Master joins and subqueries to boost score by +12 pts.'}
                  </p>
                  <button
                    onClick={handleNextBestAction}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg mt-3 transition shadow-xs"
                  >
                    {nextBestAction?.cta || 'Start Learning'}
                  </button>
                </div>
              </div>
            </div>

            {/* Interview Practice Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 mb-3">Interview Practice</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">LATEST SCORE</p>
                    <p className="text-xl font-bold text-slate-900">
                       {quickStats.interview} <span className="text-slate-400 text-xs font-normal">/ 100</span>
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openInterviewModal()}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md transition"
              >
                 Launch Interview
              </button>
            </div>
          </div>

          {/* Row 4: Today's AI Career Plan + Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-base">Today&apos;s Career Plan</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">{completedTasks}/{todayTasks.length} done</span>
              </div>

              <div className="space-y-3">
                {todayTasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`w-full flex items-center justify-between rounded-2xl border px-3 py-2 text-left transition ${
                      task.done
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{task.title}</div>
                      <div className="text-[10px] opacity-75">{task.skill} • {task.duration} min</div>
                    </div>
                    <CheckCircle2 className={`w-4 h-4 ${task.done ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Total: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition"
                >
                  Start Today&apos;s Plan
                </button>
              </div>
            </div>
            {/* Continue Learning Module */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                    In Progress Module
                  </span>
                  <span className="text-xs text-slate-400">~20 mins left</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-2">
                  {continueActivity?.title || 'Complete your SQL skill assessment'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Module 2: Relational Schema Joins & Aggregation Queries
                </p>

                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Progress</span>
                    <span className="font-bold text-indigo-600">{continueActivity?.progress || 65}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{ width: `${continueActivity?.progress || 65}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleContinueActivity}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Resume Lesson</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 font-medium">Auto-saves to database</span>
              </div>
            </div>

            {/* Quick Metrics Bento */}
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setActiveTab('careers')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-indigo-300 transition"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Career Fit</span>
                <div className="mt-2">
                  <p className="text-2xl font-black text-indigo-600">{quickStats.careerMatch}%</p>
                  <p className="text-[10px] text-slate-400 truncate">Explore 15+ Matches →</p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('assessment')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-sky-300 transition"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Assessment</span>
                <div className="mt-2">
                  <p className="text-2xl font-black text-sky-600">{quickStats.assessment}%</p>
                  <p className="text-[10px] text-slate-400 truncate">Cognitive Radar →</p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('resume')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-amber-300 transition"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">ATS Resume</span>
                <div className="mt-2">
                  <p className="text-2xl font-black text-amber-600">88/100</p>
                  <p className="text-[10px] text-slate-400 truncate">Optimize Bullets →</p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('interview')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Interview</span>
                <div className="mt-2">
                  <p className="text-2xl font-black text-emerald-600">{quickStats.interview}%</p>
                  <p className="text-[10px] text-slate-400 truncate">Launch Studio →</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Career Preparation Quick Studio Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => setActiveTab('interview')}
              className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-md cursor-pointer hover:scale-[1.01] transition"
            >
              <div className="flex items-center justify-between text-indigo-300 text-xs font-bold mb-1">
                <span>AI INTERVIEW</span>
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] text-white">LIVE</span>
              </div>
              <h4 className="font-bold text-sm text-white">Practice Mock Interview</h4>
              <p className="text-[11px] text-indigo-200/80 mt-1">STAR rubric critique & real-time audio evaluation.</p>
            </div>

            <div
              onClick={() => setActiveTab('resume')}
              className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md cursor-pointer hover:scale-[1.01] transition"
            >
              <div className="flex items-center justify-between text-indigo-300 text-xs font-bold mb-1">
                <span>ATS OPTIMIZER</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-[9px] text-emerald-300">PRO</span>
              </div>
              <h4 className="font-bold text-sm text-white">AI Resume Builder</h4>
              <p className="text-[11px] text-indigo-200/80 mt-1">Quantify bullet metrics and pass Fortune 500 ATS.</p>
            </div>

            <div
              onClick={() => setActiveTab('market')}
              className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-md cursor-pointer hover:scale-[1.01] transition"
            >
              <div className="flex items-center justify-between text-indigo-300 text-xs font-bold mb-1">
                <span>SALARY RADAR</span>
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] text-white">2026</span>
              </div>
              <h4 className="font-bold text-sm text-white">Market Trends & Pay</h4>
              <p className="text-[11px] text-indigo-200/80 mt-1">Comp curve: $118k fresher to $320k staff architect.</p>
            </div>
          </div>

          {/* Row 5: Growth Tracking Line Chart (58 → 64 → 72) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">Growth Tracking</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Improving
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                    Readiness Score progression over recent activity
                </p>
              </div>
              <span className="text-xs text-slate-500">
                Next Milestone: <strong className="text-slate-800">80+ (Job Ready)</strong>
              </span>
            </div>

            <div className="h-48 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 7, fill: '#4338ca' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right 4-Column Track: Skill Inventory + Coach Online status */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Skill Inventory Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 text-base">Skill Inventory</h3>
                <span className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer" onClick={() => setActiveTab('learn')}>
                  Manage
                </span>
              </div>

              <div className="space-y-4">
                {skills.all.slice(0, 5).map(skill => {
                  const isGap = skill.is_gap || skill.proficiency < 60;
                  const colorClass = isGap ? 'bg-amber-500' : 'bg-emerald-500';
                  const textClass = isGap ? 'text-amber-700' : 'text-emerald-700';

                  return (
                    <div key={skill.skill_name}>
                      <div className="flex justify-between text-xs font-bold text-slate-600 uppercase tracking-tight mb-1">
                        <span className="flex items-center gap-1.5">
                          {skill.skill_name}
                          {isGap && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-extrabold">
                              {skill.is_gap ? 'Gap' : 'Focus'}
                            </span>
                          )}
                        </span>
                        <span className={textClass}>{Math.round(skill.proficiency)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-2 rounded-full" style={{ width: `${Math.round(skill.proficiency)}%`, backgroundColor: isGap ? '#f59e0b' : '#10b981' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="mt-8 pt-5 border-t border-slate-100">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Recent Achievements
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                  <span className="text-base">📚</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">10+ Study Hours</p>
                    <p className="text-[9px] text-slate-400">Streak badge</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                  <span className="text-base">🎯</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">Aptitude Ace</p>
                    <p className="text-[9px] text-slate-400">Score 84/100</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                  <span className="text-base">🔥</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">7-Day Streak</p>
                    <p className="text-[9px] text-slate-400">Consistency</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2">
                  <span className="text-base">🎤</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">Mock Interview</p>
                    <p className="text-[9px] text-slate-400">Grade 78%</p>
                                      <p className="text-[9px] text-slate-400">Grade {quickStats.interview}%</p>
                                    Readiness Score progression over recent activity
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coach Online Status Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  Coach Online
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Gemini 2.5</span>
                           <span className="text-[10px] text-slate-400">Gemini 3.6</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &ldquo;{aiContext.name}, your consistency in {aiContext.skills.find(s => s.isStrength)?.name || 'Python'} is great. Let&apos;s tackle that {aiContext.skillGaps[0]?.name || 'SQL'} gap today to level up your readiness score!&rdquo;
            </p>
            <button
              onClick={() => setActiveTab('coach')}
              className="mt-3 w-full py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/70 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chat with Coach</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
