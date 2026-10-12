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
};

/**
 * Work experience entries, newest first.
 */
export const experiences: Experience[] = [
  {
    id: "appbuildersph-2026",
    role: "Hackathon Finalist — Top 6",
    organization: "AppBuildersPH",
    employmentType: "Hackathon",
    startDate: "Oct 2026",
    endDate: "Oct 2026",
    description:
      "Ranked 6th out of 400+ teams with project output Linewise; received the Top 6 Tutorials Dojo Award.",
    technologies: ["React 19", "TypeScript", "Tailwind v4", "Whisper", "Ollama", "Dexie", "Express", "SQLite"],
  },
  {
    id: "salesforce-intern-2025",
    role: "Salesforce Intern",
    organization: "Salesforce",
    employmentType: "Internship",
    startDate: "Sep 2025",
    endDate: "Nov 2025",
    location: "Bulacan, Central Luzon, Philippines · Remote",
    description:
      "Eight-week Salesforce-supported virtual internship program (via SmartBridge Educational Services): platform fundamentals, data and security modeling, automation, Apex, Visualforce, Lightning Web Components, and Agentforce.",
    technologies: ["Apex", "Visualforce", "Lightning Web Components", "Agentforce"],
  },
];
