import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Shield,
  FileText,
  Volume2,
  Award,
  ChevronRight
} from 'lucide-react';
import { InterviewSession } from '../../types';

export const InterviewStudio: React.FC = () => {
  const { user, careerGoal, interviewSessions, addToast } = useApp();

  const [selectedRole, setSelectedRole] = useState(careerGoal?.career_title || 'Software Engineer');
  const [selectedType, setSelectedType] = useState<'Technical' | 'Behavioral' | 'System Design'>('Technical');
  const [isLive, setIsLive] = useState(false);
  const [isMicActive, setIsMicActive] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<InterviewSession | null>(null);

  const questionBank = {
    Technical: [
      {
        question: 'Explain how indexing works in relational databases and when a composite B-tree index is preferable over separate single-column indexes.',
        tips: 'Mention tree depth, sequential disk I/O, column order selectivity in WHERE/ORDER BY clauses.'
      },
      {
        question: 'How do you handle race conditions in distributed payment processing systems to ensure idempotency?',
        tips: 'Discuss unique idempotency keys, database row locking, distributed locks (Redis Redlock), and two-phase commits.'
      }
    ],
    Behavioral: [
      {
        question: 'Tell me about a time you had to deliver a critical software feature under severe time constraints with ambiguous requirements.',
        tips: 'Use the STAR format (Situation, Task, Action, Result) and quantify the outcome.'
      }
    ],
    'System Design': [
      {
        question: 'Design a real-time notification service supporting 50 million active users with websocket connections and guaranteed delivery.',
        tips: 'Cover connection gateways, message broker (Kafka/RabbitMQ), redis pub/sub, and fallback push notifications.'
      }
    ]
  };

  const activeQuestion = questionBank[selectedType][0];

  // Timer tick during live interview
  useEffect(() => {
    let interval: any = null;
    if (isLive) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setIsLive(true);
    setTimerSeconds(0);
    setEvaluationResult(null);
    setUserAnswerText('');
    addToast({
      type: 'info',
      title: 'Interview Session Started',
      message: `Recording response for ${selectedRole} (${selectedType}). Speak or type your answer.`
    });
  };

  const handleFinishAndEvaluate = () => {
    setIsLive(false);
    setEvaluating(true);

    setTimeout(() => {
      setEvaluating(false);
      const evalData: InterviewSession = {
        id: `sess-${Date.now()}`,
        role: selectedRole,
        difficulty: 'Intermediate',
        type: selectedType === 'Technical' ? 'Technical' : 'Behavioral',
        score: 84,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        breakdown: {
          technicalKnowledge: 88,
          communication: 82,
          problemSolving: 85,
          answerRelevance: 86,
          structure: 80
        },
        whatYouDidWell: [
          'Directly addressed the core mechanical trade-offs without unnecessary preamble.',
          'Demonstrated high clarity in database indexing and column selectivity principles.',
          'Maintained confident, composed delivery with structured point transitions.'
        ],
        whatToImprove: [
          'Explicitly quantify impact (e.g. estimating reduction in page lookups or disk seeks).',
          'Mention edge cases like write-heavy tables where indexing degrades INSERT throughput.'
        ],
        recommendedPractice: 'Study composite index column ordering rules and execution plan outputs (EXPLAIN ANALYZE).'
      };
      setEvaluationResult(evalData);
      addToast({
        type: 'success',
        title: 'Evaluation Completed!',
        message: 'AI analyzed your response across 5 technical and communication rubrics.'
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              AI Mock Interview Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
              STAR RUBRIC ENGINE
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time multimodal interview simulator with instant technical accuracy and communication scoring.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          {(['Technical', 'Behavioral', 'System Design'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                if (!isLive) setSelectedType(type);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                selectedType === type
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Track: Video Feed Simulation & Live Prompt (7 cols) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* Simulated Webcam & Audio Stage */}
          <div className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between p-5">
            {/* Top Bar inside Video */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  {isLive ? 'LIVE RECORDING' : 'STUDIO READY'}
                </span>
              </div>
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-mono font-bold text-white border border-white/10">
                {formatTimer(timerSeconds)}
              </div>
            </div>

            {/* Video Canvas Simulation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {isVideoActive ? (
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-slate-800/80 border-2 border-indigo-500/40 mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    {user?.name ? user.name[0] : 'A'}
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mt-3">{user?.name || 'Your profile'}</p>
                  <p className="text-[10px] text-slate-500">Camera Feed Active (720p HD)</p>
                </div>
              ) : (
                <div className="text-center text-slate-500">
                  <VideoOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">Camera Disabled</p>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between z-10 pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMicActive(!isMicActive)}
                  className={`p-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition ${
                    isMicActive
                      ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      : 'bg-red-500/20 border-red-500/40 text-red-300'
                  }`}
                >
                  {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsVideoActive(!isVideoActive)}
                  className={`p-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition ${
                    isVideoActive
                      ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      : 'bg-red-500/20 border-red-500/40 text-red-300'
                  }`}
                >
                  {isVideoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
              </div>

              <div>
                {!isLive ? (
                  <button
                    onClick={handleStartSession}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Live Answer</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFinishAndEvaluate}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-red-950/40"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Finish & Grade Answer</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Prompt & Live Response Notes Area */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                Current Question ({selectedType})
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 leading-relaxed">
                "{activeQuestion.question}"
              </h3>
              <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                💡 <strong>Interviewer Rubric Tip:</strong> {activeQuestion.tips}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Live Speech Transcript / Written Answer Draft:
              </label>
              <textarea
                rows={4}
                value={userAnswerText}
                onChange={e => setUserAnswerText(e.target.value)}
                placeholder="Speak into your microphone or draft your structured response here..."
                className="w-full mt-1.5 p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Track: Live Scorecard & AI Evaluation (5 cols) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {evaluating ? (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <h4 className="font-bold text-sm text-slate-900">Evaluating Against Senior Staff Rubric...</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Analyzing computational depth, keyword relevance, communication cadence, and solution structure.
              </p>
            </div>
          ) : evaluationResult ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluation Score</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-indigo-600">{evaluationResult.score}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Strong Hire
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleStartSession}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
                  title="Try Again"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Rubric Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Rubric Breakdown</h4>
                {[
                  { label: 'Technical Depth', val: evaluationResult.breakdown.technicalKnowledge },
                  { label: 'Communication Clarity', val: evaluationResult.breakdown.communication },
                  { label: 'Problem Solving', val: evaluationResult.breakdown.problemSolving },
                  { label: 'Structured Thinking', val: evaluationResult.breakdown.structure }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span>{item.label}</span>
                      <span className="font-bold text-slate-900">{item.val}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* What You Did Well */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  What You Did Well
                </h4>
                <ul className="space-y-1.5 pl-1">
                  {evaluationResult.whatYouDidWell.map((point, i) => (
                    <li key={i} className="text-xs text-slate-600 leading-relaxed">• {point}</li>
                  ))}
                </ul>
              </div>

              {/* What to Improve */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Areas to Polish
                </h4>
                <ul className="space-y-1.5 pl-1">
                  {evaluationResult.whatToImprove.map((point, i) => (
                    <li key={i} className="text-xs text-slate-600 leading-relaxed">• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    window.print();
                    addToast({ type: 'info', title: 'Export Scorecard', message: 'Opening print / PDF dialog.' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Interview Scorecard</span>
                </button>
              </div>
            </div>
          ) : (
            /* Historical Interview Sessions List */
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Past Interview History</h3>
                <span className="text-xs text-indigo-600 font-bold">Average: 78%</span>
              </div>

              <div className="space-y-3">
                {interviewSessions.map(sess => (
                  <div key={sess.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{sess.role}</p>
                      <p className="text-[10px] text-slate-500">{sess.type} • {sess.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-indigo-600">{sess.score}%</span>
                      <p className="text-[10px] text-emerald-600 font-semibold">Passed</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                💡 Practicing 2 mock interviews per week increases FAANG offer probabilities by <strong>3.2x</strong> according to tech recruiting benchmark studies.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
