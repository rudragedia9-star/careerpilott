import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  Award,
  ChevronRight,
  RotateCcw,
  BarChart3,
  Flame,
  ShieldCheck,
  Zap,
  Clock,
  Compass,
  FileCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface Question {
  id: number;
  pillar: 'Aptitude' | 'Big5' | 'Technical' | 'WorkStyle';
  category: string;
  question: string;
  options: {
    label: string;
    text: string;
    scoreBoost: number;
  }[];
}

export const AssessmentCenter: React.FC = () => {
  const { user, readinessScore, careerGoal, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'certificate'>('overview');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Diagnostic questions
  const questions: Question[] = [
    {
      id: 1,
      pillar: 'Aptitude',
      category: 'Computational Logic',
      question: 'Given an unsorted array of N elements where you need to search for items frequently, what is the most optimal architecture?',
      options: [
        { label: 'A', text: 'Linear search on the array directly each time (O(N) search time)', scoreBoost: 30 },
        { label: 'B', text: 'Insert elements into a Hash Table / Set for O(1) average lookup time', scoreBoost: 95 },
        { label: 'C', text: 'Bubble sort the array before every single search query', scoreBoost: 20 },
        { label: 'D', text: 'Store elements in a linked list and traverse from head', scoreBoost: 40 }
      ]
    },
    {
      id: 2,
      pillar: 'Technical',
      category: 'Database & SQL Architecture',
      question: 'When an analytics dashboard runs slow because of heavy aggregations on a 10M-row orders table, what is the best indexing strategy?',
      options: [
        { label: 'A', text: 'Create composite B-tree indexes on filter and group-by columns, or a materialized view', scoreBoost: 95 },
        { label: 'B', text: 'Remove all primary keys to reduce write overhead', scoreBoost: 15 },
        { label: 'C', text: 'Run table scans on every client request', scoreBoost: 25 },
        { label: 'D', text: 'Store the entire database as plain text files in JSON format', scoreBoost: 10 }
      ]
    },
    {
      id: 3,
      pillar: 'WorkStyle',
      category: 'Autonomous Decision Making',
      question: 'A critical microservice starts returning 500 errors 15 minutes before an executive demonstration. How do you triage?',
      options: [
        { label: 'A', text: 'Check recent deployment diffs, inspect centralized logs/APM, and roll back immediately if a regression occurred', scoreBoost: 98 },
        { label: 'B', text: 'Wait until after the demo to see if the server reboots itself', scoreBoost: 15 },
        { label: 'C', text: 'Delete the database to clear corrupted records', scoreBoost: 10 },
        { label: 'D', text: 'Blame another team member on public Slack channels', scoreBoost: 5 }
      ]
    },
    {
      id: 4,
      pillar: 'Big5',
      category: 'Conscientiousness & Collaboration',
      question: 'When receiving code review feedback suggesting significant refactoring from a senior peer, your primary approach is:',
      options: [
        { label: 'A', text: 'Seek to understand the architectural trade-offs, ask clarifying questions, and implement improvements collaboratively', scoreBoost: 96 },
        { label: 'B', text: 'Reject the pull request and write your own separate repository', scoreBoost: 20 },
        { label: 'C', text: 'Ignore the feedback and merge the code directly without approval', scoreBoost: 10 },
        { label: 'D', text: 'Feel discouraged and refrain from writing code for two weeks', scoreBoost: 25 }
      ]
    }
  ];

  // Radar chart data for psychometric & skill profile
  const radarData = [
    { subject: 'Algorithmic Aptitude', score: 88, benchmark: 70 },
    { subject: 'System Design', score: 68, benchmark: 65 },
    { subject: 'Work Conscientiousness', score: 92, benchmark: 75 },
    { subject: 'Problem Deconstruction', score: 85, benchmark: 68 },
    { subject: 'Relational Data (SQL)', score: 54, benchmark: 70 },
    { subject: 'Communication & Teamwork', score: 81, benchmark: 72 },
  ];

  const pillarScores = [
    { name: 'Computational Thinking', score: 88, status: 'Top 12%' },
    { name: 'Workplace Personality', score: 94, status: 'Top 5%' },
    { name: 'Technical Logic', score: 72, status: 'Proficient' },
    { name: 'Practical Problem Solving', score: 85, status: 'Advanced' },
  ];

  const handleSelectOption = (qId: number, boost: number) => {
    setSelectedAnswers({ ...selectedAnswers, [qId]: boost });
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setIsCompleted(true);
      setActiveTab('certificate');
      addToast({
        type: 'success',
        title: 'Assessment Complete!',
        message: 'Your psychometric and technical diagnostic score has been calculated.'
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Diagnostic & Skills Assessment Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              VERIFIED
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Standardized psychometric, cognitive, and software engineering diagnostic tests calibrated against industry norms.
          </p>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Diagnostic Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setCurrentQIndex(0);
              setIsCompleted(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Take Live Test</span>
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'certificate'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>View Certificate</span>
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 4 Diagnostic Pillars Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillarScores.map((p, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Pillar {idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      {p.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{p.name}</h4>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-xs mb-1">
                    <span className="text-2xl font-black text-slate-900">{p.score}</span>
                    <span className="text-slate-400">/ 100</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Radar Chart & Archetype Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Radar Spider Chart (7 cols) */}
            <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Multi-Dimensional Capability Radar</h3>
                  <p className="text-xs text-slate-500">Your profile vs Industry Average Benchmark</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <span className="font-semibold text-slate-700">You (84 Avg)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="text-slate-500">Benchmark (70)</span>
                  </div>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar name="Your profile" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                    <Radar name="Benchmark" dataKey="benchmark" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>Diagnostic Verdict:</strong> Highest aptitude in algorithmic decomposition and conscientiousness. Recommended next target: Deepening SQL Joins & Schema Design.
                </span>
              </div>
            </div>

            {/* Cognitive & Career Archetype Summary (5 cols) */}
            <div className="col-span-12 lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                    Assessed Career Archetype
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold">
                    Tier 1 Fit
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">The Pragmatic Architect</h3>
                <p className="text-xs text-indigo-200/90 mt-2 leading-relaxed">
                  You demonstrate exceptional analytical rigor, high intrinsic curiosity for structural logic, and a steady, deliberate problem-solving methodology. You thrive building resilient systems rather than superficial rapid prototypes.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Top 8% Computational Speed</p>
                      <p className="text-[10px] text-indigo-200">Rapid pattern recognition in complex data</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">High Execution Conscientiousness</p>
                      <p className="text-[10px] text-indigo-200">Consistent follow-through on technical debt</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    setCurrentQIndex(0);
                  }}
                  className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Retake Full Diagnostic (4 Mins)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Interactive Mode */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                Question {currentQIndex + 1} of {questions.length}
              </span>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Pillar: {questions[currentQIndex].pillar} • {questions[currentQIndex].category}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Adaptive Timer</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 leading-relaxed">
              {questions[currentQIndex].question}
            </h3>

            <div className="space-y-2.5 pt-2">
              {questions[currentQIndex].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[questions[currentQIndex].id] === opt.scoreBoost;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(questions[currentQIndex].id, opt.scoreBoost)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-start gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="leading-relaxed flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel Diagnostic
            </button>
            <button
              disabled={!selectedAnswers[questions[currentQIndex].id]}
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Finish & Generate Score' : 'Next Question'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Official Certificate View */}
      {activeTab === 'certificate' && (
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border-2 border-indigo-200 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 mx-auto flex items-center justify-center shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              CareerPilot AI Official Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Certificate of Career Readiness
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Issued to <strong className="text-slate-800">{user?.name || 'Your profile'}</strong> on September 2026
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Target Role Fit</p>
              <p className="text-sm font-bold text-slate-900">{careerGoal?.career_title || 'Software Engineer'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Overall Readiness</p>
              <p className="text-sm font-bold text-emerald-600">{readinessScore?.overall || 72} / 100 (Tier A)</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Algorithmic Aptitude</p>
              <p className="text-sm font-bold text-slate-900">88th Percentile</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Verification ID</p>
              <p className="text-xs font-mono font-bold text-slate-600">CP-2026-ARV-9824</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                window.print();
                addToast({ type: 'info', title: 'Print Certificate', message: 'Print dialog initiated.' });
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Download Verified Certificate</span>
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              Back to Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
