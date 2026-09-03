import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Bot,
  Brain,
  ShieldCheck,
  ChevronRight,
  Zap,
  Play
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  const { loginAsDemo, openAuthModal, openOnboarding, setActiveTab } = useApp();

  const handleDiscoverCareer = () => {
    openOnboarding();
  };

  const handleExploreCareers = () => {
    onEnterApp();
    setActiveTab('careers');
  };

  const handleDemoClick = async () => {
    await loginAsDemo();
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-[-0.04em] text-white">
              CareerPilot
              <span className="ml-1 bg-gradient-to-r from-[#7ae8ff] via-[#8ea7ff] to-[#8fe8c8] bg-clip-text text-transparent font-black">
                AI
              </span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Your AI-powered career journey
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDemoClick}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 border border-slate-700 transition flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Try Demo Profile</span>
          </button>
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Built for students and early-career learners</span>
          </motion.div>

          {/* Typography showcase matching the provided direction */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 overflow-hidden rounded-[28px] border border-[#f7d5db] shadow-[0_30px_80px_rgba(200,100,130,0.3)]"
            style={{ background: '#d98fa3' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="min-h-[220px] md:min-h-[260px] border-b border-r border-[#f7d9df] px-8 py-8 md:px-12 md:py-12 text-[#fff8f8]">
                <div className="cs-guthen text-[3.8rem] md:text-[6rem] leading-[0.8] tracking-[-0.06em]">Serif.</div>
                <div className="mt-5 poppins text-base md:text-[1.55rem] leading-relaxed text-[#fff4f5] opacity-95">
                  Traditional, have feet.
                </div>
              </div>

              <div className="min-h-[220px] md:min-h-[260px] border-b border-[#f7d9df] px-8 py-8 md:px-12 md:py-12 text-[#fff8f8]">
                <div className="cs-guthen text-[3.1rem] md:text-[5.6rem] leading-[0.8] tracking-[-0.07em]">Sans Serif.</div>
                <div className="mt-5 poppins text-base md:text-[1.55rem] leading-relaxed text-[#fff4f5] opacity-95">
                  Modern, feet free.
                </div>
              </div>

              <div className="min-h-[220px] md:min-h-[260px] border-r border-[#f7d9df] px-8 py-8 md:px-12 md:py-12 text-[#fff8f8]">
                <div className="cs-guthen text-[4.2rem] md:text-[6.5rem] leading-[0.75] tracking-[-0.04em]">Script</div>
                <div className="mt-5 poppins text-base md:text-[1.55rem] leading-relaxed text-[#fff4f5] opacity-95">
                  Cursive, more decorative.
                </div>
              </div>

              <div className="min-h-[220px] md:min-h-[260px] px-8 py-8 md:px-12 md:py-12 text-[#fff8f8]">
                <div className="cs-guthen text-[3.2rem] md:text-[6rem] leading-[0.8] tracking-[-0.08em]">Display</div>
                <div className="mt-5 poppins text-base md:text-[1.55rem] leading-relaxed text-[#fff4f5] opacity-95">
                  Decorative, focal point of designs.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="minimal-3d-scene mx-auto mt-8 max-w-4xl"
          >
            <div className="glow-orb left-12 top-10 h-28 w-28" />
            <div className="glow-orb right-12 bottom-8 h-32 w-32" />

            <div className="relative mx-auto flex h-[260px] items-center justify-center md:h-[320px]">
              <div className="floating-3d-card float-soft-slow absolute left-8 top-12 h-32 w-40 rounded-[26px] border border-white/25 bg-slate-900/80 p-4 text-left text-white md:left-12 md:top-16 md:h-40 md:w-52">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-sky-300">Match</span>
                  <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-[9px] font-bold text-emerald-300">91%</span>
                </div>
                <div className="text-3xl font-black md:text-5xl">AI</div>
                <div className="mt-4 h-2 w-20 rounded-full bg-white/15">
                  <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                </div>
              </div>

              <div className="floating-3d-card float-soft absolute right-8 top-6 h-40 w-52 rounded-[30px] border border-indigo-200/20 bg-gradient-to-br from-indigo-600/80 via-blue-500/80 to-sky-400/80 p-5 text-white md:right-14 md:top-10 md:h-48 md:w-64">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-100">Roadmap</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold">Live</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-28 rounded-full bg-white/25" />
                  <div className="h-2.5 w-20 rounded-full bg-white/20" />
                  <div className="h-2.5 w-24 rounded-full bg-white/20" />
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-black md:text-4xl">72</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-100/80">readiness</div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl shadow-inner shadow-white/20">✦</div>
                </div>
              </div>

              <div className="floating-3d-card float-soft-slow absolute bottom-4 left-1/2 h-32 w-48 -translate-x-1/2 rounded-[28px] border border-white/20 bg-slate-950/80 p-4 text-white md:h-36 md:w-56">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-emerald-300">Skill gap</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">SQL</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 shadow-lg shadow-emerald-500/30" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
                    </div>
                    <div className="h-2 w-3/4 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={handleDiscoverCareer}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <span>Discover My Career</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleExploreCareers}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <span>Explore Careers</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>
        </div>

        {/* Product Preview Card (Prompt Section 1 Mandate) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/60 p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold text-xs">
                  Active Career Roadmap
                </span>
                <span className="text-xs text-slate-400">• Personalized learner profile</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Software Engineer Track</h2>
            </div>
            <button
              onClick={handleDemoClick}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive Live Demo</span>
            </button>
          </div>

          {/* 4 Required Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Career Match</p>
              <p className="text-2xl font-black text-indigo-400 mt-1">91%</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Top recommendation</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Career Readiness</p>
              <p className="text-2xl font-black text-sky-400 mt-1">72 / 100</p>
              <p className="text-[11px] text-emerald-400 font-medium mt-0.5">+8% this month</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Skill Progress</p>
              <p className="text-2xl font-black text-amber-400 mt-1">64%</p>
              <p className="text-[11px] text-slate-400 mt-0.5">5/8 modules done</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Interview Score</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">78 / 100</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Technical & behavioral</p>
            </div>
          </div>

          {/* Next Best Action Banner inside preview */}
          <div className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-indigo-300">💡 AI Recommendation</p>
              <p className="text-sm text-slate-200 font-medium mt-0.5">
                “Improve your SQL fundamentals before starting Machine Learning.”
              </p>
            </div>
            <button
              onClick={handleDemoClick}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition"
            >
              Start Learning →
            </button>
          </div>
        </motion.div>

        {/* The 5 Product Loop Pillars (Section 1) */}
        <section className="mt-28 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              The Connected Career Loop
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Know Me → Guide Me → Prepare Me → Improve Me
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Not a superficial quiz. A persistent intelligence platform tracking your transformation from curiosity to job-ready competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">1. Discover Your Strengths</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Take multi-dimensional cognitive, personality, and work-style assessments designed specifically for young learners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">2. Find Careers That Fit</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Transparent match scores showing the exact breakdown of aptitude, interests, personality, and current skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">3. Build Your Skills</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Identify concrete skill gaps and follow step-by-step modular learning roadmaps tailored to your dream career.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">4. Practice with AI</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Dynamic mock interviews that adapt on the fly based on your previous answers and target role difficulty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/40 transition md:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">5. Track Your Growth Over Time</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Watch your Readiness Score climb from 58 to 64 to 72+ as you finish lessons, take assessments, and ace mock interviews.
              </p>
            </div>
          </div>
        </section>

        {/* Strong Final CTA */}
        <section className="mt-28 text-center p-10 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30">
          <h3 className="text-3xl font-extrabold text-white">Ready to pilot your career journey?</h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
            Join thousands of high school and university students discovering and building their dream careers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button
              onClick={handleDiscoverCareer}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition"
            >
              Discover My Career Now
            </button>
            <button
              onClick={handleDemoClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              Explore Live Demo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© 2026 CareerPilot AI. Your AI-powered career journey.</p>
      </footer>
    </div>
  );
};
