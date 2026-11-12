import { projects, type Project } from "@/data/projects";

export const techGroups = ["Backend", "Frontend", "Mobile", "AI / local models", "Tools"] as const;
export type TechGroup = (typeof techGroups)[number];

/** Single source of truth for every technology shown in the About stack. Order within a group is display order. */
export const tech = [
  { id: "python", label: "Python", group: "Backend" },
  { id: "django-rest-framework", label: "Django REST Framework", group: "Backend" },
  { id: "node-express", label: "Node.js / Express", group: "Backend" },
  { id: "postgresql", label: "PostgreSQL", group: "Backend" },
  { id: "mysql", label: "MySQL", group: "Backend" },
  { id: "firebase", label: "Firebase", group: "Backend" },

  { id: "typescript", label: "TypeScript", group: "Frontend" },
  { id: "react", label: "React", group: "Frontend" },
  { id: "tailwind-css", label: "Tailwind CSS", group: "Frontend" },
  { id: "vite", label: "Vite", group: "Frontend" },

  { id: "java-xml-android", label: "Java + XML (Android)", group: "Mobile" },

  { id: "whisper", label: "Whisper", group: "AI / local models" },
  { id: "ollama", label: "Ollama", group: "AI / local models" },

  { id: "git-github", label: "Git & GitHub", group: "Tools" },
  { id: "docker-compose", label: "Docker Compose", group: "Tools" },
  { id: "vercel", label: "Vercel", group: "Tools" },
  { id: "render", label: "Render", group: "Tools" },
  { id: "neon", label: "Neon", group: "Tools" },
  { id: "postman", label: "Postman", group: "Tools" },
  { id: "figma", label: "Figma", group: "Tools" },
] as const satisfies readonly { id: string; label: string; group: TechGroup }[];

export type Tech = (typeof tech)[number];
export type TechId = Tech["id"];

/** Projects whose `tech` list includes this id, in project order. Derived from the data, never hardcoded. */
export function getProjectsUsingTech(id: TechId): Project[] {
  return projects.filter((p) => p.tech.includes(id));
}

/** True when at least one project uses both technologies. */
export function sharesProject(a: TechId, b: TechId): boolean {
  return projects.some((p) => p.tech.includes(a) && p.tech.includes(b));
}
