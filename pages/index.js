import '../styles/globals.css';




import { useState, useEffect } from "react";

// ─── QUESTION BANK ───────────────────────────────────────────────────────────
const ALL_QUESTIONS = [
  { id: 1, topic: "Basic Concepts of Disease", question: "Which of the following best defines a disease?", options: ["A normal variation in body function", "Any condition that impairs the normal function of the body", "An injury caused by an external force", "A temporary change in body temperature"], answer: 1, explanation: "A disease is any condition that impairs the normal function of the body, whether physically, medically or mentally — a departure from a state of health." },
  { id: 2, topic: "Basic Concepts of Disease", question: "What is the term for the development or progression of a disease from its initial cause to its final effects?", options: ["Etiology", "Epidemiology", "Pathogenesis", "Prognosis"], answer: 2, explanation: "Pathogenesis refers to the development or progression of a disease — how it progresses from its initial cause to its final effects on the body." },
  { id: 3, topic: "Basic Concepts of Disease", question: "Which type of disease prevention focuses on early detection and treatment?", options: ["Primary prevention", "Secondary prevention", "Tertiary prevention", "Quaternary prevention"], answer: 1, explanation: "Secondary prevention focuses on early detection and treatment of diseases, such as screening tests for cancer." },
  { id: 4, topic: "Basic Concepts of Disease", question: "Subjective experiences reported by the patient (e.g., pain, nausea) are known as:", options: ["Signs", "Symptoms", "Syndromes", "Sequelae"], answer: 1, explanation: "Symptoms are subjective experiences reported by the individual, such as pain, fatigue, or nausea. Signs are objective manifestations observed by a healthcare professional." },
  { id: 5, topic: "Basic Concepts of Disease", question: "Which of these is a mode of disease transmission?", options: ["Photosynthesis", "Fecal-oral route", "Oxidative phosphorylation", "Mitosis"], answer: 1, explanation: "Fecal-oral route is a common mode of transmission. Others include blood/body fluids, contact, small particle aerosol, and biological apparatus/materials." },
  { id: 6, topic: "Congenital vs Acquired Diseases", question: "A congenital disease is best described as:", options: ["A disease acquired after birth through infection", "A medical condition present at the time of birth", "A lifestyle-related disease", "A disease caused by nutritional deficiency"], answer: 1, explanation: "A congenital disorder is a medical condition that is present at the time of birth, regardless of its cause — also called a birth defect." },
  { id: 7, topic: "Congenital vs Acquired Diseases", question: "Which of the following is an example of a congenital disease?", options: ["Tuberculosis", "Haemolytic Disease of the Newborn (HDNB)", "Malaria", "Typhoid"], answer: 1, explanation: "HDNB (Haemolytic Disease of the Newborn) is an example of a congenital disease inherited from parents to offspring." },
  { id: 8, topic: "Congenital vs Acquired Diseases", question: "Acquired diseases are also known as:", options: ["Congenital anomalies", "Nosocomial infections", "Genetic disorders", "Structural defects"], answer: 1, explanation: "Acquired diseases are also known as nosocomial infections — they are acquired during the lifetime of an individual and are not present from birth." },
  { id: 9, topic: "Congenital vs Acquired Diseases", question: "Which of the following pathogens can cause BOTH congenital and acquired disease?", options: ["Plasmodium falciparum", "HBsAg, HCV, HIV1&2", "Mycobacterium tuberculosis", "Candida albicans"], answer: 1, explanation: "HBsAg, HCV, HIV1&2 can be transmitted from mother to baby (congenital) and also spread person-to-person after birth (acquired)." },
  { id: 10, topic: "Congenital vs Acquired Diseases", question: "Sickle cell anaemia, haemophilia, and colour blindness are examples of:", options: ["Acquired communicable diseases", "Congenital diseases passed from generation to generation", "Environmental diseases", "Autoimmune disorders"], answer: 1, explanation: "These are congenital diseases present from birth, caused by genetic disorders, and passed from generation to generation." },
  { id: 11, topic: "Cell Disorders", question: "What is the primary function of red blood cells?", options: ["Fight infections", "Transport oxygen to body organs and tissues", "Form blood clots", "Produce antibodies"], answer: 1, explanation: "Red blood cells transport oxygen to the body's organs and tissues. White blood cells fight infections, and platelets help with clot formation." },
  { id: 12, topic: "Cell Disorders", question: "Which condition occurs when there are fewer red blood cells or they cannot carry enough oxygen?", options: ["Leukemia", "Thrombocytopenia", "Anemia", "Lymphoma"], answer: 2, explanation: "Anemia is a condition where there are fewer red blood cells or the red blood cells are not able to carry enough oxygen, leading to fatigue and weakness." },
  { id: 13, topic: "Cell Disorders", question: "A patient with a genetic mutation causing abnormally shaped red blood cells that deprive tissues of oxygen most likely has:", options: ["Thalassemia", "Hemophilia", "Sickle cell anemia", "Leukemia"], answer: 2, explanation: "Sickle cell anemia is a genetic disorder where red blood cells are abnormally shaped, leading to oxygen deprivation and pain." },
  { id: 14, topic: "Cell Disorders", question: "Which diagnostic test is primarily used to evaluate blood cell disorders?", options: ["Urine culture", "Complete Blood Count (CBC)", "Liver biopsy", "ECG"], answer: 1, explanation: "A Complete Blood Count (CBC) is ordered to see how many of each type of blood cell are present. A bone marrow biopsy may also be done." },
  { id: 15, topic: "Cell Disorders", question: "Chronic infections, fatigue, unexplained weight loss, and general malaise are common symptoms of disorders affecting:", options: ["Red blood cells", "Platelets", "White blood cells", "Clotting factors"], answer: 2, explanation: "These are common symptoms of white blood cell disorders. Red blood cell disorders typically cause fatigue and shortness of breath; platelet disorders cause bleeding issues." },
  { id: 16, topic: "Environmental Toxins & Malnutrition", question: "Which heavy metal is known to cause tremors, vision problems, and developmental delays in children?", options: ["Lead", "Mercury", "Cadmium", "Arsenic"], answer: 1, explanation: "Mercury can damage the brain and nervous system, causing tremors, vision problems, and developmental delays in children." },
  { id: 17, topic: "Environmental Toxins & Malnutrition", question: "Aflatoxins are mycotoxins produced by certain fungi that can cause:", options: ["Respiratory disease only", "Kidney failure", "Liver damage and cancer", "Blood clots"], answer: 2, explanation: "Aflatoxins are mycotoxins produced by certain fungi that can contaminate food crops and cause liver damage and cancer." },
  { id: 18, topic: "Environmental Toxins & Malnutrition", question: "Malnutrition caused by excessive calorie intake leading to obesity is categorized as:", options: ["Undernutrition", "Micronutrient deficiency", "Overnutrition", "Wasting"], answer: 2, explanation: "Overnutrition involves excessive calorie intake, leading to obesity and related health problems like metabolic syndrome." },
  { id: 19, topic: "Environmental Toxins & Malnutrition", question: "Low height-for-age resulting from chronic or recurrent undernutrition is called:", options: ["Wasting", "Stunting", "Underweight", "Edema"], answer: 1, explanation: "Stunting is low height-for-age, resulting from chronic or recurrent undernutrition — distinct from wasting (low weight-for-height)." },
  { id: 20, topic: "Environmental Toxins & Malnutrition", question: "Which environmental toxin is a mineral fiber that was widely used in building materials and can cause mesothelioma?", options: ["Benzene", "Formaldehyde", "Asbestos", "Lead"], answer: 2, explanation: "Asbestos can cause asbestosis (a lung disease) and increase the risk of mesothelioma, a cancer of the lining of the lungs and other organs." },
  { id: 21, topic: "Immunity & Immune Disorders", question: "Which type of immunity is present at birth and provides a general (non-specific) defense against pathogens?", options: ["Adaptive immunity", "Passive immunity", "Innate immunity", "Humoral immunity"], answer: 2, explanation: "Innate immunity is present at birth and provides a general defense against pathogens, unlike adaptive immunity which targets specific pathogens." },
  { id: 22, topic: "Immunity & Immune Disorders", question: "AIDS (Acquired Immunodeficiency Syndrome) is an example of which type of immune disorder?", options: ["Autoimmune disorder", "Allergic disorder", "Immunodeficiency", "Hypersensitivity"], answer: 2, explanation: "AIDS is an example of immunodeficiency — a condition where the immune system is unable to effectively fight off infections." },
  { id: 23, topic: "Immunity & Immune Disorders", question: "Rheumatoid arthritis, lupus, and multiple sclerosis are examples of:", options: ["Allergic disorders", "Autoimmune disorders", "Immunodeficiency disorders", "Congenital disorders"], answer: 1, explanation: "Rheumatoid arthritis, lupus, and multiple sclerosis are autoimmune disorders where the immune system mistakenly attacks the body's own tissues." },
  { id: 24, topic: "Immunity & Immune Disorders", question: "Hay fever, asthma, and food allergies result from:", options: ["The immune system attacking body tissues", "An overreaction of the immune system to harmless substances", "A deficiency of white blood cells", "Viral destruction of T-cells"], answer: 1, explanation: "Allergic disorders result from an overreaction of the immune system to harmless substances (allergens), causing symptoms ranging from mild sneezing to severe anaphylaxis." },
  { id: 25, topic: "Immunity & Immune Disorders", question: "Passive immunity can be acquired through:", options: ["Vaccination", "Natural infection", "Antibodies passed from mother to baby", "Cytokine therapy"], answer: 2, explanation: "Passive immunity is acquired through external sources, like antibodies passed from a mother to her baby — it does not require the recipient's immune system to mount its own response." },
  { id: 26, topic: "Metabolic Disorders", question: "Catabolism is best described as:", options: ["Consuming energy to build new cells", "Storing energy in body tissues", "Producing energy by breaking down larger molecules into smaller ones", "Synthesizing proteins from amino acids"], answer: 2, explanation: "Catabolism is producing energy from breaking down larger molecules into smaller ones — e.g., breaking down carbohydrate molecules into glucose." },
  { id: 27, topic: "Metabolic Disorders", question: "In Type 1 diabetes, insulin production is limited because:", options: ["The pancreas produces too much glucagon", "The immune system attacks cells in the pancreas", "The liver fails to store glycogen", "Insulin receptors are absent"], answer: 1, explanation: "Type 1 diabetes is an autoimmune disorder where the immune system mistakenly attacks cells in the pancreas, limiting insulin production." },
  { id: 28, topic: "Metabolic Disorders", question: "Gaucher's disease is caused by a genetic mutation that limits the production of:", options: ["Insulin", "Phenylalanine hydroxylase", "Glucocerebrosidase", "Hemoglobin"], answer: 2, explanation: "Gaucher's disease results from a genetic mutation that limits glucocerebrosidase, an enzyme for breaking down fats. This causes lipid accumulation mainly in the spleen and liver." },
  { id: 29, topic: "Metabolic Disorders", question: "Phenylketonuria (PKU) is characterized by the inability to process excess:", options: ["Carbohydrates", "Lipids", "Amino acids", "Nucleotides"], answer: 2, explanation: "People with PKU are unable to produce phenylalanine hydroxylase and cannot process excess amino acids, which can build up and cause brain damage." },
  { id: 30, topic: "Metabolic Disorders", question: "Hemochromatosis is a metabolic disorder that affects how the body absorbs:", options: ["Calcium", "Iron", "Vitamin B12", "Glucose"], answer: 1, explanation: "Hemochromatosis is a condition that affects how the body absorbs iron, causing iron buildups that can lead to joint pain, fatigue, and skin darkening." },
  { id: 31, topic: "Homeostatic Mechanisms", question: "Which component of homeostatic mechanisms detects changes in the internal environment?", options: ["Effectors", "Control centers", "Receptors", "Hormones"], answer: 2, explanation: "Receptors detect changes in the internal environment. Control centers integrate the information, and effectors carry out responses to restore balance." },
  { id: 32, topic: "Homeostatic Mechanisms", question: "During childbirth, uterine contractions stimulate oxytocin release, which further amplifies contractions. This is an example of:", options: ["Negative feedback", "Positive feedback", "Osmoregulation", "Thermoregulation"], answer: 1, explanation: "This is positive feedback — a change triggers a response that amplifies the initial change. During childbirth, contractions cause oxytocin release which further stimulates more contractions." },
  { id: 33, topic: "Homeostatic Mechanisms", question: "When blood sugar rises and insulin is released to lower it, this is an example of:", options: ["Positive feedback", "Negative feedback", "Allostasis", "Sympathetic activation"], answer: 1, explanation: "This is negative feedback — a change triggers a response that counteracts the initial change, restoring the system to its set point." },
  { id: 34, topic: "Homeostatic Mechanisms", question: "Hypertension (high blood pressure) is an example of a homeostatic imbalance in which system?", options: ["Respiratory system", "Endocrine system", "Cardiovascular system", "Nervous system"], answer: 2, explanation: "Hypertension and hypotension are examples of homeostatic imbalances affecting the cardiovascular system." },
  { id: 35, topic: "Homeostatic Mechanisms", question: "Which of the following is NOT a cause of homeostatic imbalance?", options: ["Exposure to environmental toxins", "Regular physical exercise", "Aging", "Genetic predispositions"], answer: 1, explanation: "Regular physical exercise helps maintain homeostasis. Environmental toxins, aging, and genetic predispositions are all potential causes of homeostatic imbalances." },
  { id: 36, topic: "Inflammation & Infection", question: "Which type of pathogens can cause diseases such as Cholera, Typhoid, and Tuberculosis?", options: ["Viruses", "Bacteria", "Fungi", "Protozoa"], answer: 1, explanation: "Bacteria cause diseases such as Cholera, Typhoid, Tuberculosis, Tetanus, Diphtheria, Pneumonia, Syphilis, Gonorrhoea, and Leprosy." },
  { id: 37, topic: "Inflammation & Infection", question: "Ringworm and Athlete's foot are caused by:", options: ["Bacteria", "Viruses", "Fungi", "Mites"], answer: 2, explanation: "Ringworm and Athlete's foot are fungal infections. Scabies is caused by mites; malaria is caused by protozoa." },
  { id: 38, topic: "Inflammation & Infection", question: "The smallest known cells, with a diameter of only 0.2 μm, are:", options: ["Yeast cells", "Mycoplasmas", "Platelets", "Lymphocytes"], answer: 1, explanation: "Mycoplasmas are the smallest known cells — some are spheres as small as 0.2 μm in diameter, much smaller than a typical human cell." },
  { id: 39, topic: "Inflammation & Infection", question: "Filaria, Ascariasis, Cysticercosis, and Pinworm infections are caused by:", options: ["Protozoa", "Rickettsiae", "Worms", "Viruses"], answer: 2, explanation: "Worms (helminths) cause diseases such as Filaria, Ascariasis, Cysticercosis, and Pinworm infections." },
  { id: 40, topic: "Inflammation & Infection", question: "Which genetic material contains the cell's primary genetic information stored in the nucleus?", options: ["RNA only", "Mitochondrial DNA only", "DNA (deoxyribonucleic acid)", "Ribosomes"], answer: 2, explanation: "The nucleus contains most genetic information in the form of DNA. The nucleus also makes RNA, which carries DNA instructions to develop into proteins." },
];

const TOPICS = [...new Set(ALL_QUESTIONS.map(q => q.topic))];
const BG_THEMES = [
  { name: "Default White", value: "#ffffff", text: "#1a1a2e" },
  { name: "Midnight Blue", value: "#0f172a", text: "#e2e8f0" },
  { name: "Forest Green", value: "#052e16", text: "#dcfce7" },
  { name: "Deep Purple", value: "#1e1b4b", text: "#ede9fe" },
  { name: "Charcoal", value: "#1c1c1e", text: "#f5f5f7" },
  { name: "Warm Cream", value: "#fef9f0", text: "#1a1a2e" },
  { name: "Ocean Teal", value: "#042f2e", text: "#ccfbf1" },
  { name: "Rose Dark", value: "#3b0764", text: "#fae8ff" },
];

const V = {
  electric: "#6C3EFF", neon: "#00E5FF", coral: "#FF4D6D",
  gold: "#FFD60A", lime: "#39FF14", orange: "#FF6B2B",
};

// // ─── RESPONSIVE CSS ──────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-text-size-adjust:100%;}
body{font-family:'Space Grotesk',sans-serif;overflow-x:hidden;}

/* ── animations ── */
.pulse{animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(108,62,255,0.4);}50%{box-shadow:0 0 0 14px rgba(108,62,255,0);}}
.slide-in{animation:slideIn 0.3s ease;}
@keyframes slideIn{from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;}}

/* ── base button ── */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:13px 22px;border-radius:14px;
  font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;
  border:none;cursor:pointer;transition:all 0.2s;letter-spacing:0.2px;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;
  min-height:50px;
}
.btn:active{transform:scale(0.96);}
.btn-primary{background:linear-gradient(135deg,#6C3EFF,#00E5FF);color:#fff;}
.btn-primary:hover{opacity:0.88;}
.btn-ghost{background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.22);color:inherit;}
.btn-ghost:hover{background:rgba(255,255,255,0.18);}
.btn-full{width:100%;}

/* ── answer option buttons ── */
.option-btn{
  width:100%;text-align:left;
  padding:16px 18px;border-radius:16px;
  border:2px solid rgba(255,255,255,0.13);
  background:rgba(255,255,255,0.06);
  color:inherit;font-family:'Space Grotesk',sans-serif;
  font-size:16px;font-weight:500;cursor:pointer;
  transition:all 0.2s;margin-bottom:12px;
  display:flex;align-items:flex-start;gap:12px;
  line-height:1.5;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;
  min-height:54px;
}
.option-btn:active{transform:scale(0.985);}
.option-btn:hover{border-color:#6C3EFF;background:rgba(108,62,255,0.13);}
.option-btn.selected{border-color:#00E5FF;background:rgba(0,229,255,0.1);}
.option-btn.correct{border-color:#39FF14;background:rgba(57,255,20,0.1);color:#39FF14;}
.option-btn.wrong{border-color:#FF4D6D;background:rgba(255,77,109,0.1);color:#FF4D6D;}

/* ── progress bar ── */
.progress-bar{width:100%;height:8px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden;}
.progress-fill{height:100%;background:linear-gradient(90deg,#6C3EFF,#00E5FF);border-radius:99px;transition:width 0.4s ease;}

/* ── tag / badge ── */
.tag{display:inline-block;padding:5px 11px;border-radius:99px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;}
.mono{font-family:'JetBrains Mono',monospace;}

/* ── layout helpers ── */
.page{max-width:700px;margin:0 auto;padding:24px 16px 40px;}
.row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.row-between{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}
.col{display:flex;flex-direction:column;gap:12px;}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.btn-row{display:flex;gap:12px;flex-wrap:wrap;}
.btn-row .btn{flex:1;min-width:120px;}

/* ── card ── */
.card{
  border-radius:20px;padding:20px;
  border:1px solid rgba(255,255,255,0.11);
  background:rgba(255,255,255,0.06);
}
.card-light{
  border-radius:20px;padding:20px;
  border:1px solid rgba(0,0,0,0.09);
  background:rgba(0,0,0,0.04);
}

/* ── range input ── */
input[type=range]{accent-color:#6C3EFF;width:100%;height:6px;}

/* ── filter chips ── */
.chips{display:flex;gap:8px;flex-wrap:wrap;}
.chip{
  padding:9px 16px;border-radius:10px;
  font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;
  cursor:pointer;transition:all 0.2s;border:2px solid transparent;
  -webkit-tap-highlight-color:transparent;
}

/* ── progress dots ── */
.dot-grid{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:18px;}
.dot{width:11px;height:11px;border-radius:50%;cursor:pointer;transition:all 0.2s;padding:0;border:2px solid transparent;}

/* ─────────────────────────────────────────
   MOBILE OVERRIDES  (≤ 480 px)
───────────────────────────────────────── */
@media(max-width:480px){
  .page{padding:16px 12px 60px;}

  /* typography scale-up */
  h1{font-size:28px !important;}
  h2{font-size:22px !important;}
  .q-text{font-size:17px !important;line-height:1.6 !important;}
  .option-btn{font-size:15px !important;padding:15px 14px !important;}
  .btn{font-size:16px !important;min-height:54px !important;padding:14px 18px !important;}

  /* stack all button rows */
  .btn-row{flex-direction:column;}
  .btn-row .btn{width:100%;min-width:unset;}

  /* 3-col stats → 1 col */
  .grid-3{grid-template-columns:1fr;}

  /* 2-col mode select → 1 col */
  .grid-2{grid-template-columns:1fr;}

  /* nav prev/next: full-width stacked */
  .nav-row{flex-direction:column;}
  .nav-row .btn{width:100%;}

  /* top quiz bar: stack */
  .quiz-topbar{flex-direction:column;align-items:flex-start;gap:8px;}
  .quiz-topbar-right{width:100%;display:flex;gap:8px;justify-content:space-between;}

  /* timer pill full row */
  .timer-pill{flex:1;text-align:center;justify-content:center;}

  /* card padding tighter */
  .card,.card-light{padding:16px 14px;}

  /* filter chips scroll row */
  .chips{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch;}
  .chip{white-space:nowrap;flex-shrink:0;}

  /* score ring slightly smaller */
  .score-svg{width:140px !important;height:140px !important;}

  /* results action buttons: full width stack */
  .results-actions{flex-direction:column;}
  .results-actions .btn{width:100%;}
}

/* ─────────────────────────────────────────
   TABLET OVERRIDES (481–768 px)
───────────────────────────────────────── */
@media(min-width:481px) and (max-width:768px){
  .page{padding:20px 20px 48px;}
  .grid-3{grid-template-columns:repeat(3,1fr);}
  .btn-row .btn{flex:1;}
  .nav-row{flex-direction:row;} 
 }
`; //

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("practice");
  const [bgTheme, setBgTheme] = useState(BG_THEMES[0]);
  const [selectedTopics, setSelectedTopics] = useState(TOPICS);
  const [questionCount, setQuestionCount] = useState(20);
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [filterMode, setFilterMode] = useState("all");

  const isDark = ["#e2e8f0","#dcfce7","#ede9fe","#f5f5f7","#ccfbf1","#fae8ff"].includes(bgTheme.text);
  const mutedColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";

  const cardS = {
    background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: 20, padding: 20,
  };

  const rootStyle = {
    background: bgTheme.value, color: bgTheme.text,
    minHeight: "100vh", fontFamily: "'Space Grotesk',sans-serif",
  };

  // Timer
  useEffect(() => {
    if (screen !== "quiz" || mode !== "exam" || !started || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, mode, started, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && screen === "quiz" && mode === "exam" && started) setScreen("results");
  }, [timeLeft, screen, mode, started]);

  const startQuiz = () => {
    const pool = ALL_QUESTIONS.filter(q => selectedTopics.includes(q.topic));
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(questionCount, pool.length));
    setQuestions(shuffled); setAnswers({}); setFlagged(new Set());
    setCurrent(0); setShowExplanation(false);
    setTimeLeft(timeLimit * 60); setStarted(true); setScreen("quiz");
  };

  const handleAnswer = (idx) => {
    if (mode === "exam" && answers[questions[current]?.id] !== undefined) return;
    setAnswers(prev => ({ ...prev, [questions[current].id]: idx }));
    if (mode === "practice") setShowExplanation(true);
  };

  const nextQ = () => {
    setShowExplanation(false);
    if (current < questions.length - 1) setCurrent(c => c + 1);
    else setScreen("results");
  };
  const prevQ = () => { setShowExplanation(false); if (current > 0) setCurrent(c => c - 1); };
  const toggleFlag = () => {
    const q = questions[current];
    setFlagged(prev => { const n = new Set(prev); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n; });
  };

  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const score = questions.filter(q => answers[q.id] === q.answer).length;
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

  const TOPIC_COLORS = [V.electric, V.coral, V.orange, V.neon, "#9333ea", "#10b981", "#f59e0b"];

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={rootStyle}>
      <style>{css}</style>
      <div className="page">
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"linear-gradient(135deg,#6C3EFF22,#00E5FF22)", border:"1px solid #6C3EFF55", borderRadius:99, padding:"7px 16px", marginBottom:18 }}>
            <span style={{ fontSize:16 }}>🧬</span>
            <span style={{ color:V.neon, fontSize:12, fontWeight:700, letterSpacing:1.4, textTransform:"uppercase" }}>Lead City University</span>
          </div>
          <h1 style={{ fontSize:"clamp(28px,7vw,44px)", fontWeight:800, lineHeight:1.15, marginBottom:10, background:"linear-gradient(135deg,#6C3EFF,#00E5FF,#FF4D6D)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            MLS 113 Quiz
          </h1>
          <p style={{ color:mutedColor, fontSize:"clamp(14px,3.5vw,17px)", marginBottom:4 }}>Introduction to Biology of Diseases</p>
          <p style={{ color:mutedColor, fontSize:"clamp(12px,3vw,14px)" }}>2nd Semester · 100 Level · 2024/2025</p>
        </div>

        {/* Stats — 3 col on tablet+, 1 col on phone */}
        <div className="grid-3" style={{ marginBottom:24 }}>
          {[
            { label:"Questions", value:ALL_QUESTIONS.length, icon:"❓" },
            { label:"Topics", value:TOPICS.length, icon:"📚" },
            { label:"Modes", value:"2", icon:"⚡" },
          ].map(s => (
            <div key={s.label} style={{ ...cardS, textAlign:"center", padding:"18px 12px" }}>
              <div style={{ fontSize:28, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:26, fontWeight:800, color:V.neon }}>{s.value}</div>
              <div style={{ fontSize:13, color:mutedColor, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div style={{ ...cardS, marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:12, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.electric }}>Course Topics</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {TOPICS.map((t,i) => (
              <span key={t} className="tag" style={{ background:TOPIC_COLORS[i%7]+"33", color:TOPIC_COLORS[i%7], border:`1px solid ${TOPIC_COLORS[i%7]}44`, fontSize:11 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Mode select — 2 col tablet+, 1 col phone */}
        <div style={{ ...cardS, marginBottom:20 }}>
          <div style={{ fontWeight:700, marginBottom:12, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.electric }}>Select Mode</div>
          <div className="grid-2">
            {[
              { id:"practice", label:"Practice Mode", desc:"Instant feedback & explanations", icon:"📖", color:V.electric },
              { id:"exam", label:"Exam Mode", desc:"Timed · no hints · real conditions", icon:"🎓", color:V.coral },
            ].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)}
                style={{ padding:"18px 14px", borderRadius:16, border:`2px solid ${mode===m.id ? m.color : "rgba(255,255,255,0.1)"}`, background:mode===m.id ? m.color+"22" : "transparent", color:"inherit", cursor:"pointer", textAlign:"left", transition:"all 0.2s", WebkitTapHighlightColor:"transparent" }}>
                <div style={{ fontSize:30, marginBottom:8 }}>{m.icon}</div>
                <div style={{ fontWeight:700, fontSize:15, color:mode===m.id ? m.color : "inherit", marginBottom:4 }}>{m.label}</div>
                <div style={{ fontSize:12, color:mutedColor, lineHeight:1.4 }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Background themes */}
        <div style={{ ...cardS, marginBottom:24 }}>
          <div style={{ fontWeight:700, marginBottom:12, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.electric }}>Background Theme</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {BG_THEMES.map(t => (
              <button key={t.name} onClick={() => setBgTheme(t)} title={t.name}
                style={{ width:42, height:42, borderRadius:"50%", background:t.value, border:bgTheme.name===t.name ? `3px solid ${V.neon}` : "3px solid transparent", cursor:"pointer", boxShadow:bgTheme.name===t.name ? `0 0 14px ${V.neon}` : "none", transition:"all 0.2s", WebkitTapHighlightColor:"transparent" }} />
            ))}
          </div>
          <div style={{ fontSize:12, color:mutedColor, marginTop:8 }}>Selected: {bgTheme.name}</div>
        </div>

        <button className="btn btn-primary btn-full pulse" onClick={() => setScreen("config")} style={{ fontSize:"clamp(15px,4vw,17px)", padding:"16px 24px", minHeight:56 }}>
          Configure & Start →
        </button>
      </div>
    </div>
  );

  // ── CONFIG ───────────────────────────────────────────────────────────────
  if (screen === "config") return (
    <div style={rootStyle}>
      <style>{css}</style>
      <div className="page">
        <button className="btn btn-ghost" onClick={() => setScreen("home")} style={{ marginBottom:20 }}>← Back</button>
        <h2 style={{ fontSize:"clamp(20px,5vw,26px)", fontWeight:800, marginBottom:6, background:"linear-gradient(135deg,#6C3EFF,#00E5FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Configure Quiz</h2>
        <p style={{ color:mutedColor, marginBottom:24, fontSize:15 }}>Mode: <strong style={{ color:mode==="exam" ? V.coral : V.electric }}>{mode==="exam" ? "🎓 Exam Mode" : "📖 Practice Mode"}</strong></p>

        {/* Topics */}
        <div style={{ ...cardS, marginBottom:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12, flexWrap:"wrap", gap:8 }}>
            <div style={{ fontWeight:700, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.electric }}>Select Topics</div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-ghost" style={{ padding:"6px 14px", fontSize:13, minHeight:36 }} onClick={() => setSelectedTopics([...TOPICS])}>All</button>
              <button className="btn btn-ghost" style={{ padding:"6px 14px", fontSize:13, minHeight:36 }} onClick={() => setSelectedTopics([])}>None</button>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {TOPICS.map(t => (
              <label key={t} style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer", padding:"12px 14px", borderRadius:12, border:`1px solid ${selectedTopics.includes(t) ? V.electric+"77" : "transparent"}`, background:selectedTopics.includes(t) ? V.electric+"11" : "transparent", transition:"all 0.2s", WebkitTapHighlightColor:"transparent" }}>
                <input type="checkbox" checked={selectedTopics.includes(t)} onChange={() => setSelectedTopics(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev,t])} style={{ accentColor:V.electric, width:18, height:18, flexShrink:0 }} />
                <span style={{ fontSize:15, fontWeight:500, flex:1 }}>{t}</span>
                <span style={{ fontSize:13, color:mutedColor, flexShrink:0 }}>{ALL_QUESTIONS.filter(q=>q.topic===t).length}Q</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div style={{ ...cardS, marginBottom:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.electric }}>Number of Questions</div>
            <span className="mono" style={{ background:V.electric+"33", color:V.electric, borderRadius:8, padding:"4px 12px", fontWeight:700, fontSize:16 }}>{questionCount}</span>
          </div>
          <input type="range" min={5} max={Math.min(40, ALL_QUESTIONS.filter(q=>selectedTopics.includes(q.topic)).length||5)} value={questionCount} onChange={e=>setQuestionCount(+e.target.value)} />
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:mutedColor, marginTop:6 }}>
            <span>5</span><span>{Math.min(40, ALL_QUESTIONS.filter(q=>selectedTopics.includes(q.topic)).length||5)}</span>
          </div>
        </div>

        {/* Time limit (exam only) */}
        {mode==="exam" && (
          <div style={{ ...cardS, marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div style={{ fontWeight:700, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.coral }}>Time Limit</div>
              <span className="mono" style={{ background:V.coral+"33", color:V.coral, borderRadius:8, padding:"4px 12px", fontWeight:700, fontSize:16 }}>{timeLimit} min</span>
            </div>
            <input type="range" min={5} max={90} step={5} value={timeLimit} onChange={e=>setTimeLimit(+e.target.value)} style={{ accentColor:V.coral }} />
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:mutedColor, marginTop:6 }}><span>5 min</span><span>90 min</span></div>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={startQuiz}
          disabled={selectedTopics.length===0}
          style={{ fontSize:"clamp(15px,4vw,17px)", padding:"16px", minHeight:56, opacity:selectedTopics.length===0 ? 0.4 : 1 }}>
          🚀 Start Quiz ({Math.min(questionCount, ALL_QUESTIONS.filter(q=>selectedTopics.includes(q.topic)).length)} questions)
        </button>
      </div>
    </div>
  );

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = questions[current];
    const userAnswer = answers[q?.id];
    const isFlagged = flagged.has(q?.id);
    const answered = userAnswer !== undefined;
    const progressPct = ((current+1)/questions.length)*100;

    return (
      <div style={rootStyle}>
        <style>{css}</style>
        <div className="page">
          {/* Top bar */}
          <div className="quiz-topbar row-between" style={{ marginBottom:14 }}>
            <div className="row" style={{ gap:8 }}>
              <span className="tag" style={{ background:mode==="exam" ? V.coral+"33" : V.electric+"33", color:mode==="exam" ? V.coral : V.electric, border:`1px solid ${mode==="exam" ? V.coral : V.electric}44` }}>
                {mode==="exam" ? "🎓 Exam" : "📖 Practice"}
              </span>
              <span className="mono" style={{ fontSize:14, color:mutedColor }}>{current+1}/{questions.length}</span>
            </div>
            <div className="quiz-topbar-right row" style={{ gap:8 }}>
              {mode==="exam" && (
                <span className="mono timer-pill" style={{ background:timeLeft<300 ? V.coral+"33" : V.neon+"22", color:timeLeft<300 ? V.coral : V.neon, padding:"7px 14px", borderRadius:10, fontWeight:700, fontSize:16, border:`1px solid ${timeLeft<300 ? V.coral : V.neon}44` }}>
                  ⏱ {fmtTime(timeLeft)}
                </span>
              )}
              <button className="btn btn-ghost" style={{ padding:"7px 14px", fontSize:13, minHeight:38 }} onClick={() => setScreen("results")}>Finish</button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-bar" style={{ marginBottom:14 }}>
            <div className="progress-fill" style={{ width:`${progressPct}%` }} />
          </div>

          {/* Progress dots */}
          <div className="dot-grid">
            {questions.map((qq,i) => {
              const a = answers[qq.id];
              const bg = a===undefined ? (isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.15)") : a===qq.answer ? V.lime : V.coral;
              return (
                <button key={i} className="dot" onClick={() => { setCurrent(i); setShowExplanation(false); }}
                  style={{ background:bg, borderColor:i===current ? V.neon : "transparent", boxShadow:i===current ? `0 0 6px ${V.neon}` : "none" }} />
              );
            })}
          </div>

          {/* Question card */}
          <div className="slide-in" style={{ ...cardS, marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, gap:10 }}>
              <span className="tag" style={{ background:V.electric+"22", color:V.electric, border:`1px solid ${V.electric}44`, fontSize:10 }}>{q.topic}</span>
              <button onClick={toggleFlag} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, padding:"2px 4px", WebkitTapHighlightColor:"transparent" }}>{isFlagged ? "🚩" : "⚐"}</button>
            </div>
            <p className="q-text" style={{ fontSize:"clamp(15px,4vw,18px)", fontWeight:600, lineHeight:1.6, marginBottom:22 }}>
              <span className="mono" style={{ color:mutedColor, fontSize:13, marginRight:6 }}>Q{current+1}.</span>
              {q.question}
            </p>

            {q.options.map((opt,i) => {
              let cls = "option-btn";
              if (answered && mode==="practice") {
                if (i===q.answer) cls+=" correct";
                else if (i===userAnswer && userAnswer!==q.answer) cls+=" wrong";
              } else if (answered && mode==="exam") {
                if (i===userAnswer) cls+=" selected";
              }
              const letter = ["A","B","C","D"][i];
              const isCorrectOpt = answered && mode==="practice" && i===q.answer;
              const isWrongOpt = answered && mode==="practice" && i===userAnswer && userAnswer!==q.answer;
              return (
                <button key={i} className={cls} onClick={() => handleAnswer(i)}
                  disabled={mode==="practice" && answered}
                  style={{ color:"inherit" }}>
                  <span style={{ minWidth:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:isCorrectOpt ? V.lime+"33" : isWrongOpt ? V.coral+"33" : "rgba(255,255,255,0.09)", fontWeight:700, fontSize:13, flexShrink:0, color:isCorrectOpt ? V.lime : isWrongOpt ? V.coral : "inherit" }}>
                    {letter}
                  </span>
                  <span style={{ flex:1 }}>{opt}</span>
                  {isCorrectOpt && <span style={{ color:V.lime, flexShrink:0 }}>✓</span>}
                  {isWrongOpt && <span style={{ color:V.coral, flexShrink:0 }}>✗</span>}
                </button>
              );
            })}

            {/* Explanation */}
            {mode==="practice" && answered && (
              <div style={{ marginTop:14 }}>
                <button onClick={() => setShowExplanation(!showExplanation)} className="btn btn-ghost" style={{ padding:"8px 16px", fontSize:14, minHeight:40 }}>
                  {showExplanation ? "▲ Hide" : "▼ Show"} Explanation
                </button>
                {showExplanation && (
                  <div style={{ marginTop:12, padding:"14px 16px", borderRadius:14, background:V.neon+"11", border:`1px solid ${V.neon}33`, fontSize:15, lineHeight:1.65, color:isDark ? "#a5f3fc" : "#0c4a6e" }}>
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav buttons — full-width stacked on mobile */}
          <div className="nav-row btn-row">
            <button className="btn btn-ghost" onClick={prevQ} disabled={current===0} style={{ opacity:current===0?0.35:1 }}>← Prev</button>
            {mode==="exam" && !answered && (
              <button className="btn btn-ghost" onClick={() => { setAnswers(prev=>({...prev,[q.id]:-1})); nextQ(); }}>Skip</button>
            )}
            <button className="btn btn-primary" onClick={nextQ}
              disabled={mode==="practice" && !answered}
              style={{ opacity:(mode==="practice" && !answered)?0.4:1 }}>
              {current<questions.length-1 ? "Next →" : "Finish ✓"}
            </button>
          </div>

          {flagged.size > 0 && (
            <div style={{ marginTop:14, textAlign:"center", fontSize:13, color:V.gold }}>
              🚩 {flagged.size} flagged for review
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (screen === "results") {
    const topicBreakdown = TOPICS.map(t => {
      const qs = questions.filter(q => q.topic===t);
      return { topic:t, correct:qs.filter(q=>answers[q.id]===q.answer).length, total:qs.length };
    }).filter(t => t.total>0);
    const grade = percent>=70 ? { label:"PASS", color:V.lime } : { label:"FAIL", color:V.coral };

    return (
      <div style={rootStyle}>
        <style>{css}</style>
        <div className="page">
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:52, marginBottom:10 }}>{percent>=70 ? "🎉" : "📚"}</div>
            <h2 style={{ fontSize:"clamp(22px,5vw,30px)", fontWeight:800, marginBottom:6, background:"linear-gradient(135deg,#6C3EFF,#00E5FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Quiz Complete!</h2>
            <p style={{ color:mutedColor, fontSize:15 }}>MLS 113 · {mode==="exam" ? "Exam" : "Practice"} Mode</p>
          </div>

          {/* Score ring */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <div style={{ position:"relative", width:160, height:160 }} className="score-svg">
              <svg width="160" height="160" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12"/>
                <circle cx="80" cy="80" r="68" fill="none" stroke={percent>=70 ? V.lime : percent>=50 ? V.gold : V.coral} strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*68}`} strokeDashoffset={`${2*Math.PI*68*(1-percent/100)}`} style={{ transition:"stroke-dashoffset 1s ease" }}/>
              </svg>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:38, fontWeight:800, color:percent>=70?V.lime:percent>=50?V.gold:V.coral }}>{percent}%</div>
                <span className="tag" style={{ background:grade.color+"33", color:grade.color, fontSize:11, marginTop:4 }}>{grade.label}</span>
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid-3" style={{ marginBottom:20 }}>
            {[
              { label:"Correct", value:score, color:V.lime },
              { label:"Wrong", value:questions.length-score, color:V.coral },
              { label:"Total", value:questions.length, color:V.neon },
            ].map(s => (
              <div key={s.label} style={{ ...cardS, textAlign:"center", padding:"16px 10px" }}>
                <div style={{ fontSize:28, fontWeight:800, color:s.color }} className="mono">{s.value}</div>
                <div style={{ fontSize:13, color:mutedColor, marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Topic breakdown */}
          <div style={{ ...cardS, marginBottom:20 }}>
            <div style={{ fontWeight:700, fontSize:13, textTransform:"uppercase", letterSpacing:1, color:V.electric, marginBottom:16 }}>Topic Breakdown</div>
            {topicBreakdown.map(t => {
              const pct = t.total ? Math.round((t.correct/t.total)*100) : 0;
              return (
                <div key={t.topic} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:14, flexWrap:"wrap", gap:4 }}>
                    <span style={{ fontWeight:500 }}>{t.topic}</span>
                    <span className="mono" style={{ color:pct>=70?V.lime:pct>=50?V.gold:V.coral, fontWeight:700 }}>{t.correct}/{t.total}</span>
                  </div>
                  <div className="progress-bar">
                    <div style={{ height:"100%", width:`${pct}%`, background:pct>=70?`linear-gradient(90deg,${V.lime},#00bcd4)`:pct>=50?`linear-gradient(90deg,${V.gold},${V.orange})`:`linear-gradient(90deg,${V.coral},#ff6b2b)`, borderRadius:99, transition:"width 0.8s ease" }}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons — stacked on mobile */}
          <div className="results-actions btn-row" style={{ marginBottom:12 }}>
            <button className="btn btn-primary" onClick={() => setScreen("review")}>📋 Review Answers</button>
            <button className="btn btn-ghost" onClick={() => { setScreen("config"); setStarted(false); }}>🔄 New Quiz</button>
          </div>
          <button className="btn btn-ghost btn-full" onClick={() => setScreen("home")}>🏠 Home</button>
        </div>
      </div>
    );
  }

  // ── REVIEW ────────────────────────────────────────────────────────────────
  if (screen === "review") {
    const filtered = questions.filter(q => {
      if (filterMode==="wrong") return answers[q.id]!==q.answer;
      if (filterMode==="correct") return answers[q.id]===q.answer;
      if (filterMode==="flagged") return flagged.has(q.id);
      return true;
    });

    return (
      <div style={rootStyle}>
        <style>{css}</style>
        <div className="page">
          <div className="row-between" style={{ marginBottom:20 }}>
            <div>
              <h2 style={{ fontSize:"clamp(20px,5vw,24px)", fontWeight:800, background:"linear-gradient(135deg,#6C3EFF,#00E5FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Answer Review</h2>
              <p style={{ color:mutedColor, fontSize:14, marginTop:3 }}>{filtered.length} question{filtered.length!==1?"s":""}</p>
            </div>
            <button className="btn btn-ghost" style={{ minHeight:42 }} onClick={() => setScreen("results")}>← Results</button>
          </div>

          {/* Filter chips — scrollable row on mobile */}
          <div className="chips" style={{ marginBottom:20 }}>
            {[
              { id:"all", label:"All", count:questions.length },
              { id:"wrong", label:"Incorrect", count:questions.filter(q=>answers[q.id]!==q.answer).length },
              { id:"correct", label:"Correct", count:questions.filter(q=>answers[q.id]===q.answer).length },
              { id:"flagged", label:"🚩 Flagged", count:flagged.size },
            ].map(f => (
              <button key={f.id} className="chip" onClick={() => setFilterMode(f.id)}
                style={{ background:filterMode===f.id ? V.electric+"22" : isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.06)", borderColor:filterMode===f.id ? V.electric : "transparent", color:"inherit", fontFamily:"'Space Grotesk',sans-serif", WebkitTapHighlightColor:"transparent" }}>
                {f.label} <span style={{ color:mutedColor }}>({f.count})</span>
              </button>
            ))}
          </div>

          {filtered.length===0 && (
            <div style={{ ...cardS, textAlign:"center", padding:40, color:mutedColor }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🎯</div>
              <div style={{ fontWeight:600, fontSize:16 }}>No questions in this category</div>
            </div>
          )}

          {filtered.map(q => {
            const ua = answers[q.id];
            const isCorrect = ua===q.answer;
            const isSkipped = ua===-1 || ua===undefined;
            return (
              <div key={q.id} style={{ ...cardS, marginBottom:16, borderColor:isSkipped?"rgba(255,255,255,0.1)":isCorrect ? V.lime+"44" : V.coral+"44" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10, gap:8, flexWrap:"wrap" }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                    <span className="tag" style={{ background:V.electric+"22", color:V.electric, fontSize:10 }}>{q.topic}</span>
                    {flagged.has(q.id) && <span style={{ color:V.gold }}>🚩</span>}
                  </div>
                  <span style={{ fontSize:20 }}>{isSkipped?"⬜":isCorrect?"✅":"❌"}</span>
                </div>
                <p style={{ fontWeight:600, fontSize:"clamp(14px,3.5vw,16px)", marginBottom:14, lineHeight:1.55 }}>
                  <span className="mono" style={{ color:mutedColor, fontSize:12, marginRight:6 }}>Q{questions.indexOf(q)+1}.</span>
                  {q.question}
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {q.options.map((opt,idx) => {
                    const isCorrectOpt = idx===q.answer;
                    const isUserOpt = idx===ua;
                    return (
                      <div key={idx} style={{ padding:"11px 14px", borderRadius:10, fontSize:"clamp(13px,3.5vw,15px)", background:isCorrectOpt?V.lime+"15":isUserOpt&&!isCorrect?V.coral+"15":"transparent", border:`1px solid ${isCorrectOpt?V.lime+"55":isUserOpt&&!isCorrect?V.coral+"55":"transparent"}`, color:isCorrectOpt?V.lime:isUserOpt&&!isCorrect?V.coral:mutedColor, display:"flex", alignItems:"flex-start", gap:8, lineHeight:1.45 }}>
                        <span style={{ fontWeight:700, fontSize:12, flexShrink:0, marginTop:2 }}>{["A","B","C","D"][idx]}.</span>
                        <span style={{ flex:1 }}>{opt}</span>
                        {isCorrectOpt && <span style={{ flexShrink:0, fontWeight:700 }}>✓</span>}
                        {isUserOpt&&!isCorrect && <span style={{ flexShrink:0, fontWeight:700 }}>✗</span>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop:14, padding:"12px 14px", borderRadius:12, background:V.neon+"0d", border:`1px solid ${V.neon}22`, fontSize:"clamp(13px,3.5vw,14px)", lineHeight:1.65, color:isDark?"#a5f3fc":"#0c4a6e" }}>
                  💡 {q.explanation}
                </div>
              </div>
            );
          })}

          <div className="btn-row" style={{ marginTop:8 }}>
            <button className="btn btn-primary" onClick={() => { setScreen("config"); setStarted(false); }}>🔄 New Quiz</button>
            <button className="btn btn-ghost" onClick={() => setScreen("home")}>🏠 Home</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
