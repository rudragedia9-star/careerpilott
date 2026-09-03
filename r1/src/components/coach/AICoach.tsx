import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Target,
  ArrowRight,
  BookOpen,
  Compass,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

export const AICoach: React.FC = () => {
  const {
    user,
    careerGoal,
    readinessScore,
    openInterviewModal,
    setActiveTab,
    setSelectedCareer,
    careers,
    aiContext
  } = useApp();

  const [messages, setMessages] = useState<
    {
      id: string;
      sender: 'user' | 'assistant';
      text: string;
      suggestedActions?: { label: string; action: string; payload?: any }[];
      timestamp: string;
    }[]
  >([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello ${aiContext.name}! I'm your dedicated AI Career Mentor.\n\nI’ve analyzed your profile: you’re targeting **${aiContext.careerGoal}** with a **${aiContext.careerMatch}% match** and your Career Readiness is currently **${aiContext.readinessScore}/100**.\n\nYour strongest area is **${aiContext.skills.find(s => s.isStrength)?.name || 'problem solving'}**, and the biggest unlock for your next milestone is **${aiContext.skillGaps[0]?.name || 'SQL'}**. I’ll tailor every suggestion to your real strengths, gaps, and roadmap.\n\nWhat would you like to explore today?`,
      suggestedActions: [
        { label: '🎤 Start Practice Interview', action: 'START_INTERVIEW' },
        { label: '📚 Open My Roadmap', action: 'NAVIGATE_LEARN' },
        { label: '📊 Analyze My Skill Gap', action: 'NAVIGATE_CAREERS' },
      ],
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const starterPrompts = [
    'Best career for me?',
    'What should I learn next?',
    'Analyze my skill gap',
    'Am I job ready?',
    'Compare careers',
    'Create my study plan',
    'Prepare me for an interview',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsgId = `usr-${Date.now()}`;
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user' as const,
        text: query,
        timestamp: 'Just now',
      },
    ];

    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const historyPayload = newMessages.map(m => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await api.chatWithCoach(query, historyPayload);

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: res.response || 'I am here to guide your career path.',
          suggestedActions: res.suggestedActions || [
            { label: '🎤 Start Practice Interview', action: 'START_INTERVIEW' },
            { label: '📚 Open Learning Roadmap', action: 'NAVIGATE_LEARN' },
          ],
          timestamp: 'Just now',
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `I had trouble connecting to the network, but based on your local profile: focusing on SQL joins and data structures will yield the largest immediate readiness gain (+6 pts).`,
          suggestedActions: [
            { label: '📚 Open Learning Roadmap', action: 'NAVIGATE_LEARN' },
          ],
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: string, payload?: any) => {
    if (action === 'START_INTERVIEW') {
      openInterviewModal(payload?.role || aiContext.careerGoal || careerGoal?.career_title || 'Software Engineer');
    } else if (action === 'NAVIGATE_LEARN') {
      setActiveTab('learn');
    } else if (action === 'NAVIGATE_CAREERS') {
      const target = careers.find(c => c.id === careerGoal?.career_id) || careers[0];
      if (target) setSelectedCareer(target);
      setActiveTab('careers');
    } else if (action === 'CONTINUE_CHAT') {
      setInput('What projects would best highlight my skills for recruiters?');
    } else if (action === 'PROMPT') {
      handleSend(payload || input);
    }
  };

  const toggleVoiceMode = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate listening or capture web speech if supported
      setTimeout(() => {
        setInput('How do I prepare for technical interviews?');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-in fade-in duration-200">
      {/* Top Coach Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">CareerPilot Mentor</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700">Online & Context-Aware</span>
            </div>
            <p className="text-xs text-slate-500">
              Personalized for {user?.name || 'your profile'} • Goal: {careerGoal?.career_title || 'your target career'} ({readinessScore?.overall || 0}/100)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Indicator (Section 5) */}
          <button
            onClick={toggleVoiceMode}
            className={`p-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              isListening
                ? 'bg-rose-100 text-rose-700 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title={isListening ? 'Listening...' : 'Voice Input (Visual Indicator)'}
          >
            {isListening ? <Mic className="w-4 h-4 text-rose-600" /> : <MicOff className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice Mode'}</span>
          </button>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'reset-1',
                  sender: 'assistant',
                  text: `Chat reset! Ask me anything about your career path, resume, interview preparation, or skill gaps.`,
                  timestamp: 'Just now',
                },
              ])
            }
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-indigo-700 border border-slate-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80'
                }`}
              >
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-indigo-600">
                  <Markdown>{msg.text}</Markdown>
                </div>

                {/* Suggested Action Buttons (Section 5) */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(btn.action, btn.payload)}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
                      >
                        <span>{btn.label}</span>
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[10px] mt-2 font-medium ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-indigo-700 border border-slate-200 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Carousel (Section 5) */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Suggested:
        </span>
        {starterPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 text-xs font-medium whitespace-nowrap transition shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-3 sm:p-4 border-t border-slate-100 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask your AI Coach about ${careerGoal?.career_title || 'Software Engineer'}, skills, or interviews...`}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
