export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  status: string;
  category: "full-stack" | "frontend" | "local-ai" | "mobile";
  notes: string[];
  /** Repository / live links. Rendered only when present. */
  repos?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "fintrack",
    index: "01",
    title: "FinTrack",
    tagline: "Offline-first personal finance PWA",
    problem:
      "Personal finance tools assume always-online use. FinTrack needed to work offline first, then sync reliably with a hosted backend.",
    solution:
      "Split architecture: React + TypeScript + Vite PWA in web/ deployed to Vercel, Django + DRF API in api/ deployed to Render, shared sync-protocol contract in shared/, local Postgres via Docker Compose and Neon Postgres in production.",
    role: "Full-stack developer — sync contract, PWA shell, API integration",
    stack: ["React", "TypeScript", "Vite", "PWA", "Django DRF", "PostgreSQL", "Vercel", "Render"],
    status: "In development",
    category: "full-stack",
    notes: [
      "Offline-first: local persistence, then sync against the API contract",
      "Monorepo layout keeps web / api / shared in one sync protocol",
      "Prod split: Vercel frontend, Render backend, Neon Postgres",
    ],
  },
  {
    slug: "ilab-cict",
    index: "02",
    title: "iLabCICT Laboratory Management System",
    tagline: "Lab management platform for BulSU CICT — backend API",
    problem:
      "CICT laboratories needed a central place to report faults, track maintenance, and coordinate technical support — with secure access and live ticket updates.",
    solution:
      "Backend API in Django REST Framework over PostgreSQL with Cloudinary attachments: JWT-secured endpoints, optimized database queries, core business logic, real-time ticket management, notifications, and reporting features, served to a React frontend.",
    role: "Backend Developer — DRF API, security, realtime tickets, reporting",
    stack: ["Python", "Django REST Framework", "PostgreSQL", "React", "Cloudinary", "WebSocket"],
    status: "Deployed",
    category: "full-stack",
    notes: [
      "JWT-secured API with optimized database queries",
      "Real-time ticket management with notifications",
      "Reporting features over the core domain logic",
    ],
  },
  {
    slug: "linewise",
    index: "03",
    title: "Linewise",
    tagline: "Offline-first AI call QA — transcribe, redact, score, coach",
    problem:
      "In call centers every call is supposed to be checked — identity verification, script, disclosures, resolution — but analysts can only listen to a small sample one recording at a time, so coaching comes days late.",
    solution:
      "Upload a recording and Linewise transcribes it with speaker-tagged, timed lines, redacts customer PII, scores it out of 100 against an editable rubric (Passed 85–100, Needs review 70–84, Failed below 70 or any critical rule broken) with quoted evidence for every verdict, and exports a redacted PDF — all on the analyst's device. Scorecard editor, per-agent dashboard, coaching notes, and phone uploads over office Wi-Fi included. Evolved from the QA Sentinel hackathon build.",
    role: "Hackathon builder (Team Busseng) — transcription, scoring, and redaction pipeline",
    stack: ["React 19", "TypeScript", "Tailwind v4", "Whisper", "Ollama", "Dexie", "Express", "SQLite"],
    status: "6th place — AppBuildersPH Hackathon 2026",
    category: "local-ai",
    notes: [
      "No cloud inference — transcription, redaction, and scoring run on-device",
      "Every verdict needs a transcript quote; rejected if the quote isn't in it",
      "6th of 400+ teams, Local AI track — with landing page and read-only demo",
    ],
    repos: [
      { label: "GitHub — Linewise", url: "https://github.com/jpsoriaga/linewise" },
      { label: "Live demo", url: "https://linewise-six.vercel.app" },
    ],
  },
  {
    slug: "seekict",
    index: "04",
    title: "SeekICT",
    tagline: "Auth-gated ICT opportunities app",
    problem:
      "Students and staff needed a gated space for ICT-related opportunities with verified identities.",
    solution:
      "React 19 + Firebase web app with email + 6-digit OTP verification, role-aware navigation and admin sidebar, charts and scheduling surfaces, styled with Tailwind and DaisyUI.",
    role: "Backend Developer — auth flows, role-aware UI",
    stack: ["React 19", "Firebase", "React Router", "TailwindCSS", "DaisyUI", "recharts"],
    status: "Academic build",
    category: "full-stack",
    notes: [
      "Email OTP verification and password-reset flows",
      "Role-aware headers and admin navigation",
      "Firebase-backed data with client routing",
    ],
  },
  {
    slug: "cafe-collective",
    index: "05",
    title: "CafeCollective",
    tagline: "Coffee-shop discovery for the Philippines",
    problem:
      "Finding genuinely good independent cafés means wading through generic listings with no local signal.",
    solution:
      "Next.js app on OpenStreetMap data with a coffee_shops backend, recommended-place mapping, search, real-review surfaces, and community discovery for Filipino coffee lovers.",
    role: "Contributor — discovery views, place mapping",
    stack: ["Next.js", "TypeScript", "OpenStreetMap", "Supabase"],
    status: "Community build",
    category: "full-stack",
    notes: [
      "OpenStreetMap-backed nearby search",
      "Recommended-place to card mapping layer",
      "Editorial copy: real experiences, not algorithms",
    ],
  },
  {
    slug: "safe-bite",
    index: "06",
    title: "Safe Bite",
    tagline: "Allergen-aware food identification app",
    problem:
      "Checking packaged food against personal allergens by hand is slow and error-prone — shoppers need barcode-fast answers.",
    solution:
      "Backend processes for a Java/XML mobile app with Firebase NoSQL data synchronization and user authentication, plus Open Food Facts API integration for barcode-based food identification and personalized allergen checking.",
    role: "Backend Developer — sync, auth, food-data integration",
    stack: ["Java", "XML", "Firebase", "Open Food Facts API"],
    status: "Completed",
    category: "mobile",
    notes: [
      "Firebase NoSQL data synchronization and user authentication",
      "Barcode-based food identification via Open Food Facts API",
      "Personalized allergen checking on core app operations",
    ],
  },
  {
    slug: "quotely",
    index: "07",
    title: "Quotely",
    tagline: "One good quote on demand",
    problem:
      "Quote pages bury good lines in clutter — sometimes you just want a single attributed quote on demand.",
    solution:
      "React + Vite single-view app: fetches from the API Ninjas quotes endpoint with an env-kept API key, a generate button with loading state, attributed display, and one-click copy to clipboard.",
    role: "Developer — API integration, quote display, copy action",
    stack: ["React", "Vite", "API Ninjas", "CSS"],
    status: "Frontend build",
    category: "frontend",
    notes: [
      "API Ninjas quotes endpoint with the key kept in env",
      "Generate flow with an explicit loading state",
      "One-click copy-to-clipboard on every quote",
    ],
    repos: [{ label: "GitHub — Quotely", url: "https://github.com/Polstuds27/Quotely" }],
  },
  {
    slug: "pocketllm",
    index: "08",
    title: "PocketLLM",
    tagline: "Browser side-panel LLM chat — extension + backend",
    problem:
      "Switching tabs to chat with an AI breaks reading flow — the assistant should live beside the page instead.",
    solution:
      "Manifest V3 extension opening a React + shadcn side panel with markdown rendering over a WebSocket link to an Express backend, where a Groq chat agent with Tavily web-search tools answers with a per-message selectable model; Firebase backs the extension side.",
    role: "Full-stack developer — extension shell, WS protocol, Groq agent + search tools",
    stack: ["React", "shadcn", "Chrome MV3", "Express", "WebSocket", "Groq", "Tavily", "Firebase"],
    status: "Working prototype",
    category: "full-stack",
    notes: [
      "MV3 side panel with service worker and chat views",
      "Tool-calling loop: Tavily web search feeds the Groq answer",
      "One repo per side — extension and backend merged here as one build",
    ],
    repos: [
      { label: "GitHub — Extension", url: "https://github.com/Polstuds27/PocketLLM-extension" },
      { label: "GitHub — Backend", url: "https://github.com/Polstuds27/PocketLLM-Backend" },
    ],
  },
];

export const categories = [
  { value: "all", label: "All builds" },
  { value: "full-stack", label: "Full-stack" },
  { value: "frontend", label: "Frontend" },
  { value: "mobile", label: "Mobile" },
  { value: "local-ai", label: "Local AI" },
] as const;
