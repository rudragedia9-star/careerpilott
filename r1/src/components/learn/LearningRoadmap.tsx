import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Star,
  ExternalLink,
  Sparkles,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LearningRoadmap: React.FC = () => {
  const {
    careerGoal,
    learningResources,
    learningProgress,
    updateResourceProgress,
    readinessScore,
    openInterviewModal,
  } = useApp();

  const [activeStageFilter, setActiveStageFilter] = useState<number | 'all'>('all');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('All');

  const resourceTypes = ['All', 'Course', 'Interactive', 'Project', 'Video'];

  const filteredResources = learningResources.filter(r => {
    const matchesStage = activeStageFilter === 'all' || r.stage === activeStageFilter;
    const matchesType = selectedResourceType === 'All' || r.type.toLowerCase() === selectedResourceType.toLowerCase();
    return matchesStage && matchesType;
  });

  const handleMarkComplete = async (resourceId: string) => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}

    await updateResourceProgress(resourceId, 100, true);
  };

  const handleQuickProgress = async (resourceId: string, currentVal: number) => {
    const nextVal = Math.min(100, currentVal + 25);
    await updateResourceProgress(resourceId, nextVal, nextVal === 100);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalized Learning Roadmap
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Step-by-step curriculum customized for your target goal: <strong>{careerGoal?.career_title || 'Software Engineer'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{learningProgress?.current_streak_days || 5} Day Study Streak</span>
          </div>

          <button
            onClick={() => openInterviewModal()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <span>Test via Mock Interview</span>
          </button>
        </div>
      </div>

      {/* Progress & Milestone Overview Banner (Section 13) */}
      <section className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              Curriculum Progress
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {learningProgress?.completed_modules || 5} of {learningProgress?.total_modules || 8} Modules Complete
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            You're on track for Job Readiness!
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Completing the remaining SQL & System Architecture modules will lift your overall readiness score to 80+.
          </p>

          <div className="pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Overall Completion</span>
              <span className="text-indigo-600">{learningProgress?.overall_percentage || 64}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${learningProgress?.overall_percentage || 64}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Stages Navigation Indicator (Section 13) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
          {[
            { stage: 1, title: 'Foundations', status: 'Completed' },
            { stage: 2, title: 'Core Skills', status: 'In Progress' },
            { stage: 3, title: 'Applied Projects', status: 'In Progress' },
            { stage: 4, title: 'Interview & Prep', status: 'Next Up' },
          ].map(st => (
            <button
              key={st.stage}
              onClick={() => setActiveStageFilter(activeStageFilter === st.stage ? 'all' : st.stage)}
              className={`p-3 rounded-2xl border text-center transition flex flex-col justify-center items-center min-w-[110px] ${
                activeStageFilter === st.stage
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase opacity-80">Stage {st.stage}</span>
              <p className="text-xs font-bold mt-0.5">{st.title}</p>
              <span
                className={`text-[9px] font-semibold mt-1 px-1.5 py-0.2 rounded-full ${
                  activeStageFilter === st.stage
                    ? 'bg-white/20 text-white'
                    : st.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {st.status}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Filter Chips for Resources */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Format:</span>
          {resourceTypes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedResourceType(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                selectedResourceType === t
                  ? 'bg-slate-900 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeStageFilter !== 'all' && (
          <button
            onClick={() => setActiveStageFilter('all')}
            className="text-xs text-indigo-600 hover:underline font-bold"
          >
            Show All Stages
          </button>
        )}
      </div>

      {/* Resource Cards (Sections 13 & 14) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(resource => {
          const isDone = resource.status === 'completed';
          const isInProgress = resource.status === 'in_progress';
          const isLocked = resource.status === 'locked';

          return (
            <div
              key={resource.id}
              className={`p-6 rounded-3xl bg-white border flex flex-col justify-between transition hover:shadow-md ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : isInProgress
                  ? 'border-indigo-200 ring-1 ring-indigo-200'
                  : 'border-slate-200/80 opacity-80'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wider">
                      Stage {resource.stage} • {resource.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {resource.difficulty}
                    </span>
                  </div>

                  {isDone && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Completed
                    </span>
                  )}
                  {isInProgress && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      In Progress ({resource.progress}%)
                    </span>
                  )}
                  {isLocked && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h4 className="text-lg font-bold text-slate-900 leading-snug">{resource.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{resource.description}</p>

                {/* Why It's Recommended For You (Section 14) */}
                <div className="mt-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed">
                  💡 <strong>Why this is recommended:</strong> {resource.why_recommended}
                </div>

                {/* Skills Covered & Duration */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {(resource.skills_covered || []).map(s => (
                        <span key={s} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {resource.estimated_time}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {resource.rating}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDone ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${resource.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-2">
                  {!isDone && (
                    <button
                      onClick={() => handleQuickProgress(resource.id, resource.progress)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      +25% Progress
                    </button>
                  )}

                  {!isDone ? (
                    <button
                      onClick={() => handleMarkComplete(resource.id)}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1"
                    >
                      <span>Complete</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => updateResourceProgress(resource.id, 50, false)}
                      className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-600 text-xs font-medium transition"
                    >
                      Mark Incomplete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
