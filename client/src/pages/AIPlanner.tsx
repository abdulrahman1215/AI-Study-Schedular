import { useState } from "react";
import { generateStudyPlan } from "../services/aiService";

const AIPlannerView = () => {
  const [subjects, setSubjects] = useState("");
  const [weakTopics, setWeakTopics] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [examDate, setExamDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null); // Accepts string or structured fallback JSON object
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setResult(null);
    
    // Quick validation shield check
    if (!subjects || !studyHours || !examDate) {
      setError("Please fill out Subjects, Study Hours, and Exam Date fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await generateStudyPlan({
        subjects: subjects.split(",").map(s => s.trim()),
        weak_topics: weakTopics ? weakTopics.split(",").map(t => t.trim()) : [],
        study_hours_per_day: Number(studyHours),
        exam_date: examDate,
      });

      // Safely parse out content regardless of whether it returned raw Markdown string or our Mock fallback object
      setResult(response.study_plan);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to reach AI service generator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-bold mb-1 text-slate-100">AI Assistant</h1>
        <p className="text-sm text-slate-400 mb-6">Provide your target subjects and weak areas to generate an optimal roadmap.</p>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Subjects</label>
            <input
              type="text"
              placeholder="e.g., Mathematics, Physics, Chemistry"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Weak Topics (Optional)</label>
            <input
              type="text"
              placeholder="e.g., Calculus, Thermodynamics"
              value={weakTopics}
              onChange={(e) => setWeakTopics(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Study Hours Per Day</label>
              <input
                type="number"
                min="1"
                max="24"
                placeholder="e.g., 4"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-4 p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 disabled:text-slate-400 text-white font-medium shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
          >
            {loading ? "Analyzing Parameters..." : "Generate AI Plan"}
          </button>
        </div>
      </div>

      {/* Render AI Result Block Safely whether it returns raw markdown or structured mock dictionary objects */}
      {result && (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl animate-slide-up">
          <h2 className="text-xl font-bold mb-4 text-slate-200">Your Tailored Study Blueprint</h2>
          
          {typeof result === "string" ? (
            <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300">{result}</div>
          ) : (
            <div className="space-y-4 text-sm text-slate-300">
              <p className="font-semibold text-indigo-400">{result.daily_schedule}</p>
              <p className="text-slate-400 bg-slate-900/50 p-4 border border-slate-800 rounded-xl">{result.revision_plan}</p>
              {result.notice && <p className="text-xs text-amber-400/80 italic">{result.notice}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIPlannerView;
