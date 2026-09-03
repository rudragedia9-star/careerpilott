import React from 'react';
import { useApp } from '../../context/AppContext';
import { Career } from '../../types';
import {
  X,
  Target,
  Sparkles,
  TrendingUp,
  DollarSign,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Mic,
  BarChart3
} from 'lucide-react';

export const CareerDetailModal: React.FC = () => {
  const {
    selectedCareer,
    setSelectedCareer,
    careerGoal,
    setCareerGoal,
    skills,
    openInterviewModal,
    setActiveTab,
    openCompareModal
  } = useApp();

  if (!selectedCareer) return null;

  const isCurrentGoal = careerGoal?.career_id === selectedCareer.id;

  const handleSetGoal = async () => {
    await setCareerGoal(selectedCareer.id);
  };

  const handleStartLearning = () => {
    setSelectedCareer(null);
    setActiveTab('learn');
  };

  const handlePracticeInterview = () => {
    const roleTitle = selectedCareer.title;
    setSelectedCareer(null);
    openInterviewModal(roleTitle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative">
          <button
            onClick={() => setSelectedCareer(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              {selectedCareer.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 text-xs font-bold">
              {selectedCareer.match_score}% Match
            </span>
            {isCurrentGoal && (
              <span className="px-2.5 py-0.5 rounded-md bg-white text-indigo-950 text-xs font-black flex items-center gap-1">
                <Target className="w-3 h-3" />
                Your Primary Goal
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{selectedCareer.title}</h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl font-normal leading-relaxed">
            {selectedCareer.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-indigo-700/60 text-xs">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Salary Range: <strong>{selectedCareer.salary_range}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Outlook: <strong>{selectedCareer.growth_outlook}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Education: <strong>{selectedCareer.education_requirement}</strong></span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body (Section 10) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* A Day In The Life */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>What does this person do? • A Day in the Life</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedCareer.day_in_the_life}
            </p>
          </div>

          {/* Transparent Match Analysis (Section 8 & 10) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Match Breakdown & Why This Fits You
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-center">
                <span className="text-[10px] text-indigo-600 font-bold uppercase">Aptitude Match</span>
                <p className="text-xl font-black text-indigo-900 mt-0.5">{selectedCareer.match_breakdown.aptitude}%</p>
              </div>
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 text-center">
                <span className="text-[10px] text-sky-600 font-bold uppercase">Interest Fit</span>
                <p className="text-xl font-black text-sky-900 mt-0.5">{selectedCareer.match_breakdown.interest}%</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-center">
                <span className="text-[10px] text-purple-600 font-bold uppercase">Personality</span>
                <p className="text-xl font-black text-purple-900 mt-0.5">{selectedCareer.match_breakdown.personality}%</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                <span className="text-[10px] text-emerald-600 font-bold uppercase">Skill Overlap</span>
                <p className="text-xl font-black text-emerald-900 mt-0.5">{selectedCareer.match_breakdown.skills}%</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 text-xs text-indigo-950 leading-relaxed font-medium">
              💡 <strong>Why this matches you:</strong> {selectedCareer.why_matches}
            </div>
          </div>

          {/* Required Skills vs User Proficiency Benchmark (Section 10) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Required Skills Benchmark
            </h4>
            <div className="space-y-2.5">
              {selectedCareer.required_skills.map(req => {
                const userSkill = skills.all.find(s => s.skill_name.toLowerCase() === req.name.toLowerCase());
                const userProf = userSkill?.proficiency || 35;
                const isMet = userProf >= req.proficiency;

                return (
                  <div key={req.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        {req.name}
                        {isMet ? (
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Met
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                            <AlertCircle className="w-3 h-3" /> Gap ({req.proficiency - userProf}% needed)
                          </span>
                        )}
                      </span>
                      <span className="text-slate-600">
                        You: <strong className={isMet ? 'text-emerald-700' : 'text-amber-700'}>{userProf}%</strong> / Target: {req.proficiency}%
                      </span>
                    </div>

                    <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      {/* Target bar */}
                      <div
                        className="absolute top-0 bottom-0 bg-slate-300 rounded-full"
                        style={{ width: `${req.proficiency}%` }}
                      />
                      {/* User progress bar */}
                      <div
                        className={`absolute top-0 bottom-0 rounded-full ${isMet ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${userProf}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Roadmap Preview (Step 1 → Step 2 → Step 3) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Preparation Roadmap
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedCareer.roadmap_preview.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    Phase {idx + 1}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900">{step.phase}</h5>
                  <p className="text-[11px] text-slate-500 leading-snug">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions (Section 10) */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!isCurrentGoal ? (
              <button
                onClick={handleSetGoal}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Set as My Career Goal</span>
              </button>
            ) : (
              <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Active Target Goal</span>
              </span>
            )}

            <button
              onClick={() => {
                const targetCareer = selectedCareer;
                setSelectedCareer(null);
                openCompareModal(targetCareer);
              }}
              className="px-3 py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 text-xs font-semibold transition"
            >
              Compare Career
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePracticeInterview}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Practice Interview</span>
            </button>
            <button
              onClick={handleStartLearning}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start Learning Path</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
