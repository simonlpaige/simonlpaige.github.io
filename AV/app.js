"use strict";

const AUTH = {
  salt: "dNpfM7lV/V3cpE/rZMiZbw==",
  hash: "tLnMerXafD5CZko6xoCXZAuDldeuyWXKAzH4v8U2heo=",
  iterations: 210000
};

const baselineProfiles = {
  conference: { label: "Conference room", baseCost: 7600, roomAdd: 4200, margin: 0.36, laborPct: 0.25, programmingPct: 0.07, contingency: 0.08 },
  courtroom: { label: "Courtroom or public meeting", baseCost: 21800, roomAdd: 12200, margin: 0.35, laborPct: 0.3, programmingPct: 0.12, contingency: 0.1 },
  auditorium: { label: "Auditorium or performance space", baseCost: 28600, roomAdd: 15800, margin: 0.34, laborPct: 0.32, programmingPct: 0.1, contingency: 0.11 },
  worship: { label: "House of worship", baseCost: 19600, roomAdd: 9300, margin: 0.35, laborPct: 0.31, programmingPct: 0.09, contingency: 0.1 },
  education: { label: "Classroom or training room", baseCost: 10800, roomAdd: 5600, margin: 0.36, laborPct: 0.26, programmingPct: 0.08, contingency: 0.08 },
  restaurant: { label: "Restaurant, bar, or venue", baseCost: 14200, roomAdd: 6800, margin: 0.37, laborPct: 0.29, programmingPct: 0.07, contingency: 0.09 },
  residential: { label: "Residential media room", baseCost: 13200, roomAdd: 7200, margin: 0.38, laborPct: 0.27, programmingPct: 0.08, contingency: 0.09 },
  service: { label: "Service or repair", baseCost: 1300, roomAdd: 950, margin: 0.4, laborPct: 0.54, programmingPct: 0.04, contingency: 0.12 },
  refresh: { label: "DSP/control refresh", baseCost: 5400, roomAdd: 2600, margin: 0.37, laborPct: 0.36, programmingPct: 0.18, contingency: 0.1 }
};

const sampleRecords = [
  { projectType: "conference", status: "won", sell: 18400, cost: 11300, margin: 0.386, laborPct: 0.24, category: "conference room" },
  { projectType: "conference", status: "won", sell: 31200, cost: 19100, margin: 0.388, laborPct: 0.28, category: "conference room" },
  { projectType: "courtroom", status: "won", sell: 48200, cost: 31800, margin: 0.34, laborPct: 0.31, category: "courtroom" },
  { projectType: "auditorium", status: "won", sell: 72400, cost: 47800, margin: 0.34, laborPct: 0.33, category: "auditorium" },
  { projectType: "worship", status: "won", sell: 38600, cost: 24700, margin: 0.36, laborPct: 0.3, category: "worship" },
  { projectType: "service", status: "won", sell: 2850, cost: 1640, margin: 0.425, laborPct: 0.58, category: "service" },
  { projectType: "refresh", status: "won", sell: 14900, cost: 9400, margin: 0.369, laborPct: 0.38, category: "control dsp refresh" }
];

const observedOpportunitySignals = [
  {
    projectType: "courtroom",
    count: 4,
    customerType: "public",
    pattern: "public-sector courtroom and council-style work",
    plays: [
      "Lead with uptime, courtroom continuity, and reduced finger-pointing between AV, IT, and facilities.",
      "Use alternates for recording, overflow, confidence monitoring, and microphone redundancy instead of burying them in one number.",
      "Spell out procurement assumptions: badging, insurance, after-hours access, prevailing wage, and approval path."
    ],
    risks: ["schedule access", "public purchasing rules", "mission-critical audio intelligibility"]
  },
  {
    projectType: "auditorium",
    count: 3,
    customerType: "public",
    pattern: "school/auditorium repair and performance-space opportunities",
    plays: [
      "Tie the value story to event-readiness, calendar protection, and a clean operator handoff for nontechnical staff.",
      "Separate lighting, projection, audio, and control recovery so the customer can approve a responsible phase now.",
      "Ask about blackout dates, lift access, stage use, and who owns day-of-show support."
    ],
    risks: ["school calendar", "lift/ceiling access", "lighting-control ownership"]
  },
  {
    projectType: "service",
    count: 4,
    customerType: "repeat",
    pattern: "service, repair, and rescue calls",
    plays: [
      "Sell diagnosis first, then give a minimum-restore option and an improvement option.",
      "Use a not-to-exceed service allowance when the fault chain is uncertain.",
      "Convert the fix into a refresh conversation only after the immediate pain is handled."
    ],
    risks: ["unknown existing conditions", "parts availability", "scope creep after diagnosis"]
  },
  {
    projectType: "refresh",
    count: 2,
    customerType: "repeat",
    pattern: "DSP, touchpanel, control, and programming refresh work",
    plays: [
      "Frame the scope around reliability, supportability, and documentation, not just replacing a box.",
      "Budget for file recovery, code review, commissioning, and a rollback plan.",
      "Show a clear boundary between owner-requested changes and bug-fix support."
    ],
    risks: ["source-code access", "firmware compatibility", "commissioning time"]
  }
];

const state = {
  importedRecords: [],
  lastResult: null,
  usingSample: false
};

const els = {
  lockScreen: document.getElementById("lockScreen"),
  unlockForm: document.getElementById("unlockForm"),
  passwordInput: document.getElementById("passwordInput"),
  lockError: document.getElementById("lockError"),
  workspace: document.getElementById("workspace"),
  bidForm: document.getElementById("bidForm"),
  estimateCards: document.getElementById("estimateCards"),
  assumptions: document.getElementById("assumptions"),
  metricTable: document.getElementById("metricTable"),
  strategyGrid: document.getElementById("strategyGrid"),
  followupText: document.getElementById("followupText"),
  dataStatus: document.getElementById("dataStatus"),
  confidenceStatus: document.getElementById("confidenceStatus"),
  marginStatus: document.getElementById("marginStatus"),
  pathStatus: document.getElementById("pathStatus"),
  fileInput: document.getElementById("fileInput"),
  dropZone: document.getElementById("dropZone"),
  importSummary: document.getElementById("importSummary"),
  previewTable: document.getElementById("previewTable"),
  modelSummary: document.getElementById("modelSummary")
};

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.round(value || 0));
}

function percent(value) {
  return `${Math.round((value || 0) * 100)}%`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function median(values) {
  const nums = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function average(values) {
  const nums = values.filter(Number.isFinite);
  if (!nums.length) return null;
  return nums.reduce((sum, item) => sum + item, 0) / nums.length;
}

function parseAmount(value) {
  if (typeof value === "number") return value;
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const negative = raw.includes("(") && raw.includes(")");
  const cleaned = raw.replace(/[$,%\s,"]/g, "").replace(/[()]/g, "");
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return null;
  return negative ? -parsed : parsed;
}

function parseMargin(value) {
  const amount = parseAmount(value);
  if (!Number.isFinite(amount)) return null;
  return amount > 1 ? amount / 100 : amount;
}

function normalizeKey(key) {
  return String(key || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function readField(row, candidates) {
  const keys = Object.keys(row);
  const normalized = new Map(keys.map((key) => [normalizeKey(key), key]));
  for (const candidate of candidates) {
    const exact = normalized.get(normalizeKey(candidate));
    if (exact && row[exact] !== "") return row[exact];
  }
  for (const candidate of candidates) {
    const wanted = normalizeKey(candidate);
    if (wanted.length < 6) continue;
    const match = keys.find((key) => normalizeKey(key).includes(wanted));
    if (match && row[match] !== "") return row[match];
  }
  return "";
}

function firstPositive(row, candidates) {
  for (const candidate of candidates) {
    const parsed = parseAmount(readField(row, [candidate]));
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}

function inferProjectType(text) {
  const value = String(text || "").toLowerCase();
  if (/(court|judge|jury|public meeting|council|division)/.test(value)) return "courtroom";
  if (/(auditorium|theater|stage|perform|pac|ballroom)/.test(value)) return "auditorium";
  if (/(church|worship|sanctuary|chapel)/.test(value)) return "worship";
  if (/(classroom|training|school|lecture|education)/.test(value)) return "education";
  if (/(restaurant|bar|venue|patio|hospitality)/.test(value)) return "restaurant";
  if (/(home|media room|residential|theater room)/.test(value)) return "residential";
  if (/(service|repair|fix|troubleshoot|touchpad|projector repair|tv service)/.test(value)) return "service";
  if (/(dsp|control|q-sys|qsys|biamp|extron|touchpanel|refresh|programming)/.test(value)) return "refresh";
  return "conference";
}

function normalizeRecord(row) {
  const projectName = readField(row, ["project", "project name", "job", "job name", "proposal", "name", "title"]);
  const client = readField(row, ["client", "customer", "company", "account", "contact"]);
  const status = String(readField(row, ["status", "stage", "state", "outcome", "result"])).toLowerCase();
  const category = readField(row, ["category", "system", "room", "type", "department", "section"]);
  const sell = firstPositive(row, ["sell", "sell total", "sell price", "selling price", "customer price", "customer total", "proposal total", "grand total", "extended price", "amount", "revenue", "price", "total"]);
  const cost = firstPositive(row, ["total cost", "extended cost", "dealer cost", "purchase cost", "unit cost", "cost", "buy"]);
  const marginFromColumn = parseMargin(readField(row, ["margin", "gross margin", "gm", "profit margin"]));
  const profit = firstPositive(row, ["profit", "gross profit", "gp"]);
  let margin = marginFromColumn;
  if (!Number.isFinite(margin) && Number.isFinite(sell) && Number.isFinite(cost) && sell > 0) {
    margin = (sell - cost) / sell;
  }
  if (!Number.isFinite(margin) && Number.isFinite(sell) && Number.isFinite(profit) && sell > 0) {
    margin = profit / sell;
  }
  const labor = firstPositive(row, ["labor", "install labor", "installation", "programming", "engineering", "pm labor", "service labor"]);
  const laborPct = Number.isFinite(labor) && Number.isFinite(sell) && sell > 0 ? clamp(labor / sell, 0.05, 0.75) : null;
  const text = [projectName, client, category, status].join(" ");
  const projectType = inferProjectType(text);
  const wonLike = /(won|approved|accepted|sold|closed|contract|success|complete)/.test(status);
  const lostLike = /(lost|declined|dead|cancel|void|hold)/.test(status);

  return {
    projectName: projectName || "Imported project",
    client,
    status,
    category,
    projectType,
    sell,
    cost,
    margin: Number.isFinite(margin) ? clamp(margin, 0.05, 0.75) : null,
    laborPct,
    wonLike,
    lostLike,
    raw: row
  };
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      current.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      current.push(cell);
      if (current.some((value) => value.trim() !== "")) rows.push(current);
      current = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  current.push(cell);
  if (current.some((value) => value.trim() !== "")) rows.push(current);
  if (!rows.length) return [];

  const headers = rows[0].map((header, index) => header.trim() || `Column ${index + 1}`);
  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ? row[index].trim() : "";
    });
    return record;
  });
}

function sourceRecords() {
  return state.importedRecords.length ? state.importedRecords : sampleRecords;
}

function matchingSignals(projectType) {
  return observedOpportunitySignals.filter((signal) => signal.projectType === projectType);
}

function signalCount(projectType) {
  return matchingSignals(projectType).reduce((sum, signal) => sum + signal.count, 0);
}

function successfulRecords() {
  return sourceRecords().filter((record) => {
    if (record.lostLike) return false;
    if (!Number.isFinite(record.sell) || record.sell <= 0) return false;
    return record.wonLike || !state.importedRecords.length || !record.status;
  });
}

function buildModel(projectType) {
  const base = baselineProfiles[projectType] || baselineProfiles.conference;
  const success = successfulRecords();
  const typeMatches = success.filter((record) => record.projectType === projectType);
  const usable = typeMatches.length >= 3 ? typeMatches : success;
  const observedSignals = matchingSignals(projectType);
  const observedCount = signalCount(projectType);
  const importedWeight = state.importedRecords.length ? clamp(usable.length / 16, 0.2, 0.85) : 0;
  const learnedMargin = median(usable.map((record) => record.margin));
  const learnedLabor = median(usable.map((record) => record.laborPct));
  const learnedSell = median(typeMatches.map((record) => record.sell));
  const model = {
    ...base,
    learnedCount: usable.length,
    typeCount: typeMatches.length,
    observedSignals,
    observedCount,
    margin: Number.isFinite(learnedMargin) ? (base.margin * (1 - importedWeight)) + (learnedMargin * importedWeight) : base.margin,
    laborPct: Number.isFinite(learnedLabor) ? (base.laborPct * (1 - importedWeight)) + (learnedLabor * importedWeight) : base.laborPct,
    medianSell: Number.isFinite(learnedSell) ? learnedSell : null,
    confidence: state.importedRecords.length >= 25 && typeMatches.length >= 5 ? "High" : state.importedRecords.length >= 6 ? "Medium" : "Baseline"
  };
  if (!state.importedRecords.length && observedCount >= 3) model.confidence = "Observed baseline";
  model.margin = clamp(model.margin, 0.24, 0.48);
  model.laborPct = clamp(model.laborPct, 0.16, 0.58);
  return model;
}

function formValues() {
  const data = new FormData(els.bidForm);
  const checked = (name) => data.get(name) === "on";
  const number = (name) => Math.max(0, Number(data.get(name)) || 0);
  return {
    projectName: data.get("projectName") || "New AV Opportunity",
    projectType: data.get("projectType"),
    customerType: data.get("customerType"),
    decisionStage: data.get("decisionStage"),
    rooms: Math.max(1, number("rooms")),
    displays: number("displays"),
    mics: number("mics"),
    speakers: number("speakers"),
    cameras: number("cameras"),
    dsp: number("dsp"),
    control: checked("control"),
    networking: checked("networking"),
    lighting: checked("lighting"),
    streaming: checked("streaming"),
    training: checked("training"),
    complexity: clamp(Number(data.get("complexity")) || 3, 1, 5),
    budget: parseAmount(data.get("budget")),
    notes: data.get("notes") || ""
  };
}

function estimateProject(input, model) {
  const roomScale = 1 + ((input.rooms - 1) * 0.72);
  const complexityFactor = 0.86 + (input.complexity * 0.08);
  const publicSignalFactor = input.customerType === "public" ? 1.06 : 1;
  const rescueFactor = input.decisionStage === "rescue" ? 1.08 : 1;
  const observedFactor = !state.importedRecords.length && model.observedCount >= 3 ? 1.03 : 1;
  const featureCost =
    (input.displays * 880) +
    (input.mics * 260) +
    (input.speakers * 115) +
    (input.cameras * 720) +
    (input.dsp * 1550) +
    (input.control ? 2400 : 0) +
    (input.networking ? 1350 : 0) +
    (input.lighting ? 4100 : 0) +
    (input.streaming ? 2100 : 0) +
    (input.training ? 550 : 0);

  const directEquipment = ((model.baseCost * roomScale) + featureCost) * complexityFactor * publicSignalFactor * rescueFactor * observedFactor;
  const labor = directEquipment * model.laborPct;
  const programming = directEquipment * model.programmingPct + (input.control ? 900 : 0) + (input.lighting ? 650 : 0);
  const pm = (directEquipment + labor + programming) * 0.075;
  const contingency = (directEquipment + labor + programming + pm) * model.contingency;
  const direct = directEquipment + labor + programming + pm + contingency;

  const stageMargin = input.decisionStage === "ready" ? 0.005 : input.decisionStage === "rescue" ? 0.02 : input.decisionStage === "exploring" ? -0.01 : 0;
  const targetMargin = clamp(model.margin + stageMargin, 0.25, 0.48);
  const variants = [
    { name: "Good", scale: 0.84, marginOffset: -0.025, note: "Meets the core request and keeps scope controlled." },
    { name: "Better", scale: 1, marginOffset: 0, note: "Best default: complete system, clean handoff, fewer support surprises." },
    { name: "Best", scale: 1.28, marginOffset: 0.018, note: "Adds resilience, polish, expansion headroom, and stronger support posture." }
  ];

  const recommended = input.decisionStage === "exploring" || (Number.isFinite(input.budget) && input.budget < direct / (1 - targetMargin)) ? "Good" : input.complexity >= 4 || input.customerType === "public" ? "Best" : "Better";

  const estimates = variants.map((variant) => {
    const variantDirect = direct * variant.scale;
    const margin = clamp(targetMargin + variant.marginOffset, 0.24, 0.5);
    const sell = variantDirect / (1 - margin);
    return {
      ...variant,
      recommended: variant.name === recommended,
      directCost: variantDirect,
      margin,
      sell,
      equipment: directEquipment * variant.scale,
      labor: labor * variant.scale,
      programming: programming * variant.scale,
      pm: pm * variant.scale,
      contingency: contingency * variant.scale
    };
  });

  return { estimates, targetMargin, recommended };
}

function generateAssumptions(input, model, result) {
  const assumptions = [
    ["Model basis", `${model.confidence} confidence from ${model.learnedCount} usable price record${model.learnedCount === 1 ? "" : "s"}, ${model.observedCount} sanitized Jetbuilt history signal${model.observedCount === 1 ? "" : "s"}, and AV baseline rules.`],
    ["Scope posture", `${baselineProfiles[input.projectType].label}, ${input.rooms} room${input.rooms === 1 ? "" : "s"}, complexity ${input.complexity}/5.`],
    ["Margin posture", `Target margin is ${percent(result.targetMargin)} before final vendor cost checks.`],
    ["Labor posture", `Install, programming, PM, commissioning, and training are included as separate risk-bearing buckets.`]
  ];

  if (Number.isFinite(input.budget)) {
    const better = result.estimates.find((item) => item.name === "Better").sell;
    assumptions.push(["Budget fit", input.budget >= better ? `Known budget can carry the Better path with room to protect scope.` : `Known budget is below the Better path by about ${money(better - input.budget)}.`]);
  }
  if (input.lighting) assumptions.push(["Lighting integration", "Confirm scene ownership, processor access, schedules, and fallback behavior before final quote."]);
  if (input.networking) assumptions.push(["Network", "Hold a network discovery step for VLANs, PoE budget, multicast, switch access, and client IT owner."]);
  if (input.decisionStage === "rescue") assumptions.push(["Rescue work", "Lead with diagnosis, minimum viable restore, and a separate improvement path."]);
  model.observedSignals.forEach((signal) => {
    assumptions.push(["Observed pattern", `${signal.pattern}; watch ${signal.risks.join(", ")}.`]);
  });

  return assumptions;
}

function generateStrategies(input, result, model) {
  const better = result.estimates.find((item) => item.name === "Better");
  const best = result.estimates.find((item) => item.name === "Best");
  const good = result.estimates.find((item) => item.name === "Good");

  const discovery = [
    "Ask what failed last time, who gets blamed when it fails, and what deadline matters.",
    "Confirm who signs, who operates it daily, and who maintains it after install.",
    "Get drawings, device counts, photos, network owner, ceiling conditions, and existing rack condition before final number."
  ];

  if (input.customerType === "public") {
    discovery.push("Clarify purchasing path, bid threshold, prevailing wage, insurance, badging, background checks, and required alternates.");
  }
  if (input.decisionStage === "budgeting") {
    discovery.push("Offer a budgetary range now, then gate final pricing behind a short discovery visit.");
  }

  const positioning = [
    `Anchor around the Better path at ${money(better.sell)} as the responsible complete answer.`,
    `Use Good at ${money(good.sell)} only when they need a controlled starting point.`,
    `Use Best at ${money(best.sell)} for resilience, expansion, cleaner support, and fewer callbacks.`
  ];

  if (input.decisionStage === "rescue") {
    positioning.unshift("Sell the first step as stabilization, not a giant redesign. People buy relief before elegance.");
  }
  model.observedSignals.forEach((signal) => {
    signal.plays.forEach((play) => positioning.push(play));
  });

  const risk = [
    "List assumptions plainly: owner-provided network, display locations, electrical availability, ceiling access, and after-hours work.",
    "Separate unknowns into allowances instead of burying them in margin.",
    "Do not promise final proposal accuracy until the report-calibrated model has enough matching wins."
  ];

  if (model.confidence !== "High") {
    risk.push("Import won proposal and line-item reports before treating this as a final estimating baseline.");
  }
  model.observedSignals.forEach((signal) => {
    risk.push(`For ${signal.pattern}, protect against ${signal.risks.join(", ")}.`);
  });

  const close = [
    "Send a same-day recap with Good, Better, Best and the missing questions.",
    "Ask for a yes/no on the Better path first, then trim scope only if they push budget.",
    "Schedule the next step while the pain is fresh: site check, drawing review, or purchasing call."
  ];

  return [
    { title: "Discovery", items: discovery },
    { title: "Positioning", items: positioning },
    { title: "Risk Control", items: risk },
    { title: "Close Plan", items: close }
  ];
}

function generateFollowup(input, result, strategies) {
  const good = result.estimates.find((item) => item.name === "Good");
  const better = result.estimates.find((item) => item.name === "Better");
  const best = result.estimates.find((item) => item.name === "Best");
  const questions = strategies[0].items.slice(0, 3).map((item) => `- ${item}`).join("\n");

  return `Subject: ${input.projectName} - budget paths and next step

Hi,

Here is the clean budgetary structure for ${input.projectName}.

Good: ${money(good.sell)}
Core scope, controlled assumptions, lowest reasonable entry point.

Better: ${money(better.sell)}
Recommended path. Complete system, commissioning, training, and a cleaner support handoff.

Best: ${money(best.sell)}
Adds resilience, expansion room, and stronger support posture.

Before I would call this final, I would want to confirm:
${questions}

My recommendation is to use Better as the planning number, then trim only if budget forces it. That avoids starting too low and losing the labor, commissioning, and handoff time that keeps AV systems from becoming support problems later.

Next step: site check or drawing review, then I can turn this into a tighter proposal.`;
}

function renderEstimate(result) {
  els.estimateCards.innerHTML = result.estimates.map((estimate) => `
    <article class="estimate-card ${estimate.recommended ? "recommended" : ""}">
      <header>
        <h3>${estimate.name}${estimate.recommended ? " Recommendation" : ""}</h3>
        <span class="price">${money(estimate.sell)}</span>
      </header>
      <p>${estimate.note}</p>
      <div class="line-list">
        <div class="line-item"><span>Equipment and materials</span><span>${money(estimate.equipment)}</span></div>
        <div class="line-item"><span>Install labor</span><span>${money(estimate.labor)}</span></div>
        <div class="line-item"><span>Programming and engineering</span><span>${money(estimate.programming)}</span></div>
        <div class="line-item"><span>PM, commissioning, contingency</span><span>${money(estimate.pm + estimate.contingency)}</span></div>
        <div class="line-item"><span>Estimated margin</span><span>${percent(estimate.margin)}</span></div>
      </div>
    </article>
  `).join("");
}

function renderAssumptions(assumptions, input, model, result) {
  els.assumptions.innerHTML = assumptions.map(([title, copy]) => `
    <div class="assumption"><strong>${title}</strong>${copy}</div>
  `).join("");

  const better = result.estimates.find((item) => item.name === "Better");
  const rows = [
    ["Project type", baselineProfiles[input.projectType].label],
    ["Learned records", String(model.learnedCount)],
    ["Type matches", String(model.typeCount)],
    ["Labor percent", percent(model.laborPct)],
    ["Programming percent", percent(model.programmingPct)],
    ["Better direct cost", money(better.directCost)]
  ];
  els.metricTable.innerHTML = rows.map(([label, value]) => `
    <div class="metric-row"><span>${label}</span><span class="metric-value">${value}</span></div>
  `).join("");
}

function renderStrategies(strategies) {
  els.strategyGrid.innerHTML = strategies.map((strategy) => `
    <article class="strategy-card">
      <h3>${strategy.title}</h3>
      <ul>${strategy.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderModel(model) {
  const records = successfulRecords();
  const avgSell = average(records.map((record) => record.sell));
  const signalLabels = model.observedSignals.map((signal) => `${signal.pattern} (${signal.count})`);
  const rows = [
    ["Usable successful records", model.learnedCount],
    ["Matching type records", model.typeCount],
    ["Sanitized Jetbuilt signals", model.observedCount],
    ["Model confidence", model.confidence],
    ["Median matching sell", model.medianSell ? money(model.medianSell) : "Not enough data"],
    ["Average successful sell", avgSell ? money(avgSell) : "Not enough data"],
    ["Target gross margin", percent(model.margin)],
    ["Labor as share of cost basis", percent(model.laborPct)],
    ["Programming as share of cost basis", percent(model.programmingPct)],
    ["Contingency", percent(model.contingency)]
  ];
  els.modelSummary.innerHTML = rows.map(([label, value]) => `
    <div class="model-row"><span>${label}</span><strong>${value}</strong></div>
  `).join("") + `
    <div class="model-row model-note"><span>Observed patterns</span><strong>${signalLabels.join(", ") || "None for this type"}</strong></div>
  `;
}

function renderImportSummary() {
  const success = successfulRecords();
  const total = state.importedRecords.length;
  const source = total ? state.importedRecords : sampleRecords;
  const byType = Object.keys(baselineProfiles).map((type) => {
    const count = source.filter((record) => record.projectType === type).length;
    return count ? `${baselineProfiles[type].label}: ${count}` : null;
  }).filter(Boolean);

  els.importSummary.innerHTML = `
    <div class="model-row"><span>Imported rows</span><strong>${total}</strong></div>
    <div class="model-row"><span>Usable successful rows</span><strong>${success.length}</strong></div>
    <div class="model-row"><span>Sanitized Jetbuilt signals</span><strong>${observedOpportunitySignals.reduce((sum, signal) => sum + signal.count, 0)}</strong></div>
    <div class="model-row"><span>Current source</span><strong>${total ? "Imported CSV" : "Built-in AV baseline + history signals"}</strong></div>
    <div class="line-item"><span>Type coverage</span><span>${byType.join(", ") || "None"}</span></div>
  `;

  const preview = source.slice(0, 12);
  if (!preview.length) {
    els.previewTable.innerHTML = "";
    return;
  }
  els.previewTable.innerHTML = `
    <table>
      <thead><tr><th>Project</th><th>Type</th><th>Status</th><th>Sell</th><th>Margin</th><th>Labor</th></tr></thead>
      <tbody>
        ${preview.map((record) => `
          <tr>
            <td>${escapeHtml(record.projectName || record.category || "Imported row")}</td>
            <td>${escapeHtml(baselineProfiles[record.projectType]?.label || record.projectType)}</td>
            <td>${escapeHtml(record.status || "unknown")}</td>
            <td>${Number.isFinite(record.sell) ? money(record.sell) : "missing"}</td>
            <td>${Number.isFinite(record.margin) ? percent(record.margin) : "missing"}</td>
            <td>${Number.isFinite(record.laborPct) ? percent(record.laborPct) : "missing"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function updateStatus(input, model, result) {
  els.dataStatus.textContent = state.importedRecords.length ? `${state.importedRecords.length} imported rows` : "Baseline + history signals";
  els.confidenceStatus.textContent = model.confidence;
  els.marginStatus.textContent = percent(result.targetMargin);
  els.pathStatus.textContent = result.recommended;
}

function recalc() {
  const input = formValues();
  const model = buildModel(input.projectType);
  const result = estimateProject(input, model);
  const assumptions = generateAssumptions(input, model, result);
  const strategies = generateStrategies(input, result, model);
  const followup = generateFollowup(input, result, strategies);

  state.lastResult = { input, model, result, assumptions, strategies, followup, generatedAt: new Date().toISOString() };

  renderEstimate(result);
  renderAssumptions(assumptions, input, model, result);
  renderStrategies(strategies);
  renderModel(model);
  renderImportSummary();
  updateStatus(input, model, result);
  els.followupText.value = followup;
}

async function digestPassword(password) {
  const enc = new TextEncoder();
  const salt = Uint8Array.from(atob(AUTH.salt), (char) => char.charCodeAt(0));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: AUTH.iterations, hash: "SHA-256" }, key, 256);
  return btoa(String.fromCharCode(...new Uint8Array(bits)));
}

async function unlock(password) {
  const hash = await digestPassword(password);
  if (hash !== AUTH.hash) {
    els.lockError.textContent = "Wrong password.";
    return;
  }
  sessionStorage.setItem("avBidUnlocked", "1");
  els.lockScreen.classList.add("hidden");
  els.workspace.hidden = false;
  recalc();
}

function lock() {
  sessionStorage.removeItem("avBidUnlocked");
  els.workspace.hidden = true;
  els.lockScreen.classList.remove("hidden");
  els.passwordInput.value = "";
  els.passwordInput.focus();
}

async function importFiles(files) {
  const imported = [];
  for (const file of files) {
    const text = await file.text();
    const rows = parseCsv(text);
    imported.push(...rows.map(normalizeRecord));
  }
  state.importedRecords = imported.filter((record) => Number.isFinite(record.sell) || record.projectName || record.category);
  state.usingSample = false;
  recalc();
}

function copyBid() {
  if (!state.lastResult) recalc();
  const { input, result, assumptions, followup } = state.lastResult;
  const estimateText = result.estimates.map((estimate) => `${estimate.name}: ${money(estimate.sell)} (${percent(estimate.margin)} margin)`).join("\n");
  const assumptionText = assumptions.map(([title, copy]) => `- ${title}: ${copy}`).join("\n");
  const payload = `${input.projectName}\n\n${estimateText}\n\nAssumptions\n${assumptionText}\n\n${followup}`;
  navigator.clipboard.writeText(payload).catch(() => {
    els.followupText.value = payload;
    els.followupText.select();
  });
}

function downloadPlan() {
  if (!state.lastResult) recalc();
  const blob = new Blob([JSON.stringify(state.lastResult, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "av-sales-strategy-bid-plan.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function resetForm() {
  els.bidForm.reset();
  recalc();
}

function setTab(name) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === name);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === name);
  });
}

function bindEvents() {
  els.unlockForm.addEventListener("submit", (event) => {
    event.preventDefault();
    els.lockError.textContent = "";
    unlock(els.passwordInput.value);
  });

  els.bidForm.addEventListener("input", recalc);
  els.bidForm.addEventListener("change", recalc);

  document.getElementById("copyBidBtn").addEventListener("click", copyBid);
  document.getElementById("downloadBtn").addEventListener("click", downloadPlan);
  document.getElementById("lockBtn").addEventListener("click", lock);
  document.getElementById("resetBtn").addEventListener("click", resetForm);
  document.getElementById("clearDataBtn").addEventListener("click", () => {
    state.importedRecords = [];
    state.usingSample = false;
    recalc();
  });
  document.getElementById("useSampleBtn").addEventListener("click", () => {
    state.importedRecords = sampleRecords.map((record) => ({ ...record, projectName: baselineProfiles[record.projectType].label }));
    state.usingSample = true;
    recalc();
  });

  els.fileInput.addEventListener("change", (event) => importFiles([...event.target.files]));

  ["dragenter", "dragover"].forEach((name) => {
    els.dropZone.addEventListener(name, (event) => {
      event.preventDefault();
      els.dropZone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((name) => {
    els.dropZone.addEventListener(name, (event) => {
      event.preventDefault();
      els.dropZone.classList.remove("dragging");
    });
  });

  els.dropZone.addEventListener("drop", (event) => {
    const files = [...event.dataTransfer.files].filter((file) => file.name.toLowerCase().endsWith(".csv"));
    if (files.length) importFiles(files);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });
}

bindEvents();
renderImportSummary();

if (sessionStorage.getItem("avBidUnlocked") === "1") {
  els.lockScreen.classList.add("hidden");
  els.workspace.hidden = false;
  recalc();
}
