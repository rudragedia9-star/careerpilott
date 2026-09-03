import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Shield, ArrowRight, Lock, Mail, User, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  initialMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode = 'login', onSuccess }) => {
  const { login, signup, addToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTabChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Full name is required.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const res = mode === 'login'
        ? await login(email, password)
        : await signup(name.trim(), email, password);

      if (res && res.error) {
        setError(res.error);
        return;
      }

      addToast({
        type: 'success',
        title: mode === 'login' ? 'Welcome Back!' : 'Account Created!',
        message: mode === 'login' ? 'Signed in successfully.' : 'Welcome to CareerPilot AI! Let’s get started.',
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-4 shadow-lg shadow-indigo-950">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white font-display">
            CareerPilot <span className="text-indigo-400">AI</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Your AI-Powered Career Intelligence & Job Readiness Platform
          </p>
        </div>

        <div className="mt-8 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80">
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800/80 mb-6">
            <button type="button" onClick={() => handleTabChange('login')} className={`py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${mode === 'login' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950' : 'text-slate-400 hover:text-white'}`}>
              Sign In
            </button>
            <button type="button" onClick={() => handleTabChange('signup')} className={`py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${mode === 'signup' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950' : 'text-slate-400 hover:text-white'}`}>
              Create Account
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input type="text" required placeholder="e.g. Parth Sharma" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input type="email" required placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input type="password" required placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-950 border border-indigo-400/20 cursor-pointer disabled:opacity-50">
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create Your Free Account'}</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Protected by end-to-end user isolation & session security.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
