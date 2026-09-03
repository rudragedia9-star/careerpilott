import { config as loadEnv } from 'dotenv';
import { GoogleGenAI } from '@google/genai';

loadEnv({ path: '.env.local' });

// Initialize Gemini SDK with telemetry header as required by skill guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 0) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client, using Mock AI fallback:', err);
  }
}

export interface UserContext {
  name: string;
  educationLevel: string;
  careerGoal: string;
  careerMatch: number;
  readinessScore: number;
  skills: { name: string; proficiency: number; isStrength: boolean }[];
  skillGaps: { name: string; gapSize: number; priority: string }[];
  learningProgress: number;
  recentInterviewScore?: number;
  assessmentsSummary?: string;
}

export class AIService {
  /**
   * Conversational Career Coach
   * Uses structured user context to provide hyper-personalized answers.
   */
  public static async chatWithCoach(
    userContext: UserContext,
    message: string,
    history: { sender: string; text: string }[] = []
  ): Promise<{ response: string; suggestedActions?: { label: string; action: string; payload?: any }[] }> {
    const contextPrompt = `
You are the personal AI Career Mentor in CareerPilot AI.
User Context:
- Name: ${userContext.name}
- Target Career Goal: ${userContext.careerGoal} (Match: ${userContext.careerMatch}%)
- Current Career Readiness: ${userContext.readinessScore}/100
- Strong Skills: ${userContext.skills.filter(s => s.isStrength).map(s => `${s.name} (${s.proficiency}%)`).join(', ')}
- Skill Gaps / Focus Areas: ${userContext.skillGaps.map(g => `${g.name} (Gap: ${g.gapSize}%, Priority: ${g.priority})`).join(', ')}
- Learning Progress: ${userContext.learningProgress}%
- Recent Interview Score: ${userContext.recentInterviewScore || 'N/A'}/100

Guidelines:
- Speak directly, warmly, and encouragingly to ${userContext.name}.
- Connect advice directly to their goal (${userContext.careerGoal}) and their specific gaps (especially SQL and Data Structures).
- Keep answers practical, punchy (2-3 paragraphs max), actionable, and formatted with clean markdown bullet points.
- Provide 2-3 relevant next steps or suggested actions.
`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `${contextPrompt}\n\nRecent Conversation:\n${history.map(h => `${h.sender}: ${h.text}`).join('\n')}\n\nUser: ${message}`,
          config: {
            systemInstruction: 'You are CareerPilot AI, an elite, friendly, and practical career advisor for young students and learners.',
            temperature: 0.7,
          },
        });

        const text = response.text || '';
        if (text.trim().length > 0) {
          return {
            response: text,
            suggestedActions: [
              { label: '🎤 Start Mock Interview', action: 'START_INTERVIEW', payload: { role: userContext.careerGoal } },
              { label: '📚 Open SQL Roadmap', action: 'NAVIGATE_LEARN' },
              { label: '🎯 Explore Career Details', action: 'NAVIGATE_CAREERS' },
            ],
          };
        }
      } catch (error) {
        console.warn('Gemini generateContent error, falling back to mock AI logic:', error);
      }
    }

    // Fallback Mock AI Service (Section 19: realistic fallback responses)
    return this.getMockCoachResponse(userContext, message);
  }

  private static getMockCoachResponse(userContext: UserContext, message: string) {
    const lower = message.toLowerCase();

    if (lower.includes('interview') || lower.includes('practice') || lower.includes('mock')) {
      return {
        response: `Hey ${userContext.name}! Practicing interviews is the fastest way to boost your career readiness from **${userContext.readinessScore}/100** to the 80+ tier.\n\nIn your last session, you scored **${userContext.recentInterviewScore || 78}/100** on ${userContext.careerGoal}. Your technical problem solving was great (81%), but refining your **STAR framework** (Situation, Task, Action, Result) will make your system design answers stand out.\n\nWould you like to run a quick 3-question mock session right now focused on intermediate backend concepts?`,
        suggestedActions: [
          { label: '🎤 Launch Mock Interview', action: 'START_INTERVIEW', payload: { role: userContext.careerGoal } },
          { label: '📄 Review Last Feedback', action: 'VIEW_INTERVIEW_HISTORY' }
        ]
      };
    }

    if (lower.includes('sql') || lower.includes('gap') || lower.includes('skill') || lower.includes('learn')) {
      return {
        response: `Looking at your profile, your primary skill gap is **SQL (42% vs required 80%)**.\n\nHere is your recommended priority order for this week:\n* **Step 1:** Complete the *SQL Fundamentals & Relational Queries* module (you are currently at 65% progress).\n* **Step 2:** Practice multi-table INNER and LEFT JOINs on real mock customer order data.\n* **Step 3:** Tie SQL into your Python projects using an ORM or direct DB drivers.\n\nBridging this single gap will immediately lift your overall Career Readiness by approximately +6 points!`,
        suggestedActions: [
          { label: '📚 Resume SQL Course (65%)', action: 'NAVIGATE_LEARN' },
          { label: '📊 View Skill Gap Chart', action: 'NAVIGATE_CAREERS' }
        ]
      };
    }

    if (lower.includes('resume') || lower.includes('cv') || lower.includes('profile')) {
      return {
        response: `For a student targeting **${userContext.careerGoal}**, recruiters want to see evidence of hands-on problem solving rather than just course lists.\n\n**3 Quick Resume Tips for ${userContext.name}:**\n1. **Lead with Projects:** Highlight your Capstone Full-Stack application and specify your Python & API tech stack.\n2. **Quantify Impact:** Instead of "Built a database app", write *"Designed relational SQLite schemas handling 1,000+ mock records with sub-10ms query latency"*.\n3. **Show Strengths:** Highlight your verified ${userContext.skills[1]?.name || 'Problem Solving'} rating (88%).`,
        suggestedActions: [
          { label: '🎯 Check Roadmap Milestones', action: 'NAVIGATE_LEARN' },
          { label: '💬 Ask Follow-up Question', action: 'CONTINUE_CHAT' }
        ]
      };
    }

    return {
      response: `Hey ${userContext.name}! I've analyzed your latest progress toward **${userContext.careerGoal}**.\n\nYou have strong foundational momentum: your **Problem Solving (88%)** and **Python (78%)** are verified strengths. Your main accelerator right now is closing your **SQL gap (42%)** and tightening your live interview answer structures.\n\nWhat would you like to work on right now? We can run a focused mock interview, review your learning roadmap, or discuss company roles.`,
      suggestedActions: [
        { label: '🎤 Start Mock Interview', action: 'START_INTERVIEW', payload: { role: userContext.careerGoal } },
        { label: '📚 Continue Learning (64%)', action: 'NAVIGATE_LEARN' },
        { label: '🔍 Explore Career Options', action: 'NAVIGATE_CAREERS' }
      ]
    };
  }

  /**
   * Dynamic Mock Interview - Generate Question
   * Adapts dynamically based on role, difficulty, interview type, question number, and weak areas.
   */
  public static async generateInterviewQuestion(
    role: string,
    difficulty: string,
    type: string,
    questionIndex: number,
    previousQA: { question: string; answer: string; evaluation?: any }[],
    weakAreas: string[] = ['SQL', 'Structure']
  ): Promise<{ question: string; category: string; suggestedPoints: string[] }> {
    if (aiClient) {
      try {
        const prompt = `
Generate interview question #${questionIndex} for a candidate applying for: ${role}
Difficulty: ${difficulty}
Interview Type: ${type}
Candidate Focus / Weak Areas: ${weakAreas.join(', ')}

Previous Questions & Answers in this session:
${previousQA.map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join('\n\n')}

Requirements:
- Make the question dynamically adapt to the candidate's previous performance.
- If previous answer was brief on technical depth or structure, probe a related aspect.
- Return response in JSON format with:
  "question": string,
  "category": string (e.g. "System Architecture", "Relational Databases", "Behavioral / Teamwork", "Algorithms"),
  "suggestedPoints": array of 2-3 key concepts a great answer should mention.
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const json = JSON.parse(response.text || '{}');
        if (json.question) {
          return {
            question: json.question,
            category: json.category || 'Technical Competency',
            suggestedPoints: json.suggestedPoints || ['Clear problem formulation', 'Trade-off analysis', 'Concrete example'],
          };
        }
      } catch (err) {
        console.warn('Gemini question generation error, using dynamic fallback:', err);
      }
    }

    // Dynamic Fallback Question Pool adapted to role and previous QA
    return this.getAdaptiveFallbackQuestion(role, difficulty, type, questionIndex, previousQA);
  }

  private static getAdaptiveFallbackQuestion(
    role: string,
    difficulty: string,
    type: string,
    questionIndex: number,
    previousQA: { question: string; answer: string }[]
  ) {
    const roleKey = role.toLowerCase();

    if (roleKey.includes('software') || roleKey.includes('developer') || roleKey.includes('engineer')) {
      const qPool = [
        {
          question: "Can you explain how a Hash Map achieves O(1) average lookup time, and what happens when two keys result in a hash collision?",
          category: "Data Structures & Memory",
          suggestedPoints: ["Hash function hashing", "Buckets and linked lists / open addressing", "Worst case O(n) and rehashing"]
        },
        {
          question: "Imagine your application's user dashboard query is taking 4 seconds to load from a database with 500,000 records. Walk me through your step-by-step diagnostic process.",
          category: "Database & Performance Tuning",
          suggestedPoints: ["EXPLAIN query plan", "Database indexing on foreign keys", "Connection pooling and caching layers"]
        },
        {
          question: "Tell me about a challenging bug you encountered in a coding project. How did you isolate the root cause, and what did you learn from fixing it?",
          category: "Behavioral & Debugging Mindset",
          suggestedPoints: ["Clear Situation and Task", "Specific debugging actions taken (logging, breakpoints)", "Long-term preventative measure"]
        },
        {
          question: "How do you decide between choosing a relational SQL database versus a document NoSQL store for a new web service?",
          category: "System Architecture & Trade-offs",
          suggestedPoints: ["ACID compliance and structured schema", "Read vs write throughput", "Relational joins vs document hierarchy"]
        }
      ];
      return qPool[(questionIndex - 1) % qPool.length];
    }

    if (roleKey.includes('data')) {
      const qPool = [
        {
          question: "What is the difference between an INNER JOIN, LEFT JOIN, and FULL OUTER JOIN, and when might an unintended NULL propagate through an aggregation?",
          category: "SQL & Relational Logic",
          suggestedPoints: ["Row preservation behavior", "Handling of non-matching keys", "Impact on COUNT(column) vs COUNT(*)"]
        },
        {
          question: "How do you approach detecting and addressing missing values or outliers in a real-world dataset before model training?",
          category: "Data Preprocessing",
          suggestedPoints: ["Mean/median imputation vs removal", "Domain-specific context", "Checking correlation and skewness"]
        },
        {
          question: "Can you explain the trade-off between bias and variance in machine learning in terms a non-technical stakeholder would understand?",
          category: "Statistical Concepts",
          suggestedPoints: ["Underfitting vs Overfitting analogy", "Model complexity", "Validation curve indicators"]
        }
      ];
      return qPool[(questionIndex - 1) % qPool.length];
    }

    // Default general technical/behavioral interview question
    const defaultPool = [
      {
        question: `Why are you interested in pursuing a career as a ${role}, and what personal project has best demonstrated your passion?`,
        category: "Motivation & Background",
        suggestedPoints: ["Genuine curiosity", "Specific project details", "Clear enthusiasm for problem solving"]
      },
      {
        question: "Describe a situation where you had to learn a new tool, language, or framework under a tight deadline. How did you manage your time?",
        category: "Learning Agility & Adaptation",
        suggestedPoints: ["Structured learning approach", "Focus on MVP deliverables", "Resourcefulness"]
      },
      {
        question: "When you receive critical feedback on your work from a peer or mentor, how do you process it and apply improvements?",
        category: "Collaboration & Growth Mindset",
        suggestedPoints: ["Receptive attitude", "Asking clarifying questions", "Documenting iterative changes"]
      }
    ];
    return defaultPool[(questionIndex - 1) % defaultPool.length];
  }

  /**
   * Evaluate Single Answer in real-time
   */
  public static async evaluateAnswer(
    role: string,
    question: string,
    answer: string
  ): Promise<{ score: number; feedback: string; strengths: string; improvements: string }> {
    if (aiClient && answer.trim().length > 15) {
      try {
        const prompt = `
Role: ${role}
Question: ${question}
Candidate Answer: ${answer}

Evaluate this interview answer as an experienced engineering manager.
Return JSON with:
{
  "score": number (0 to 100),
  "feedback": "2-3 sentences of objective feedback",
  "strengths": "What was strong about the response",
  "improvements": "One clear way to elevate this answer"
}
`;
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.3 }
        });
        const parsed = JSON.parse(response.text || '{}');
        if (parsed.score) {
          return {
            score: Math.min(98, Math.max(40, parsed.score)),
            feedback: parsed.feedback,
            strengths: parsed.strengths,
            improvements: parsed.improvements
          };
        }
      } catch (err) {
        console.warn('AI answer evaluation fallback:', err);
      }
    }

    // Intelligent heuristic evaluation
    const length = answer.trim().split(/\s+/).length;
    let score = 75;
    let feedback = "Good initial response with direct relevance to the question.";
    let strengths = "Answer addressed the core concept directly.";
    let improvements = "Include specific real-world metrics or architectural trade-offs to show deeper mastery.";

    if (length > 60) {
      score = 84;
      strengths = "Thorough detail and articulate logical sequence.";
      improvements = "Keep the conclusion concise and summarize key takeaways.";
    } else if (length < 20) {
      score = 66;
      feedback = "Answer is concise but misses critical depth and technical examples.";
      improvements = "Elaborate on your rationale and provide a concrete example.";
    }

    return { score, feedback, strengths, improvements };
  }

  /**
   * Full Interview Evaluation (Section 7)
   */
  public static async evaluateInterviewSession(
    role: string,
    difficulty: string,
    type: string,
    qaList: { question: string; answer: string }[]
  ): Promise<{
    score: number;
    breakdown: {
      technicalKnowledge: number;
      communication: number;
      problemSolving: number;
      answerRelevance: number;
      structure: number;
    };
    whatYouDidWell: string[];
    whatToImprove: string[];
    recommendedPractice: string;
  }> {
    if (aiClient && qaList.length > 0) {
      try {
        const prompt = `
Role: ${role}
Difficulty: ${difficulty}
Type: ${type}
Interview Q&A Transcript:
${qaList.map((qa, i) => `Question ${i + 1}: ${qa.question}\nAnswer: ${qa.answer}`).join('\n\n')}

Evaluate this candidate's entire mock interview.
Return a structured JSON with:
{
  "score": number (0 to 100),
  "breakdown": {
    "technicalKnowledge": number (0-100),
    "communication": number (0-100),
    "problemSolving": number (0-100),
    "answerRelevance": number (0-100),
    "structure": number (0-100)
  },
  "whatYouDidWell": ["strength 1", "strength 2", "strength 3"],
  "whatToImprove": ["area 1", "area 2"],
  "recommendedPractice": "Specific actionable next step"
}
`;
        const res = await aiClient.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.3 }
        });
        const json = JSON.parse(res.text || '{}');
        if (json.score && json.breakdown) {
          return json;
        }
      } catch (err) {
        console.warn('Full interview evaluation fallback:', err);
      }
    }

    // Realistic fallback consistent with demo values (Section 7: 78/100)
    return {
      score: 78,
      breakdown: {
        technicalKnowledge: 82,
        communication: 74,
        problemSolving: 81,
        answerRelevance: 79,
        structure: 71
      },
      whatYouDidWell: [
        `Demonstrated strong analytical problem-solving when addressing ${role} fundamentals.`,
        'Directly answered the core prompt without straying into unrelated topics.',
        'High enthusiasm and clarity in conveying technical passion.'
      ],
      whatToImprove: [
        'Practice structuring longer answers using the STAR method (Situation, Task, Action, Result).',
        'Deepen explanations around database trade-offs and edge-case handling.'
      ],
      recommendedPractice: 'Practice explaining your projects using a clear situation → action → result structure, and review relational SQL indexing.'
    };
  }
}
