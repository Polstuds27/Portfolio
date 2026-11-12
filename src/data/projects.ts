import type { TechId } from "@/data/tech";

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  /** Full list of technologies used, by id from src/data/tech.ts. Drives the About stack's "Used in" links. */
  tech: TechId[];
  status: string;
  category: "full-stack" | "frontend" | "local-ai" | "mobile";
  notes: string[];
  /** Repository / live links. Rendered only when present. */
  repos?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "Trove",
    index: "01",
    title: "Trove",
    tagline: "Offline-first personal finance PWA",
    problem:
      "Personal finance tools assume always-online use. Trove needed to work offline first, then sync reliably with a hosted backend.",
    solution:
      "Split architecture: React + TypeScript + Vite PWA in web/ deployed to Vercel, Django + DRF API in api/ deployed to Render, shared sync-protocol contract in shared/, local Postgres via Docker Compose and Neon Postgres in production.",
    role: "Full-stack developer — sync contract, PWA shell, API integration",
    stack: ["React", "TypeScript", "Vite", "PWA", "Django DRF", "PostgreSQL", "Vercel", "Render"],
    tech: ["python", "django-rest-framework", "postgresql", "typescript", "react", "tailwind-css", "vite", "docker-compose", "vercel", "render", "neon", "git-github"],
    status: "In development",
    category: "full-stack",
    notes: [
      "Offline-first: local persistence, then sync against the API contract",
      "Monorepo layout keeps web / api / shared in one sync protocol",
      "Prod split: Vercel frontend, Render backend, Neon Postgres",
    ],
    repos: [
      { label: "GitHub — Trove", url: "https://github.com/Polstuds27/Trove" },
      { label: "Live app", url: "https://trovefinance.vercel.app" },
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
    tech: ["python", "django-rest-framework", "postgresql", "typescript", "react", "tailwind-css", "vite", "vercel", "postman", "git-github"],
    status: "Deployed",
    category: "full-stack",
    notes: [
      "JWT-secured API with optimized database queries",
      "Real-time ticket management with notifications",
      "Reporting features over the core domain logic",
    ],
    repos: [{ label: "Live app", url: "https://ilabcict.vercel.app" }],
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
    tech: ["node-express", "typescript", "react", "tailwind-css", "vite", "whisper", "ollama", "vercel", "git-github"],
    status: "6th place — AppBuildersPH Hackathon 2026",
    category: "local-ai",
    notes: [
      "No cloud inference — transcription, redaction, and scoring run on-device",
      "Every verdict needs a transcript quote; rejected if the quote isn't in it",
      "6th of 400+ teams, Local AI track — with landing page and read-only demo",
    ],
    repos: [
      { label: "GitHub — Linewise", url: "https://github.com/jpsoriaga/linewise" },
      { label: "Live demo", url: "https://linewise-hackathon.vercel.app" },
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
    tech: ["firebase", "react", "tailwind-css", "vite", "git-github"],
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
    tech: ["typescript", "react", "tailwind-css", "git-github"], // Next.js (full-stack) counted as React
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
    tech: ["java-xml-android", "firebase", "git-github"],
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
    tech: ["react", "vite", "git-github"],
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
    tech: ["node-express", "typescript", "react", "tailwind-css", "vite", "firebase", "git-github"],
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

/* ——— Home page "Selected work" showcase ——— */

export type ProjectLink = { label: "Case study" | "Live" | "Code"; href: string; external?: boolean };

export type ShowcaseProject = {
  slug: string;
  title: string;
  /** One line. */
  tagline: string;
  /** Max ~2 lines — written to fit, never truncated. */
  pitch: string;
  /** Up to 3 bullets; shown on the featured card and on rows. */
  highlights?: string[];
  badge?: { label: string; tone: "status" | "award" };
  /** Max 5. */
  stack: string[];
  image: { src: string; alt: string };
  /** Rendered in this order. */
  links: ProjectLink[];
  featured?: boolean;
};

const img = (file: string) => `${import.meta.env.BASE_URL}projects/${file}`;

export const selectedWork: ShowcaseProject[] = [
  {
    slug: "linewise",
    title: "Linewise",
    tagline: "Offline-first AI call QA",
    pitch:
      "Upload a call recording and Linewise transcribes it, redacts customer PII, and scores it against an editable rubric, all on-device so audio never leaves the machine.",
    highlights: [
      "No cloud inference: transcription, redaction and scoring all run on-device",
      "Every verdict must quote the transcript, and is rejected if the quote isn't there",
      "Placed 6th of 400+ teams in the Local AI track",
    ],
    badge: { label: "6th place · AppBuildersPH Hackathon 2026", tone: "award" },
    stack: ["React", "TypeScript", "Whisper", "Ollama", "Dexie"],
    image: {
      src: img("linewise.png"),
      alt: "Linewise homepage in a browser window: the headline “Every call checked. Nothing leaves the laptop.” above a scored sample call at 62 out of 100",
    },
    links: [
      { label: "Live", href: "https://linewise-hackathon.vercel.app", external: true },
      { label: "Case study", href: "/projects/linewise" },
      { label: "Code", href: "https://github.com/jpsoriaga/linewise", external: true },
    ],
    featured: true,
  },
  {
    slug: "Trove",
    title: "Trove",
    tagline: "Offline-first personal finance PWA",
    pitch:
      "A personal finance app that works fully offline and syncs when you're back online. I designed the sync protocol shared between the React PWA and the Django API, so client and server can't drift apart.",
    highlights: [
      "How sync conflicts are resolved",
      "How offline data is persisted on the client",
    ],
    badge: { label: "In development", tone: "status" },
    stack: ["React", "TypeScript", "Django DRF", "PostgreSQL", "PWA"],
    image: {
      src: img("trove.png"),
      alt: "Trove shown in a browser window, with the headline “Your money, clearly.” and a sprout mascot, next to a phone showing the app's Overview screen with total balance, income and expenses",
    },
    links: [
      { label: "Live", href: "https://trovefinance.vercel.app", external: true },
      { label: "Case study", href: "/projects/Trove" },
      { label: "Code", href: "https://github.com/Polstuds27/Trove", external: true },
    ],
  },
  {
    slug: "ilab-cict",
    title: "iLabCICT",
    tagline: "Lab management platform for BulSU CICT",
    // TODO: add a usage number, e.g. labs or users
    pitch:
      "The backend for my university's computer lab system: JWT-secured REST API, real-time ticketing over WebSockets, and tuned Postgres queries.",
    badge: { label: "Deployed", tone: "status" },
    stack: ["Django REST Framework", "PostgreSQL", "WebSocket", "React", "Cloudinary"],
    image: {
      src: img("ilabcict.png"),
      alt: "iLabCICT homepage in a browser window: the iLabCICT wordmark over “Premium control for laboratory support, assets, and reports.” with a live operations console preview",
    },
    links: [
      { label: "Live", href: "https://ilabcict.vercel.app", external: true },
      { label: "Case study", href: "/projects/ilab-cict" },
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
