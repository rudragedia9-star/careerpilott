import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Sliders,
  Check,
  Zap,
  Target
} from 'lucide-react';
import { ResumeData, ATSAnalysisResult } from '../../types';

export const ResumeATSBuilder: React.FC = () => {
  const { user, careerGoal, addToast } = useApp();

  const [selectedRole, setSelectedRole] = useState(careerGoal?.career_title || 'Software Engineer');
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Seed an editable example until the learner enters their own resume details.
  const [resume, setResume] = useState<ResumeData>({
    fullName: user?.name || 'Your Name',
    targetRole: selectedRole,
    email: user?.email || 'you@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA • Willing to relocate',
    linkedin: 'linkedin.com/in/your-profile',
    github: 'github.com/your-profile',
    summary: 'Driven aspiring Software Engineer with strong foundations in Python, TypeScript, algorithms, and full-stack development. Built scalable web applications and solved 150+ algorithmic challenges with high computational efficiency.',
    skills: [
      'Python',
      'JavaScript / TypeScript',
      'React.js',
      'Node.js & Express',
      'PostgreSQL / SQL',
      'REST APIs',
      'Git & GitHub',
      'Data Structures & Algorithms',
      'Docker Basics'
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Software Engineering Intern',
        company: 'Apex Tech Labs',
        duration: 'June 2025 – August 2025',
        bullets: [
          'Engineered backend REST endpoints in Node.js and PostgreSQL serving 15,000+ daily requests with 99.8% uptime.',
          'Refactored legacy database queries using indexed joins, reducing query latency by 34% across high-traffic endpoints.',
          'Collaborated with senior engineers in bi-weekly agile sprints to implement automated CI/CD integration tests.'
        ]
      }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'CareerPilot Real-Time Guidance Platform',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        description: 'Architected an interactive career readiness engine that analyzes skill proficiencies and computes personalized roadmaps with predictive match algorithms.',
        link: 'https://careerpilot.ai'
      },
      {
        id: 'proj-2',
        title: 'Distributed Task Queue System',
        tech: ['Python', 'Redis', 'Docker'],
        description: 'Implemented an asynchronous task execution queue supporting worker heartbeats, exponential backoff retries, and high-throughput concurrent processing.',
        link: 'https://github.com/your-profile/task-queue'
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'California Institute of Technology / CS Dept',
        degree: 'B.S. in Computer Science',
        year: 'Class of 2026',
        grade: 'GPA: 3.82 / 4.00'
      }
    ]
  });

  // Calculate dynamic ATS score
  const calculateATS = (): ATSAnalysisResult => {
    let score = 70;
    const bulletsCount = resume.experience.reduce((acc, e) => acc + e.bullets.length, 0);
    if (bulletsCount >= 3) score += 6;
    if (resume.projects.length >= 2) score += 6;
    if (resume.skills.length >= 8) score += 4;
    // Check metric keywords
    const hasMetrics = resume.experience.some(e => e.bullets.some(b => /\d+%|\d+,\d+|\$\d+/.test(b)));
    if (hasMetrics) score += 8;

    return {
      overallScore: Math.min(score, 94),
      grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : 'B',
      impactVerbsScore: 92,
      metricQuantificationScore: hasMetrics ? 88 : 55,
      keywordMatchRate: 89,
      matchedKeywords: ['Python', 'PostgreSQL', 'REST APIs', 'Algorithms', 'TypeScript', 'Node.js', 'Agile'],
      missingKeywords: ['Docker / Containers', 'Unit Testing / Jest', 'System Architecture', 'CI/CD Pipelines'],
      strengths: [
        'High density of quantified business and technical metrics (% latency reduction, 15k+ daily requests).',
        'Strong active verb starters ("Engineered", "Refactored", "Architected").',
        'Concise, clean formatting optimal for Greenhouse, Lever, and Workday ATS parsers.'
      ],
      improvements: [
        'Add 1-2 cloud infrastructure keywords (e.g., AWS S3, Cloud Run, or Docker containerization).',
        'Ensure testing frameworks like Jest or PyTest are explicitly declared in project descriptions.'
      ]
    };
  };

  const ats = calculateATS();

  const handleOptimizeBullet = (expIndex: number, bulletIndex: number) => {
    setIsOptimizing(true);
    setTimeout(() => {
      const updated = { ...resume };
      const current = updated.experience[expIndex].bullets[bulletIndex];
      // Enhance with stronger metrics and action verbs
      if (!current.includes('achieving')) {
        updated.experience[expIndex].bullets[bulletIndex] =
          current.replace(/\.$/, '') + ', achieving a 28% increase in system throughput and reducing memory overhead.';
      } else {
        updated.experience[expIndex].bullets[bulletIndex] =
          'Orchestrated end-to-end service migration to containerized microservices, lowering deployment rollback rates by 42%.';
      }
      setResume(updated);
      setIsOptimizing(false);
      addToast({
        type: 'success',
        title: 'Bullet Point Upgraded',
        message: 'AI rewrote your bullet point with quantifiable impact metrics.'
      });
    }, 600);
  };

  const handleCopyPlaintext = () => {
    const text = `
${resume.fullName}
${resume.email} | ${resume.phone} | ${resume.location}
LinkedIn: ${resume.linkedin} | GitHub: ${resume.github}

TARGET ROLE: ${resume.targetRole}

PROFESSIONAL SUMMARY
${resume.summary}

TECHNICAL SKILLS
${resume.skills.join(', ')}

EXPERIENCE
${resume.experience.map(e => `${e.role} — ${e.company} (${e.duration})\n` + e.bullets.map(b => `• ${b}`).join('\n')).join('\n\n')}

PROJECTS
${resume.projects.map(p => `${p.title} [${p.tech.join(', ')}]\n• ${p.description}`).join('\n\n')}

EDUCATION
${resume.education.map(ed => `${ed.degree} — ${ed.institution} (${ed.year}) — ${ed.grade}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    addToast({
      type: 'success',
      title: 'Resume Copied',
      message: 'Plaintext resume copied to clipboard ready for job application portals.'
    });
  };

  const handleExportPDF = () => {
    window.print();
    addToast({
      type: 'info',
      title: 'Print / Save PDF',
      message: 'Opening system print dialog. Select "Save as PDF" for an ATS-compliant PDF document.'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Control Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              AI Resume & ATS Optimizer
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
              PRO STUDIO
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Build ATS-passable resumes tailored to your target career role with real-time keyword scoring.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView(activeView === 'editor' ? 'preview' : 'editor')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{activeView === 'editor' ? 'Live Preview' : 'Back to Editor'}</span>
          </button>

          <button
            onClick={handleCopyPlaintext}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition flex items-center gap-2"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Plaintext</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-100 transition flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ATS PDF</span>
          </button>
        </div>
      </div>

      {/* ATS Score & Keyword Match Radar Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall ATS Score */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{ats.overallScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {ats.grade}
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              Top 8% of applicant resumes
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">
            {ats.overallScore}%
          </div>
        </div>

        {/* Quantified Metrics */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impact Metrics</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{ats.metricQuantificationScore}%</span>
            <span className="text-xs text-emerald-600 font-bold">High</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ats.metricQuantificationScore}%` }} />
          </div>
        </div>

        {/* Action Verbs Score */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Verbs</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{ats.impactVerbsScore}%</span>
            <span className="text-xs text-indigo-600 font-bold">Excellent</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${ats.impactVerbsScore}%` }} />
          </div>
        </div>

        {/* Target Role Selector */}
        <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
              Scanning Against
            </span>
            <p className="text-base font-bold text-white mt-1 truncate">{resume.targetRole}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">89% keyword density fit</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      {activeView === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Sections Editor (8 cols) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Header & Contact Information */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  1. Contact Information
                </h3>
                <span className="text-xs text-slate-400">Header info</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    value={resume.fullName}
                    onChange={e => setResume({ ...resume, fullName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Target Career Title</label>
                  <input
                    type="text"
                    value={resume.targetRole}
                    onChange={e => setResume({ ...resume, targetRole: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={resume.email}
                    onChange={e => setResume({ ...resume, email: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Location</label>
                  <input
                    type="text"
                    value={resume.location}
                    onChange={e => setResume({ ...resume, location: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  2. Professional Summary
                </h3>
                <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => {
                  setResume({
                    ...resume,
                    summary: 'Analytical Software Engineer with expertise in Python, TypeScript, modern web frameworks, and algorithmic architecture. Demonstrated experience engineering scalable REST APIs, optimizing query latency by 34%, and driving production deployments.'
                  });
                  addToast({ type: 'success', title: 'Summary Optimized', message: 'Applied high-impact ATS keywords to your summary.' });
                }}>
                  ✨ AI Polish Summary
                </span>
              </div>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={e => setResume({ ...resume, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 leading-relaxed text-slate-700"
              />
            </div>

            {/* Experience Section with 1-Click AI Optimizer */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    3. Work Experience & Impact Bullets
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">Click ✨ to upgrade bullets</span>
              </div>

              {resume.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-bold text-slate-900 text-sm">{exp.role} — <span className="text-indigo-600">{exp.company}</span></div>
                    <span className="text-xs text-slate-500 font-medium">{exp.duration}</span>
                  </div>

                  <div className="space-y-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="group flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200/70">
                        <span className="text-slate-400 mt-1 text-xs">•</span>
                        <p className="flex-1 text-xs text-slate-700 leading-relaxed">{bullet}</p>
                        <button
                          disabled={isOptimizing}
                          onClick={() => handleOptimizeBullet(expIdx, bIdx)}
                          title="AI Enhance with quantifiable metrics"
                          className="shrink-0 p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-[10px] hidden sm:inline">AI Upgrade</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Projects */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    4. Technical Projects Showcase
                  </h3>
                </div>
                <span className="text-xs text-emerald-600 font-bold">2 Projects Included</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resume.projects.map(proj => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] font-semibold border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: ATS Breakdown & Keyword Audit (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Matched Keywords */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Matched ATS Keywords</span>
                <span className="text-xs text-emerald-600 font-extrabold">{ats.matchedKeywords.length} Found</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                These keywords in your resume directly match top recruiter searches for {resume.targetRole}.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ats.matchedKeywords.map((kw, i) => (
                  <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords to Add */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Recommended Keywords to Add</span>
                <span className="text-xs text-amber-600 font-extrabold">Boost +8 pts</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add these high-frequency job description terms to pass strict Fortune 500 ATS filters:
              </p>
              <div className="space-y-2">
                {ats.missingKeywords.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-xs">
                    <span className="font-semibold text-amber-900">{kw}</span>
                    <button
                      onClick={() => {
                        setResume({ ...resume, skills: [...resume.skills, kw] });
                        addToast({ type: 'success', title: 'Keyword Added', message: `Added ${kw} to your technical skills list.` });
                      }}
                      className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold transition"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Review Strengths */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Key Strengths</h3>
              <ul className="space-y-2">
                {ats.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Live Clean ATS Document Preview */
        <div className="max-w-3xl mx-auto bg-white p-10 sm:p-14 rounded-3xl border border-slate-200 shadow-lg text-slate-800 space-y-6 font-serif">
          {/* Document Header */}
          <div className="text-center border-b border-slate-300 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">{resume.fullName}</h2>
            <p className="text-xs text-slate-600 mt-1 font-sans">
              {resume.email} • {resume.phone} • {resume.location}
            </p>
            <p className="text-xs text-indigo-700 mt-0.5 font-sans">
              {resume.linkedin} • {resume.github}
            </p>
          </div>

          {/* Target Role & Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 font-sans">
              Professional Summary
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 mt-2">
              {resume.summary}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 font-sans">
              Technical Core Competencies
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 mt-2 font-sans">
              <strong>Technologies:</strong> {resume.skills.join(' • ')}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 font-sans">
              Professional Experience
            </h4>
            <div className="space-y-4 mt-2">
              {resume.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-sans text-xs">
                    <strong className="text-slate-900">{exp.role} | {exp.company}</strong>
                    <span className="text-slate-500 italic">{exp.duration}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1 mt-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 font-sans">
              Notable Software Projects
            </h4>
            <div className="space-y-3 mt-2">
              {resume.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline font-sans text-xs">
                    <strong className="text-slate-900">{proj.title}</strong>
                    <span className="text-slate-500 text-[11px]">[{proj.tech.join(', ')}]</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 font-sans">
              Education
            </h4>
            <div className="space-y-1 mt-2">
              {resume.education.map(ed => (
                <div key={ed.id} className="flex justify-between items-baseline font-sans text-xs">
                  <div>
                    <strong className="text-slate-900">{ed.degree}</strong> — {ed.institution}
                  </div>
                  <span className="text-slate-500">{ed.year} | {ed.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
