import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Career } from '../../types';
import {
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  DollarSign,
  GraduationCap,
  ArrowRight,
  Scale,
  Sliders,
  Target,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const CareerExplorer: React.FC = () => {
  const {
    careers,
    selectedCareer,
    setSelectedCareer,
    careerGoal,
    setCareerGoal,
    openCompareModal,
    readinessScore,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Section 12: What-If Career Simulator State
  const [simulatedSql, setSimulatedSql] = useState<number>(42);
  const [simulatedDs, setSimulatedDs] = useState<number>(51);

  const categories = [
    'All',
    'Tech & Engineering',
    'Data & AI',
    'Business & Product',
    'Design & Creative',
    'Science & Healthcare',
  ];

  const filteredCareers = careers.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Calculate simulated match and simulated readiness for Section 12
  // When SQL increases from 42% to 80%, SWE match increases from 91% to 94%, readiness from 72 to 78
  const baseSweMatch = 91;
  const sqlGain = Math.max(0, (simulatedSql - 42) / 38) * 3; // +3%
  const dsGain = Math.max(0, (simulatedDs - 51) / 34) * 2; // +2%
  const simulatedMatch = Math.min(99, Math.round(baseSweMatch + sqlGain + (dsGain * 0.5)));

  const baseReadiness = readinessScore?.overall || 72;
  const readinessGain = Math.round(((simulatedSql - 42) * 0.15) + ((simulatedDs - 51) * 0.1));
  const simulatedReadiness = Math.min(98, Math.max(baseReadiness, baseReadiness + readinessGain));

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Career Explorer & Recommendations
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">
          Transparent AI matching based on your aptitude, interests, personality, and skills.
        </p>
      </div>

      {/* SECTION 12: WHAT-IF CAREER SIMULATOR */}
      <section className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-indigo-800/80">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive What-If Career Simulator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
              See How Closing Skill Gaps Unlocks Your Career
            </h2>
            <p className="text-xs text-indigo-200 leading-relaxed font-normal">
              Simulate improving your core focus areas to watch your Software Engineer match and overall Career Readiness climb in real-time.
            </p>
          </div>

          {/* Real-time Projected Outcome Badges */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm shrink-0 border border-white/10">
            <div className="text-center px-2">
              <p className="text-xs text-indigo-200 font-semibold">Simulated Fit</p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-0.5">
                {simulatedMatch}%
              </p>
              <p className="text-[10px] text-slate-300">
                {simulatedMatch > 91 ? `+${simulatedMatch - 91}% gain` : 'Baseline'}
              </p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center px-2">
              <p className="text-xs text-indigo-200 font-semibold">Simulated Readiness</p>
              <p className="text-2xl sm:text-3xl font-black text-sky-400 mt-0.5">
                {simulatedReadiness} / 100
              </p>
              <p className="text-[10px] text-slate-300">
                {simulatedReadiness > baseReadiness ? `+${simulatedReadiness - baseReadiness} points` : 'Baseline'}
              </p>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* SQL Slider */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Simulate SQL Proficiency</span>
              <span className="font-extrabold text-amber-400">
                {simulatedSql}% <span className="text-slate-400 font-normal">(Base: 42%)</span>
              </span>
            </div>
            <input
              type="range"
              min={42}
              max={95}
              value={simulatedSql}
              onChange={e => setSimulatedSql(Number(e.target.value))}
              className="w-full h-2 bg-indigo-900/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <p className="text-[11px] text-slate-300">
              {simulatedSql >= 80 ? (
                <span className="text-emerald-300 font-medium">
                  ✓ Target reached! At 80%, SQL is no longer a gap and meets recruiter screening thresholds.
                </span>
              ) : (
                `Drag to 80% to see Career Match reach 94% and Readiness hit 78!`
              )}
            </p>
          </div>

          {/* Data Structures Slider */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Simulate Data Structures & Algorithms</span>
              <span className="font-extrabold text-sky-400">
                {simulatedDs}% <span className="text-slate-400 font-normal">(Base: 51%)</span>
              </span>
            </div>
            <input
              type="range"
              min={51}
              max={95}
              value={simulatedDs}
              onChange={e => setSimulatedDs(Number(e.target.value))}
              className="w-full h-2 bg-indigo-900/60 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <p className="text-[11px] text-slate-300">
              {simulatedDs >= 80 ? (
                <span className="text-emerald-300 font-medium">
                  ✓ Technical interview pass probability jumps from 54% to 88%.
                </span>
              ) : (
                `Boost algorithmic complexity understanding for technical coding rounds.`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search Controls (Section 9) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search careers (e.g. Software Engineer, Data Scientist, Product Manager)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white font-medium"
            />
          </div>

          {/* Compare Trigger */}
          <button
            onClick={() => openCompareModal()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
          >
            <Scale className="w-4 h-4 text-indigo-600" />
            <span>Compare Any 2 Careers</span>
          </button>
        </div>

        {/* Category Filter Chips (Section 9) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Careers Cards Grid (Section 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map(career => {
          const isGoal = careerGoal?.career_id === career.id;
          return (
            <div
              key={career.id}
              className={`rounded-3xl bg-white border p-6 flex flex-col justify-between transition hover:shadow-md ${
                isGoal ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-sm' : 'border-slate-200/80 shadow-2xs'
              }`}
            >
              <div>
                {/* Card Top Pill & Match Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wider">
                    {career.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                        career.match_score >= 85
                          ? 'bg-emerald-100 text-emerald-800'
                          : career.match_score >= 75
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {career.match_score}% Match
                    </span>
                  </div>
                </div>

                {/* Title & Tag */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{career.title}</h3>
                </div>

                <div className="mt-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {career.match_tag}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                  {career.description}
                </p>

                {/* Meta details (Section 9) */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Salary Range</span>
                    <span className="font-bold text-slate-800">{career.salary_range}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Growth Outlook</span>
                    <span className="font-bold text-emerald-600">{career.growth_outlook}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Education</span>
                    <span className="font-medium text-slate-700 truncate max-w-[140px]">
                      {career.education_requirement}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCareer(career)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openCompareModal(career)}
                  title="Compare with another career"
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
