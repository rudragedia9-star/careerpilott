import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Video,
  X
} from 'lucide-react';
import { Mentor } from '../../types';

export const MentorNetwork: React.FC = () => {
  const { user, addToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 4:00 PM EST');
  const [sessionTopic, setSessionTopic] = useState('Career Roadmap & Resume Review');

  // Preloaded elite mentors
  const mentors: Mentor[] = [
    {
      id: 'mentor-1',
      name: 'Dr. Priya Raman',
      role: 'Staff Software Engineer',
      company: 'Google (Cloud Infrastructure)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      experienceYears: 9,
      skills: ['Distributed Systems', 'Go', 'Kubernetes', 'System Design'],
      rating: 4.98,
      reviewsCount: 142,
      bio: 'Ex-Amazon, currently leading high-throughput storage systems at Google. Passionate about helping early-career engineers ace system design and code interviews.',
      hourlyRate: 'Free for Students',
      availableNext: 'Tomorrow, 4:00 PM EST',
      isVerified: true
    },
    {
      id: 'mentor-2',
      name: 'Marcus Vance',
      role: 'Senior Full Stack Lead',
      company: 'Stripe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      experienceYears: 7,
      skills: ['React', 'Node.js', 'PostgreSQL', 'API Architecture'],
      rating: 4.95,
      reviewsCount: 98,
      bio: 'Architect of developer-facing payment APIs. Specializes in practical full-stack project building and algorithmic problem breakdown.',
      hourlyRate: 'Free for Students',
      availableNext: 'Friday, 2:30 PM EST',
      isVerified: true
    },
    {
      id: 'mentor-3',
      name: 'Elena Rostova',
      role: 'Principal Machine Learning Engineer',
      company: 'Meta AI',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      experienceYears: 10,
      skills: ['PyTorch', 'Large Language Models', 'Computer Vision', 'MLOps'],
      rating: 5.0,
      reviewsCount: 210,
      bio: 'Deep learning researcher and engineering manager. Mentored 40+ junior developers transitioning from academic math into industry AI engineering.',
      hourlyRate: 'Free for Students',
      availableNext: 'Monday, 6:00 PM EST',
      isVerified: true
    },
    {
      id: 'mentor-4',
      name: 'Devon Miller',
      role: 'Engineering Director',
      company: 'Amazon Web Services',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      experienceYears: 12,
      skills: ['AWS Serverless', 'Career Strategy', 'Behavioral Interviews (STAR)'],
      rating: 4.92,
      reviewsCount: 165,
      bio: 'Bar Raiser interviewer at Amazon with 400+ interview loops conducted. Master the STAR behavioral method and technical leadership principles.',
      hourlyRate: 'Free for Students',
      availableNext: 'Saturday, 11:00 AM EST',
      isVerified: true
    }
  ];

  const filteredMentors = mentors.filter(m => {
    const matchesCategory =
      selectedCategory === 'all' ||
      m.skills.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      m.role.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleConfirmBooking = () => {
    if (!bookingMentor) return;
    addToast({
      type: 'success',
      title: '1:1 Mentorship Session Booked!',
      message: `Confirmed session with ${bookingMentor.name} for ${selectedSlot}. Calendar invitation sent to ${user?.email || 'your email'}.`
    });
    setBookingMentor(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Alumni & Elite Mentorship Network
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              VERIFIED 1:1
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Connect directly with verified staff engineers and engineering managers from Google, Stripe, Meta, and AWS.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Free Sponsored Sessions for Demo Profile</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by mentor name, company, or skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Mentors' },
            { id: 'systems', label: 'Systems & Cloud' },
            { id: 'full stack', label: 'Full Stack' },
            { id: 'models', label: 'AI & ML' },
            { id: 'behavioral', label: 'Behavioral & STAR' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map(mentor => (
          <div
            key={mentor.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition"
          >
            <div>
              {/* Header Profile Row */}
              <div className="flex items-start gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                      <span>{mentor.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{mentor.rating}</span>
                      <span className="text-slate-400 font-normal">({mentor.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-indigo-600 mt-0.5">{mentor.role}</p>
                  <p className="text-xs text-slate-500">{mentor.company} • {mentor.experienceYears} yrs exp</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 mt-4 leading-relaxed line-clamp-3">
                {mentor.bio}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {mentor.skills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-[11px] font-semibold border border-slate-200/70"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Booking Action Row */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Next Available Slot
                </span>
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-indigo-600" />
                  {mentor.availableNext}
                </span>
              </div>

              <button
                onClick={() => setBookingMentor(mentor)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Video className="w-3.5 h-3.5 text-indigo-400" />
                <span>Book 1:1 Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={bookingMentor.avatar}
                  alt={bookingMentor.name}
                  className="w-10 h-10 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{bookingMentor.name}</h3>
                  <p className="text-xs text-slate-500">{bookingMentor.role} • {bookingMentor.company}</p>
                </div>
              </div>
              <button
                onClick={() => setBookingMentor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Select Session Topic</label>
                <select
                  value={sessionTopic}
                  onChange={e => setSessionTopic(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium text-slate-800"
                >
                  <option value="Career Roadmap & Resume Review">Career Roadmap & Resume Review (30 mins)</option>
                  <option value="System Design & Technical Architecture Deep-Dive">System Design & Technical Architecture Deep-Dive (45 mins)</option>
                  <option value="Mock Behavioral STAR Interview & Feedback">Mock Behavioral STAR Interview & Feedback (45 mins)</option>
                  <option value="FAANG Transition & Portfolio Strategy">FAANG Transition & Portfolio Strategy (30 mins)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Choose Available Timeslot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {[
                    'Tomorrow, 4:00 PM EST',
                    'Tomorrow, 5:30 PM EST',
                    'Friday, 2:30 PM EST',
                    'Saturday, 11:00 AM EST'
                  ].map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                        selectedSlot === slot
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">Student & Hackathon Sponsorship:</span>
                <span className="font-extrabold text-emerald-700">100% Free ($0)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setBookingMentor(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
              >
                Confirm & Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
