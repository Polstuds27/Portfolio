export type Experience = {
  id: string;
  /** Job title or role. */
  role: string;
  /** Company or organization. */
  organization: string;
  /** Employment type, when applicable. */
  employmentType?: string;
  /** Start date, e.g. "Jun 2024". */
  startDate: string;
  /** End date, e.g. "Aug 2024". Omit when present is true. */
  endDate?: string;
  /** Set true for an ongoing role — renders as "Present". */
  present?: boolean;
  /** Location or remote status, when applicable. */
  location?: string;
  /** Concise description of responsibilities and accomplishments. */
  description: string;
  /** Relevant technologies or skills. */
  technologies: string[];
  /** Optional internal or external link shown under the description. */
  link?: { label: string; href: string; external?: boolean };
};

/**
 * Work experience entries, newest first.
 */
export const experiences: Experience[] = [
  {
    id: "appbuildersph-2026",
    role: "Top 6 of 400+ teams",
    organization: "AppBuildersPH Hackathon",
    employmentType: "Hackathon",
    startDate: "Oct 2026",
    endDate: "Oct 2026",
    description:
      "Built Linewise, an offline-first AI call QA tool, and received the Tutorials Dojo Top 6 Award.",
    technologies: ["React 19", "TypeScript", "Tailwind v4", "Whisper", "Ollama", "Dexie", "Express", "SQLite"],
    link: { label: "Linewise case study", href: "/projects/linewise" },
  },
  {
    id: "salesforce-intern-2025",
    role: "Virtual Intern",
    organization: "Salesforce Supported Virtual Internship (SmartBridge)",
    employmentType: "Internship",
    startDate: "Sep 2025",
    endDate: "Nov 2025",
    location: "Bulacan, Central Luzon, Philippines · Remote",
    // TODO: Paul, replace with what you built or completed (e.g. "Built a … using Apex and LWC; completed N Trailhead modules").
    description: "Eight-week virtual program on the Salesforce platform, working with Apex and Lightning Web Components.",
    technologies: ["Apex", "Visualforce", "Lightning Web Components", "Agentforce"],
  },
];
