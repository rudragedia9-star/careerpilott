import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Career } from '../../types';
import { X, ArrowRight, CheckCircle2, TrendingUp, DollarSign, Target, Sparkles, Scale } from 'lucide-react';

export const CareerCompareModal: React.FC = () => {
  const {
    compareCareerA,
    compareCareerB,
    closeCompareModal,
    careers,
    setCareerGoal
  } = useApp();

  const [careerAId, setCareerAId] = useState(compareCareerA?.id || careers[0]?.id || 'car-swe');
  const [careerBId, setCareerBId] = useState(compareCareerB?.id || careers[1]?.id || 'car-ds');

  if (!compareCareerA) return null;

  const currentA = careers.find(c => c.id === careerAId) || compareCareerA;
  const currentB = careers.find(c => c.id === careerBId) || compareCareerB || careers[1];

  const handleSelectGoal = async (careerId: string) => {
    await setCareerGoal(careerId);
    closeCompareModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Career Comparison</h3>
              <p className="text-[11px] text-slate-500 font-medium">Side-by-side decision analyzer</p>
            </div>
          </div>

          <button
            onClick={closeCompareModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Career Selectors */}
        <div className="p-4 sm:p-6 bg-slate-50/50 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Career A</label>
            <select
              value={careerAId}
              onChange={e => setCareerAId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-white"
            >
              {careers.map(c => (
                <option key={c.id} value={c.id} disabled={c.id === careerBId}>
                  {c.title} ({c.match_score}% match)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Career B</label>
            <select
              value={careerBId}
              onChange={e => setCareerBId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-white"
            >
              {careers.map(c => (
                <option key={c.id} value={c.id} disabled={c.id === careerAId}>
                  {c.title} ({c.match_score}% match)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table / Cards (Section 11) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* AI Decision Helper Banner (Section 11) */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 leading-relaxed">
              <span className="font-extrabold uppercase tracking-wide text-indigo-900 block mb-0.5">
                Which one is better for you?
              </span>
              {currentA.match_score >= currentB.match_score ? (
                <>
                  Based on your high computational score (94%) and existing Python familiarity,{' '}
                  <strong>{currentA.title}</strong> has a higher current match (
                  <strong>{currentA.match_score}%</strong> vs {currentB.match_score}%). However,{' '}
                  <strong>{currentB.title}</strong> offers an attractive alternative if you want to deepen statistics and machine learning modeling.
                </>
              ) : (
                <>
                  <strong>{currentB.title}</strong> matches your current profile slightly higher (
                  <strong>{currentB.match_score}%</strong> vs {currentA.match_score}%), but both are in your high-fit zone!
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Column A */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
              <div className="pb-3 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{currentA.category}</span>
                  <h4 className="text-lg font-black text-slate-900">{currentA.title}</h4>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-600">{currentA.match_score}%</span>
                  <p className="text-[10px] text-slate-400 font-bold">Fit Score</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Salary Range:</span>
                  <p className="font-bold text-slate-800">{currentA.salary_range}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Growth Outlook:</span>
                  <p className="font-bold text-emerald-600">{currentA.growth_outlook}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Learning Curve:</span>
                  <p className="font-bold text-slate-800">{currentA.learning_curve}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Key Skills Needed:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentA.required_skills.map(s => (
                      <span key={s.name} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {s.name} ({s.proficiency}%)
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Day in the Life:</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">{currentA.day_in_the_life}</p>
                </div>
              </div>

              <button
                onClick={() => handleSelectGoal(currentA.id)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition"
              >
                Choose {currentA.title}
              </button>
            </div>

            {/* Column B */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
              <div className="pb-3 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{currentB.category}</span>
                  <h4 className="text-lg font-black text-slate-900">{currentB.title}</h4>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-sky-600">{currentB.match_score}%</span>
                  <p className="text-[10px] text-slate-400 font-bold">Fit Score</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Salary Range:</span>
                  <p className="font-bold text-slate-800">{currentB.salary_range}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Growth Outlook:</span>
                  <p className="font-bold text-emerald-600">{currentB.growth_outlook}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Learning Curve:</span>
                  <p className="font-bold text-slate-800">{currentB.learning_curve}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Key Skills Needed:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentB.required_skills.map(s => (
                      <span key={s.name} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {s.name} ({s.proficiency}%)
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Day in the Life:</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">{currentB.day_in_the_life}</p>
                </div>
              </div>

              <button
                onClick={() => handleSelectGoal(currentB.id)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
              >
                Choose {currentB.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
