import { useState, useEffect } from "react";

// ── Responsive hook ──────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

// ── Data ─────────────────────────────────────────────────────────
const MODELS = [
  { id: "gpt4o",       label: "GPT-4o",           sub: "Latest flagship · Multimodal",          vendor: "OpenAI",    icon: "⬛", accent: "#10a37f" },
  { id: "o3",          label: "o3 / o4-mini",      sub: "Advanced reasoning · Chain-of-thought", vendor: "OpenAI",    icon: "⬛", accent: "#10a37f" },
  { id: "sonnet",      label: "Claude Sonnet 4.6", sub: "Smart & efficient · Everyday use",      vendor: "Anthropic", icon: "🟠", accent: "#d4743a" },
  { id: "opus",        label: "Claude Opus 4.6",   sub: "Most powerful · Complex reasoning",     vendor: "Anthropic", icon: "🟠", accent: "#d4743a" },
  { id: "gemini25",    label: "Gemini 2.5 Pro",    sub: "Latest flagship · Deep reasoning",      vendor: "Google",    icon: "🔵", accent: "#4285f4" },
  { id: "geminiflash", label: "Gemini 2.0 Flash",  sub: "Fast & efficient · High volume",        vendor: "Google",    icon: "🔵", accent: "#4285f4" },
  { id: "grok3",       label: "Grok 3",            sub: "Latest · Real-time web access",         vendor: "xAI",       icon: "✕",  accent: "#c8c8c8" },
  { id: "grokthink",   label: "Grok 3 Thinking",   sub: "Extended reasoning mode",               vendor: "xAI",       icon: "✕",  accent: "#c8c8c8" },
];

const VENDOR_GROUPS = [
  { vendor: "OpenAI",    ids: ["gpt4o", "o3"] },
  { vendor: "Anthropic", ids: ["sonnet", "opus"] },
  { vendor: "Google",    ids: ["gemini25", "geminiflash"] },
  { vendor: "xAI",       ids: ["grok3", "grokthink"] },
];

const PURPOSES = [
  { id: "research",  label: "Research & Analysis",  icon: "🔬" },
  { id: "coding",    label: "Coding & Development", icon: "💻" },
  { id: "writing",   label: "Writing & Content",    icon: "✍️" },
  { id: "image",     label: "Image Generation",     icon: "🎨" },
  { id: "data",      label: "Data & Summarization", icon: "📊" },
  { id: "education", label: "Education & Teaching", icon: "🎓" },
];

const FRAMEWORKS = {
  COSTAR: {
    name: "CO-STAR", tagline: "Comprehensive full-stack design framework",
    badge: "Most Versatile", color: "#f0a500",
    fields: [
      { key: "context",   label: "Context",         icon: "📌", placeholder: "Provide background information relevant to your task...",  tooltip: "Set the scene. Include relevant background, domain knowledge, or situational details that help the AI understand the broader picture. E.g. 'I'm a UX designer working on a fintech mobile app targeting millennials.'" },
      { key: "objective", label: "Objective",       icon: "🎯", placeholder: "State your specific goal clearly...",                      tooltip: "Define exactly what you want to achieve. Be specific and measurable. E.g. 'Write a 500-word blog post that explains blockchain to non-technical readers.'" },
      { key: "style",     label: "Style",           icon: "🖋️", placeholder: "Describe the writing or communication style...",           tooltip: "Specify the stylistic qualities: formal, conversational, academic, journalistic, technical, narrative, etc. You can also reference a known author's style." },
      { key: "tone",      label: "Tone",            icon: "🎭", placeholder: "Define the emotional sentiment or tone...",                tooltip: "Describe the emotional register: optimistic, authoritative, empathetic, humorous, neutral, urgent, inspiring. This shapes how the message feels to the reader." },
      { key: "audience",  label: "Audience",        icon: "👥", placeholder: "Describe your intended audience...",                      tooltip: "Who will read or use this? Describe their expertise, demographics, and expectations. E.g. 'C-suite executives with no technical background' or 'junior software engineers.'" },
      { key: "response",  label: "Response Format", icon: "📋", placeholder: "Specify the exact output format...",                      tooltip: "Define the deliverable format: bullet list, numbered steps, JSON, markdown, table, code block, essay, etc. Include length constraints if needed." },
    ],
  },
  CARE: {
    name: "CARE", tagline: "Structured narrative framework",
    badge: "Best for Storytelling", color: "#7cb9e8",
    fields: [
      { key: "context", label: "Context", icon: "📌", placeholder: "Background information for the task...",   tooltip: "Provide the situational background. What is the setting, domain, or scenario the AI should understand before acting?" },
      { key: "action",  label: "Action",  icon: "⚡", placeholder: "The specific task to be performed...",     tooltip: "Describe clearly what action you want the AI to take. Use an imperative verb: 'Write', 'Analyze', 'Generate', 'Summarize', 'Explain'." },
      { key: "result",  label: "Result",  icon: "✅", placeholder: "The expected outcome or deliverable...",   tooltip: "What does success look like? Describe the ideal output — its format, quality, and completeness. E.g. 'A polished 3-paragraph summary suitable for an executive briefing.'" },
      { key: "example", label: "Example", icon: "💡", placeholder: "An illustrative example or reference...", tooltip: "Provide a concrete example of the style, format, or content you're looking for. Few-shot examples dramatically improve output quality." },
    ],
  },
  RTF: {
    name: "RTF", tagline: "Role, Task, Format — concise and precise",
    badge: "Quick & Clean", color: "#a8e6cf",
    fields: [
      { key: "role",   label: "Role",   icon: "🎭", placeholder: "The persona or expert role to adopt...",  tooltip: "Assign an expert identity to the AI. E.g. 'Act as a senior cybersecurity analyst', 'You are a professional copywriter specializing in SaaS B2B marketing'." },
      { key: "task",   label: "Task",   icon: "📝", placeholder: "The specific task to complete...",        tooltip: "A clear, single-sentence description of what needs to be done. Start with a strong verb: Create, Analyze, Draft, Review, Explain." },
      { key: "format", label: "Format", icon: "📐", placeholder: "The output format and constraints...",    tooltip: "Specify exactly how the response should be structured: word count, format type (table, list, code), language level, or any structural requirements." },
    ],
  },
  RISEN: {
    name: "RISEN", tagline: "Role-driven with step-by-step precision",
    badge: "Best for Coding", color: "#ff8b94",
    fields: [
      { key: "role",         label: "Role",         icon: "🎭", placeholder: "Expert role or persona...",                     tooltip: "Define who the AI is in this scenario. The role primes domain knowledge and communication style. Be specific: 'Senior React developer', 'PhD statistician'." },
      { key: "instructions", label: "Instructions", icon: "📋", placeholder: "Clear, direct instructions...",                tooltip: "Give the main directive — what you need done. Be direct and unambiguous. This is the core command of your prompt." },
      { key: "steps",        label: "Steps",        icon: "🪜", placeholder: "Step-by-step process to follow...",           tooltip: "Break down the task into sequential steps if applicable. This guides the AI's reasoning process. E.g. 'Step 1: Analyze requirements, Step 2: Draft schema...'" },
      { key: "end_goal",     label: "End Goal",     icon: "🏁", placeholder: "The final desired outcome...",                tooltip: "Describe the ultimate objective — what done looks like. This helps the AI stay focused and not go off on tangents." },
      { key: "narrowing",    label: "Narrowing",    icon: "🔍", placeholder: "Constraints, exclusions, or scope limits...", tooltip: "What should the AI NOT do? Set boundaries: 'Do not use deprecated APIs', 'Avoid jargon', 'Limit to 300 words', 'Only use Python standard library'." },
    ],
  },
  TRACE: {
    name: "TRACE", tagline: "Task-first with audience & examples",
    badge: "Best for Content", color: "#c9b1ff",
    fields: [
      { key: "task",     label: "Task",     icon: "📝", placeholder: "The task to be accomplished...",           tooltip: "Lead with the action. What exactly needs to be produced or accomplished? Be specific about the deliverable." },
      { key: "role",     label: "Role",     icon: "🎭", placeholder: "Role or persona for the AI...",            tooltip: "What expert should the AI embody? A skilled role assignment aligns domain knowledge and tone automatically." },
      { key: "audience", label: "Audience", icon: "👥", placeholder: "Who is this content for...",              tooltip: "Describe the target audience in detail. Their expertise, pain points, goals, and expectations will shape vocabulary and depth." },
      { key: "create",   label: "Create",   icon: "✨", placeholder: "The specific creation or deliverable...", tooltip: "Describe the exact artifact to be created. Be precise about format, length, structure, and any required elements." },
      { key: "examples", label: "Examples", icon: "💡", placeholder: "Reference examples or samples...",        tooltip: "Providing examples (few-shot prompting) is one of the most powerful ways to guide output quality. Include 1-3 concrete examples." },
    ],
  },
  APE: {
    name: "APE", tagline: "Action, Purpose, Expectation",
    badge: "Quick Start", color: "#ffd89b",
    fields: [
      { key: "action",      label: "Action",      icon: "⚡", placeholder: "What action should be taken...",  tooltip: "The core command. Start with a clear imperative verb: Summarize, Write, Generate, Analyze, Explain, Convert." },
      { key: "purpose",     label: "Purpose",     icon: "🎯", placeholder: "Why this is being done...",       tooltip: "Explain the why. Giving the AI context about purpose allows it to make better decisions about depth, tone, and emphasis." },
      { key: "expectation", label: "Expectation", icon: "📐", placeholder: "What you expect as output...",   tooltip: "Define what a great response looks like. Include format preferences, quality bar, length, and any non-negotiable requirements." },
    ],
  },
  TAG: {
    name: "TAG", tagline: "Task, Action, Goal — distilled to essentials",
    badge: "Ultra Minimal", color: "#b5ead7",
    fields: [
      { key: "task",   label: "Task",   icon: "📝", placeholder: "The task definition...",             tooltip: "What category or type of work is this? E.g. 'code review', 'blog post', 'data analysis'. Sets the context." },
      { key: "action", label: "Action", icon: "⚡", placeholder: "The specific action to perform...",  tooltip: "The precise action to execute. Be concrete: 'Write 5 bullet points', 'Refactor this function', 'Translate to Spanish'." },
      { key: "goal",   label: "Goal",   icon: "🏁", placeholder: "The ultimate goal or outcome...",   tooltip: "What is the end state you're aiming for? Define the success criteria so the AI can self-evaluate its output." },
    ],
  },
  ICIO: {
    name: "ICIO", tagline: "Instruction-first with rich context",
    badge: "Best for Research", color: "#ffc0cb",
    fields: [
      { key: "instruction", label: "Instruction", icon: "📋", placeholder: "The main instruction...",                     tooltip: "Lead with the directive. State what you want the AI to do first, clearly and unambiguously." },
      { key: "context",     label: "Context",     icon: "📌", placeholder: "Relevant background context...",             tooltip: "Provide the background that makes the instruction meaningful. Domain, constraints, prior knowledge, or situational details." },
      { key: "input",       label: "Input",       icon: "📥", placeholder: "The input data or content to work with...",  tooltip: "The raw material the AI will work with — a document, data, code snippet, description, or any input that the instruction operates on." },
      { key: "output",      label: "Output",      icon: "📤", placeholder: "The desired output format and type...",      tooltip: "Define the output type precisely: JSON schema, markdown table, Python function, email draft, etc. The more specific, the better." },
    ],
  },
};

const RECOMMENDATIONS = {
  research:  { gpt4o: "ICIO",   o3: "RISEN",  sonnet: "COSTAR", opus: "ICIO",   gemini25: "ICIO",   geminiflash: "CARE",  grok3: "ICIO",  grokthink: "RISEN",  default: "ICIO"   },
  coding:    { gpt4o: "RISEN",  o3: "RISEN",  sonnet: "RISEN",  opus: "RISEN",  gemini25: "RISEN",  geminiflash: "RTF",   grok3: "RISEN", grokthink: "RISEN",  default: "RISEN"  },
  writing:   { gpt4o: "COSTAR", o3: "TRACE",  sonnet: "TRACE",  opus: "COSTAR", gemini25: "COSTAR", geminiflash: "CARE",  grok3: "TRACE", grokthink: "COSTAR", default: "COSTAR" },
  image:     { gpt4o: "APE",    o3: "APE",    sonnet: "TAG",    opus: "APE",    gemini25: "APE",    geminiflash: "TAG",   grok3: "TAG",   grokthink: "APE",    default: "APE"    },
  data:      { gpt4o: "ICIO",   o3: "ICIO",   sonnet: "ICIO",   opus: "ICIO",   gemini25: "ICIO",   geminiflash: "RTF",   grok3: "ICIO",  grokthink: "ICIO",   default: "ICIO"   },
  education: { gpt4o: "TRACE",  o3: "RISEN",  sonnet: "COSTAR", opus: "TRACE",  gemini25: "CARE",   geminiflash: "CARE",  grok3: "TRACE", grokthink: "RISEN",  default: "TRACE"  },
};

function getRecommendation(model, purpose) {
  const map = RECOMMENDATIONS[purpose];
  if (!map) return "COSTAR";
  return map[model] || map.default || "COSTAR";
}

// ── Tooltip ──────────────────────────────────────────────────────
function Tooltip({ text }) {
  const [vis, setVis] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        onMouseEnter={() => setVis(true)} onMouseLeave={() => setVis(false)}
        onClick={() => setVis(v => !v)}
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 11, color: "#777", marginLeft: 6, verticalAlign: "middle", flexShrink: 0 }}
      >?</button>
      {vis && (
        <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#111120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", width: 240, fontSize: 12, lineHeight: 1.65, color: "#bbb", boxShadow: "0 10px 40px rgba(0,0,0,0.7)", zIndex: 200, pointerEvents: "none" }}>
          {text}
          <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid rgba(255,255,255,0.1)" }} />
        </div>
      )}
    </span>
  );
}

// ── Badge ─────────────────────────────────────────────────────────
function Badge({ color, children }) {
  return (
    <span style={{ display: "inline-block", background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 20, padding: "2px 9px", fontSize: 9.5, letterSpacing: 1, color, textTransform: "uppercase", marginLeft: 8, verticalAlign: "middle" }}>
      {children}
    </span>
  );
}

// ── Main App ─────────────────────────────────────────────────────
export default function App() {
  const { width } = useWindowSize();

  // Breakpoints
  const isMobile = width < 500;
  const isTablet = width < 768;
  const isWide   = width >= 1100;

  const [step, setStep]               = useState(1);
  const [model, setModel]             = useState(null);
  const [purpose, setPurpose]         = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [selFW, setSelFW]             = useState(null);
  const [vals, setVals]               = useState({});
  const [prompt, setPrompt]           = useState("");
  const [copied, setCopied]           = useState(false);
  const [animKey, setAnimKey]         = useState(0);

  useEffect(() => { setAnimKey(k => k + 1); }, [step]);

  const reset    = () => { setStep(1); setModel(null); setPurpose(null); setRecommended(null); setSelFW(null); setVals({}); setPrompt(""); setCopied(false); };
  const goStep2  = () => { const rec = getRecommendation(model, purpose); setRecommended(rec); setSelFW(rec); setVals({}); setStep(2); };
  const goStep3  = () => { setStep(3); setVals({}); setPrompt(""); };
  const generate = () => {
    const fw = FRAMEWORKS[selFW];
    const out = fw.fields.map(f => { const v = (vals[f.key] || "").trim(); return v ? `[${f.label.toUpperCase()}]:\n${v}` : null; }).filter(Boolean).join("\n\n");
    setPrompt(out); setStep(4);
  };
  const copy = () => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const fw         = selFW ? FRAMEWORKS[selFW] : null;
  const mObj       = MODELS.find(m => m.id === model);
  const hasContent = selFW && FRAMEWORKS[selFW].fields.some(f => (vals[f.key] || "").trim());
  const C          = "#f0a500";

  // ── Responsive derived values ──
  const modelCols     = isMobile ? "1fr" : isWide ? "repeat(4, 1fr)" : "1fr 1fr";
  const purposeCols   = isMobile ? "1fr 1fr" : isWide ? "repeat(6, 1fr)" : "repeat(3, 1fr)";
  const fwCols        = isMobile ? "1fr" : isTablet ? "1fr 1fr" : isWide ? "repeat(4, 1fr)" : "repeat(auto-fill, minmax(268px, 1fr))";
  const headerPad     = isMobile ? "36px 16px 20px" : "44px 24px 26px";
  const contentPad    = isMobile ? "24px 16px" : isWide ? "40px 48px" : "34px 24px";
  const maxW          = isMobile ? "100%" : isWide ? "1400px" : "760px";
  const btnRowDir     = isMobile ? "column" : "row";
  const stepLabelShow = !isMobile;

  // Shared button styles
  const primaryBtn = (disabled) => ({
    background: disabled ? "rgba(240,165,0,0.15)" : `linear-gradient(135deg, ${C}, #d4890a)`,
    color: disabled ? "#555" : "#0c0c18",
    border: "none", borderRadius: 11,
    padding: isMobile ? "14px 0" : "14px 32px",
    width: isMobile ? "100%" : "auto",
    fontSize: isMobile ? 15 : 14,
    fontWeight: 700, cursor: disabled ? "default" : "pointer",
    fontFamily: "Georgia, serif", letterSpacing: 0.5, transition: "all 0.2s",
  });

  const ghostBtn = {
    background: "transparent", color: "#555",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 11,
    padding: isMobile ? "12px 0" : "10px 20px",
    width: isMobile ? "100%" : "auto",
    fontSize: isMobile ? 13 : 11,
    cursor: "pointer", fontFamily: "Georgia, serif",
    fontStyle: "italic", letterSpacing: 1, transition: "all 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c18", fontFamily: "Georgia, 'Times New Roman', serif", color: "#e0e0f0", paddingBottom: 80, position: "relative", overflowX: "hidden" }}>

      {/* Background glows */}
      <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.05) 0%, transparent 70%)", top: -120, right: -120, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,150,255,0.04) 0%, transparent 70%)", bottom: 0, left: -80, pointerEvents: "none", zIndex: 0 }} />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        .anim { animation: fadeUp 0.35s ease; }
        .card-hover:hover { transform: translateY(-2px); }
        .card-hover { transition: transform 0.2s, background 0.2s, border-color 0.2s; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.22) !important; color: #bbb !important; }
        .btn-reset:hover { border-color: rgba(255,90,90,0.4) !important; color: #ff6b6b !important; }
        .tf:focus { border-color: ${fw?.color || C} !important; box-shadow: 0 0 0 3px ${fw?.color || C}12 !important; outline: none; }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── Header ── */}
      <header style={{ textAlign: "center", padding: headerPad, borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 1 }}>
        {step > 1 && (
          <button className="btn-reset" onClick={reset} style={{
            position: "absolute", top: isMobile ? 12 : 18, right: isMobile ? 12 : 18,
            background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            padding: isMobile ? "6px 10px" : "7px 15px", color: "#555",
            fontSize: isMobile ? 10 : 11, letterSpacing: 1.5, cursor: "pointer",
            fontFamily: "Georgia, serif", fontStyle: "italic", textTransform: "uppercase", transition: "all 0.2s",
          }}>↺ Reset</button>
        )}
        <div style={{ fontSize: isMobile ? 9 : 10, letterSpacing: 4, textTransform: "uppercase", color: C, marginBottom: 10, fontStyle: "italic" }}>
          Prompt Engineering Studio
        </div>
        <h1 style={{ fontSize: isMobile ? 26 : isTablet ? 34 : 46, fontWeight: 700, letterSpacing: -1, margin: 0, background: "linear-gradient(135deg, #fff 0%, #9090b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>
          Craft Perfect Prompts
        </h1>
        {!isMobile && (
          <p style={{ fontSize: 13, color: "#555", marginTop: 8, fontStyle: "italic" }}>
            Choose a framework · Fill the structure · Generate your ideal prompt
          </p>
        )}
      </header>

      {/* ── Step Bar ── */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: isMobile ? "16px 12px 0" : "22px 20px 0", position: "relative", zIndex: 1, flexWrap: "nowrap" }}>
        {[{ n:1,l:"Configure" },{ n:2,l:"Framework" },{ n:3,l:"Build" },{ n:4,l:"Prompt" }].map((s, i, arr) => (
          <div key={s.n} style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 7 }}>
            <div style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, borderRadius: "50%", background: step > s.n ? C : step === s.n ? `${C}20` : "rgba(255,255,255,0.04)", border: step >= s.n ? `2px solid ${C}` : "2px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 10 : 11, fontWeight: 700, color: step > s.n ? "#0c0c18" : step === s.n ? C : "#333", transition: "all 0.3s", flexShrink: 0 }}>
              {step > s.n ? "✓" : s.n}
            </div>
            {stepLabelShow && (
              <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: step >= s.n ? C : "#333", fontStyle: "italic" }}>{s.l}</span>
            )}
            {i < arr.length - 1 && (
              <div style={{ width: isMobile ? 16 : 32, height: 1, background: "rgba(255,255,255,0.07)", margin: isMobile ? "0 2px" : "0 4px", flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: contentPad, position: "relative", zIndex: 1 }} key={animKey} className="anim">

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C, fontStyle: "italic", marginBottom: 14 }}>01 — Select your AI model</div>

            <div style={{ display: "grid", gridTemplateColumns: isWide ? "1fr 1fr" : "1fr", gap: 0 }}>
            {VENDOR_GROUPS.map(({ vendor, ids }) => (
              <div key={vendor} style={{ paddingRight: isWide ? 16 : 0 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#3a3a5a", fontStyle: "italic", marginBottom: 8, marginTop: 18 }}>{vendor}</div>
                <div style={{ display: "grid", gridTemplateColumns: modelCols, gap: 9 }}>
                  {ids.map(id => {
                    const m = MODELS.find(x => x.id === id);
                    const sel = model === id;
                    return (
                      <div key={id} className="card-hover" onClick={() => setModel(id)}
                        style={{ background: sel ? `${m.accent}12` : "rgba(255,255,255,0.02)", border: sel ? `1px solid ${m.accent}50` : "1px solid rgba(255,255,255,0.06)", borderRadius: 11, padding: isMobile ? "11px 13px" : "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ fontSize: 18 }}>{m.icon}</div>
                        <div>
                          <div style={{ fontSize: isMobile ? 12.5 : 13, fontWeight: 600, color: sel ? m.accent : "#ccc" }}>{m.label}</div>
                          <div style={{ fontSize: isMobile ? 10 : 11, color: "#444", marginTop: 1, fontStyle: "italic" }}>{m.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            </div>

            <div style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "24px 0" }} />
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C, fontStyle: "italic", marginBottom: 14 }}>02 — Select your purpose</div>

            <div style={{ display: "grid", gridTemplateColumns: purposeCols, gap: 9 }}>
              {PURPOSES.map(p => (
                <div key={p.id} className="card-hover" onClick={() => setPurpose(p.id)}
                  style={{ background: purpose === p.id ? "rgba(240,165,0,0.08)" : "rgba(255,255,255,0.02)", border: purpose === p.id ? `1px solid ${C}45` : "1px solid rgba(255,255,255,0.06)", borderRadius: 11, padding: isMobile ? "13px 8px" : "15px 12px", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? 20 : 22, marginBottom: 5 }}>{p.icon}</div>
                  <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: purpose === p.id ? C : "#bbb" }}>{p.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: btnRowDir, gap: 10, marginTop: 24 }}>
              <button onClick={model && purpose ? goStep2 : undefined} style={primaryBtn(!model || !purpose)}>
                Get Recommended Framework →
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && fw && (
          <>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C, fontStyle: "italic", marginBottom: 14 }}>Recommended for {mObj?.label}</div>

            <div style={{ background: "rgba(240,165,0,0.07)", border: "1px solid rgba(240,165,0,0.22)", borderRadius: 13, padding: isMobile ? "14px 16px" : "18px 22px", marginBottom: 22 }}>
              <div style={{ fontSize: isMobile ? 17 : 20, fontWeight: 700, color: C, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                {FRAMEWORKS[recommended]?.name}
                <Badge color={FRAMEWORKS[recommended]?.color}>{FRAMEWORKS[recommended]?.badge}</Badge>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 3, fontStyle: "italic" }}>{FRAMEWORKS[recommended]?.tagline}</div>
              <div style={{ fontSize: 11, color: "#383838", marginTop: 7 }}>
                Matched for <span style={{ color: "#777" }}>{mObj?.label}</span> + <span style={{ color: "#777" }}>{PURPOSES.find(p => p.id === purpose)?.label}</span>
              </div>
            </div>

            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#383838", fontStyle: "italic", marginBottom: 12 }}>— or choose any framework</div>
            <div style={{ display: "grid", gridTemplateColumns: fwCols, gap: 9 }}>
              {Object.entries(FRAMEWORKS).map(([key, f]) => (
                <div key={key} className="card-hover" onClick={() => setSelFW(key)}
                  style={{ background: selFW === key ? `${f.color}10` : "rgba(255,255,255,0.02)", border: selFW === key ? `1px solid ${f.color}50` : "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: isMobile ? "13px 14px" : "15px 17px", cursor: "pointer", position: "relative" }}>
                  {key === recommended && (
                    <span style={{ position: "absolute", top: 9, right: 9, background: `${f.color}20`, border: `1px solid ${f.color}40`, borderRadius: 20, padding: "2px 7px", fontSize: 9, letterSpacing: 1, color: f.color, textTransform: "uppercase" }}>✦ rec</span>
                  )}
                  <div style={{ fontSize: isMobile ? 13.5 : 14.5, fontWeight: 700, color: selFW === key ? f.color : "#bbb", marginBottom: 3 }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: "#484860", fontStyle: "italic", marginBottom: 8 }}>{f.tagline}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {f.fields.map(fl => <span key={fl.key} style={{ fontSize: 9.5, background: "rgba(255,255,255,0.04)", borderRadius: 5, padding: "2px 6px", color: "#484860" }}>{fl.label}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: btnRowDir, gap: 10, marginTop: 22 }}>
              <button onClick={goStep3} style={primaryBtn(false)}>Use {fw.name} Framework →</button>
              <button className="btn-ghost" onClick={() => setStep(1)} style={ghostBtn}>← Back</button>
            </div>
          </>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && fw && (
          <>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C, fontStyle: "italic", marginBottom: 14 }}>03 — Fill in the {fw.name} framework</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, margin: 0, color: fw.color }}>{fw.name}</h2>
              <Badge color={fw.color}>{fw.badge}</Badge>
            </div>
            <p style={{ fontSize: 12.5, color: "#484860", fontStyle: "italic", margin: "0 0 24px" }}>{fw.tagline}</p>

            {fw.fields.map(field => (
              <div key={field.key} style={{ marginBottom: 22 }}>
                <label style={{ display: "flex", alignItems: "center", fontSize: 10.5, letterSpacing: 2, textTransform: "uppercase", color: "#777", marginBottom: 8, fontStyle: "italic" }}>
                  <span style={{ marginRight: 7, fontSize: 13 }}>{field.icon}</span>
                  {field.label}
                  <Tooltip text={field.tooltip} />
                </label>
                <textarea
                  className="tf"
                  style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, padding: "12px 14px", color: "#dcdcf0", fontSize: isMobile ? 15 : 14, lineHeight: 1.75, resize: "vertical", minHeight: 86, fontFamily: "Georgia, serif", transition: "border-color 0.2s, box-shadow 0.2s" }}
                  placeholder={field.placeholder}
                  value={vals[field.key] || ""}
                  onChange={e => setVals(v => ({ ...v, [field.key]: e.target.value }))}
                  rows={3}
                />
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: btnRowDir, gap: 10, marginTop: 8 }}>
              <button onClick={hasContent ? generate : undefined} style={primaryBtn(!hasContent)}>Generate Prompt →</button>
              <button className="btn-ghost" onClick={() => setStep(2)} style={ghostBtn}>← Back</button>
            </div>
          </>
        )}

        {/* ── STEP 4 ── */}
        {step === 4 && fw && (
          <>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C, fontStyle: "italic", marginBottom: 14 }}>04 — Your generated prompt</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: isMobile ? 18 : 21, fontWeight: 700, margin: 0, color: fw.color }}>{fw.name} Prompt</h2>
              <Badge color={fw.color}>Ready to use</Badge>
            </div>

            <div style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(240,165,0,0.16)", borderRadius: 13, padding: isMobile ? "40px 16px 16px" : "24px 24px", fontFamily: "'Courier New', monospace", fontSize: isMobile ? 13 : 13.5, lineHeight: 2, color: "#cccce0", whiteSpace: "pre-wrap", position: "relative" }}>
              {prompt}
              <button onClick={copy} style={{ position: "absolute", top: 12, right: 12, background: copied ? "rgba(80,200,120,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${copied ? "rgba(80,200,120,0.35)" : "rgba(255,255,255,0.09)"}`, borderRadius: 7, padding: "5px 13px", color: copied ? "#50c878" : "#666", fontSize: 10.5, letterSpacing: 1, cursor: "pointer", fontFamily: "Georgia, serif", fontStyle: "italic", transition: "all 0.2s" }}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            <div style={{ marginTop: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 11, padding: isMobile ? "14px 16px" : "16px 20px" }}>
              <div style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: "#333", marginBottom: 11, fontStyle: "italic" }}>Breakdown</div>
              {fw.fields.map(f => {
                const v = (vals[f.key] || "").trim();
                if (!v) return null;
                return (
                  <div key={f.key} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 2 : 10, marginBottom: isMobile ? 12 : 8, fontSize: 12.5 }}>
                    <span style={{ color: fw.color, minWidth: 105, fontWeight: 600, flexShrink: 0 }}>{f.icon} {f.label}</span>
                    <span style={{ color: "#555", fontStyle: "italic", lineHeight: 1.5 }}>{v.length > 85 ? v.slice(0, 85) + "…" : v}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: btnRowDir, gap: 10, marginTop: 16 }}>
              <button onClick={() => { setStep(3); setPrompt(""); }} style={primaryBtn(false)}>← Edit Prompt</button>
              <button className="btn-ghost" onClick={() => { setStep(2); setVals({}); setPrompt(""); }} style={ghostBtn}>Change Framework</button>
              <button className="btn-ghost" onClick={reset} style={ghostBtn}>↺ Start Over</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
