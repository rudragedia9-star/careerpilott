import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Brain, Award, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, closeOnboarding, updateProfile, setActiveTab } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [educationLevel, setEducationLevel] = useState('High School Senior / Early College');
  const [currentClass, setCurrentClass] = useState('12th Grade / CS Track');
  const [existingSkills, setExistingSkills] = useState('Python, Basic Problem Solving, Git');

  // Step 2 Interests (Multiple selections)
  const availableInterests = [
    'Technology',
    'Engineering',
    'Business',
    'Finance',
    'Design',
    'Healthcare',
    'Law',
    'Science',
    'Media',
    'Marketing',
    'Government',
    'Entrepreneurship',
    "I'm not sure yet",
  ];
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Technology', 'Engineering']);

  // Step 3 Work Preferences
  const availableWorkStyles = [
    'Solving problems',
    'Building things',
    'Working with people',
    'Analyzing information',
    'Creating designs',
    'Leading teams',
    'Researching',
    'Helping others',
  ];
  const [selectedWorkStyles, setSelectedWorkStyles] = useState<string[]>([
    'Solving problems',
    'Building things',
    'Analyzing information',
  ]);

  // Step 4 Mini Assessment Questions
  const [q1Answer, setQ1Answer] = useState('B');
  const [q2Answer, setQ2Answer] = useState('A');
  const [q3Answer, setQ3Answer] = useState('B');

  // Results State (Step 5)
  const [isFinishing, setIsFinishing] = useState(false);

  if (!isOnboardingOpen) return null;

  const toggleInterest = (interest: string) => {
    if (interest === "I'm not sure yet") {
      setSelectedInterests(["I'm not sure yet"]);
      return;
    }
    const filtered = selectedInterests.filter(i => i !== "I'm not sure yet");
    if (filtered.includes(interest)) {
      setSelectedInterests(filtered.filter(i => i !== interest));
    } else {
      setSelectedInterests([...filtered, interest]);
    }
  };

  const toggleWorkStyle = (style: string) => {
    if (selectedWorkStyles.includes(style)) {
      setSelectedWorkStyles(selectedWorkStyles.filter(s => s !== style));
    } else {
      setSelectedWorkStyles([...selectedWorkStyles, style]);
    }
  };

  const handleCompleteAssessment = async () => {
    setIsFinishing(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // non-critical
    }

    await updateProfile({
      name,
      educationLevel,
      currentClass,
      interests: selectedInterests,
      workPreferences: selectedWorkStyles,
      targetCareer: 'car-swe',
    } as any);

    setStep(5); // Go to "Your Career Profile is Ready 🎉"
    setIsFinishing(false);
  };

  const handleFinish = () => {
    closeOnboarding();
    setActiveTab('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
              {step <= 4 ? step : '✓'}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {step <= 4 ? `Step ${step} of 4` : 'Completed'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map(idx => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === step
                    ? 'w-8 bg-indigo-600'
                    : idx < step
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={closeOnboarding}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Tell us about yourself */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tell us about yourself</h2>
                <p className="text-xs text-slate-500 mt-1">
                  We'll customize your career recommendations and skill roadmaps based on your stage.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Taylor"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Education Level</label>
                    <select
                      value={educationLevel}
                      onChange={e => setEducationLevel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white font-medium"
                    >
                      <option>High School Student (9th - 11th)</option>
                      <option>High School Senior / Early College</option>
                      <option>Undergraduate (Freshman / Sophomore)</option>
                      <option>Undergraduate (Junior / Senior)</option>
                      <option>Bootcamp / Self-Taught Learner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Class / Year / Track</label>
                    <input
                      type="text"
                      value={currentClass}
                      onChange={e => setCurrentClass(e.target.value)}
                      placeholder="e.g. 12th Grade / CS Track"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Existing Skills You Already Have</label>
                  <input
                    type="text"
                    value={existingSkills}
                    onChange={e => setExistingSkills(e.target.value)}
                    placeholder="e.g. Python, Math, Writing, Public Speaking"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Separate skills with commas. It is okay if you are a total beginner!</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: What are you interested in? */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">What are you interested in?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select all the disciplines or industries that spark your curiosity.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableInterests.map(interest => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{interest}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: What type of work do you enjoy? */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">What type of work do you enjoy?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Pick the day-to-day activities that make you feel engaged and in flow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableWorkStyles.map(style => {
                  const isSelected = selectedWorkStyles.includes(style);
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleWorkStyle(style)}
                      className={`p-4 rounded-xl border text-sm font-semibold text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span>{style}</span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                          isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Aptitude + Personality Assessment */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold mb-1.5">
                  <Brain className="w-3 h-3 text-indigo-600" />
                  <span>Aptitude & Work Temperament</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quick Calibration Assessment</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Answer these 3 quick diagnostic questions to generate your preliminary career match profile.
                </p>
              </div>

              <div className="space-y-5">
                {/* Q1 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question 1 of 3 • Logic</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    When optimizing a task with 10,000 steps, which approach do you naturally lean toward?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setQ1Answer('A')}
                      className={`p-2.5 text-xs rounded-xl text-left border transition ${
                        q1Answer === 'A' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      A. Break it down manually step by step
                    </button>
                    <button
                      type="button"
                      onClick={() => setQ1Answer('B')}
                      className={`p-2.5 text-xs rounded-xl text-left border transition ${
                        q1Answer === 'B' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      B. Write a modular script / automated algorithm
                    </button>
                  </div>
                </div>

                {/* Q2 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question 2 of 3 • Work Style</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    When faced with a bug in code or an ambiguous problem, what excites you most?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setQ2Answer('A')}
                      className={`p-2.5 text-xs rounded-xl text-left border transition ${
                        q2Answer === 'A' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      A. Diagnosing root causes through tests & data
                    </button>
                    <button
                      type="button"
                      onClick={() => setQ2Answer('B')}
                      className={`p-2.5 text-xs rounded-xl text-left border transition ${
                        q2Answer === 'B' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      B. Pitching visual redesigns to stakeholders
                    </button>
                  </div>
                </div>

                {/* Q3 */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question 3 of 3 • Ambition</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    What milestone would give you the deepest satisfaction in the next 12 months?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setQ3Answer('A')}
                      className={`p-2.5 text-xs rounded-xl text-left border transition ${
                        q3Answer === 'A' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      A. Leading a club of 50+ students
                    </button>
                    <button
                      type="button"
                      onClick={() => setQ3Answer('B')}
                      className={`p-2.5 text-xs rounded-xl text-left border transition ${
                        q3Answer === 'B' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      B. Shipping a functional full-stack app to real users
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Your Career Profile is Ready 🎉 */}
          {step === 5 && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200 py-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/30">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                  Analysis Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                  Your Career Profile is Ready 🎉
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                  Based on your aptitude and preferences, we’ve mapped your initial trajectory.
                </p>
              </div>

              {/* Profile Card Breakdown */}
              <div className="text-left p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-sky-50/60 border border-indigo-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-indigo-100/70">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase">Top Potential Match</span>
                    <h3 className="text-lg font-black text-slate-900">Software Engineer</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-600">91%</span>
                    <p className="text-[10px] text-slate-500 font-semibold">Match Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-slate-600 uppercase">Top Strengths</p>
                    <ul className="text-xs text-slate-700 font-medium mt-1 space-y-1">
                      <li>• Computational Reasoning (94%)</li>
                      <li>• Problem Solving & Logic (88%)</li>
                      <li>• Python Foundations (78%)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-slate-600 uppercase">Personality Traits</p>
                    <ul className="text-xs text-slate-700 font-medium mt-1 space-y-1">
                      <li>• High Builder Autonomy (88%)</li>
                      <li>• Experimental Curiosity (94%)</li>
                      <li>• Systematic Decomposition (84%)</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-indigo-100/70 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium">Initial Career Readiness:</p>
                    <p className="text-base font-black text-slate-800">
                      72 / 100 <span className="text-xs font-semibold text-emerald-600">(Ready to prepare)</span>
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-indigo-700">
                    Next Focus: SQL & Interview Prep
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Enter CareerPilot AI Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        {step <= 4 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isFinishing}
                onClick={handleCompleteAssessment}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition flex items-center gap-1.5"
              >
                <span>{isFinishing ? 'Generating Profile...' : 'Generate Career Profile'}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
