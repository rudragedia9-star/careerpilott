import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, loginAsDemo, addToast, openOnboarding } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setForgotSent(true);
      addToast({
        type: 'info',
        title: 'Reset Link Sent',
        message: 'If an account exists with that email, a password reset link was dispatched.',
      });
      return;
    }

    if (mode === 'signup') {
      addToast({
        type: 'success',
        title: 'Account Created',
        message: `Welcome to CareerPilot AI, ${name || 'Learner'}! Let's set up your profile.`,
      });
      closeAuthModal();
      openOnboarding();
    } else {
      loginAsDemo();
      closeAuthModal();
    }
  };

  const handleDemoSignIn = async () => {
    await loginAsDemo();
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide uppercase text-indigo-100">CareerPilot AI</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Start Your Career Journey'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-indigo-100 mt-0.5">
            {mode === 'login' && 'Sign in to review your personalized roadmaps and interview scores'}
            {mode === 'signup' && 'Create your free learner account in seconds'}
            {mode === 'forgot' && 'Enter your student email address to receive reset instructions'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {mode === 'forgot' && forgotSent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Check Your Inbox</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                We sent a secure password reset link to <span className="font-semibold text-slate-700">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => { setMode('login'); setForgotSent(false); }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Taylor Morgan"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student / Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-indigo-600 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition flex items-center justify-center gap-1.5 mt-2"
              >
                <span>{mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-medium">Or for testing</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-Click Demo Profile</span>
              </button>

              {/* Mode toggle */}
              <div className="text-center text-xs text-slate-500 pt-2">
                {mode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="font-bold text-indigo-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-indigo-600 hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
