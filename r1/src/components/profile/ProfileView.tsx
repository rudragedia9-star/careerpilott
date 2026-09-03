import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  GraduationCap,
  Target,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  Mic,
  TrendingUp,
  Edit2,
  Save,
  RotateCcw,
  Sparkles,
  ChevronRight
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

export const ProfileView: React.FC = () => {
  const {
    user,
    careerGoal,
    readinessScore,
    learningProgress,
    achievements,
    interviewSessions,
    skills,
    skillGaps,
    updateProfile,
    openInterviewModal,
    resetToDemo,
    openOnboarding,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [educationLevel, setEducationLevel] = useState(user?.education_level || 'High School Senior / Early College');
  const [currentClass, setCurrentClass] = useState(user?.current_class || '12th Grade / CS Track');

  const handleSave = async () => {
    await updateProfile({
      name,
      educationLevel,
      currentClass,
    } as any);
    setIsEditing(false);
  };

  const trendData = readinessScore?.history || [
    { date: 'June', score: 58, label: 'Baseline' },
    { date: 'July', score: 64, label: 'Assessments' },
    { date: 'August', score: 72, label: 'Current' },
  ];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Header Profile Card (Section 15) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm shrink-0"
            referrerPolicy="no-referrer"
          />

          <div className="space-y-1">
            {!isEditing ? (
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name || 'Your profile'}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="px-2.5 py-1 text-sm font-bold rounded-lg border border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-sm"
                >
                  Save
                </button>
              </div>
            )}

            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.current_class || '12th Grade / CS Track'} • {user?.education_level}</span>
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                Target: {careerGoal?.career_title || 'Software Engineer'} ({careerGoal?.match_score || 91}%)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                {learningProgress?.current_streak_days || 5} Day Streak
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={openOnboarding}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
          >
            Retake Assessment
          </button>
          <button
            onClick={resetToDemo}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Growth Tracking & Historical Progression (Section 16) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progression Chart */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Progress Tracking
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Career Readiness Progression
              </h3>
              <p className="text-xs text-slate-500">
                Your Readiness Score evolved from 58 → 64 → 72 as you completed modules and mock interviews.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600">{readinessScore?.overall || 72}</span>
              <p className="text-[10px] text-emerald-600 font-bold">+8% this month</p>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Summary Pill */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              Career Readiness Tier
            </span>
            <h4 className="text-2xl font-black tracking-tight">Active Preparation</h4>
            <p className="text-xs text-indigo-100 leading-relaxed">
              You are currently at <strong>72/100</strong>. Crossing the <strong>80 threshold</strong> unlocks verified recruiter candidate recommendation badges.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex justify-between text-indigo-200">
                <span>SQL Skill Gap:</span>
                <span className="font-bold text-amber-300">42% (Target: 80%)</span>
              </div>
              <div className="flex justify-between text-indigo-200">
                <span>Data Structures:</span>
                <span className="font-bold text-sky-300">51% (Target: 85%)</span>
              </div>
              <div className="flex justify-between text-indigo-200">
                <span>Last Mock Interview:</span>
                <span className="font-bold text-emerald-300">78 / 100</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openInterviewModal()}
            className="w-full py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-slate-100 transition mt-4"
          >
            Launch Next Interview (+4 pts)
          </button>
        </div>
      </div>

      {/* Unlocked Badges & Achievements (Section 15) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Unlocked Achievements</h3>
            <p className="text-xs text-slate-500">
              Celebrate your learning milestones and interview achievements.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            {achievements.filter(a => a.unlocked).length} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-between ${
                ach.unlocked
                  ? 'bg-indigo-50/50 border-indigo-200 shadow-2xs'
                  : 'bg-slate-50/50 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs mb-2">
                {ach.badge_icon}
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">{ach.title}</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">{ach.description}</p>
              <span
                className={`text-[10px] font-bold mt-2.5 px-2 py-0.5 rounded-full ${
                  ach.unlocked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {ach.unlocked ? 'Unlocked' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Mock Interviews History (Section 16) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Mock Interview History</h3>
            <p className="text-xs text-slate-500">
              Track past performance, scores, and areas of improvement.
            </p>
          </div>
          <button
            onClick={() => openInterviewModal()}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
          >
            + New Interview
          </button>
        </div>

        <div className="space-y-3">
          {interviewSessions.map(session => (
            <div
              key={session.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{session.role} Interview</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-200 text-slate-700">
                      {session.difficulty} • {session.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{session.recommended_practice}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-600">{session.score} / 100</span>
                  <p className="text-[10px] text-slate-400 font-medium">{session.date}</p>
                </div>
                <button
                  onClick={() => openInterviewModal(session.role)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition"
                >
                  Retry
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
