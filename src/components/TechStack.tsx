import type { ComponentType } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiPython,
  SiDjango,
  SiNodedotjs,
  SiPhp,
  SiOpenjdk,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiFigma,
  SiVscodium,
  SiPostman,
  SiJetbrains,
  SiCloudinary,
  SiVercel,
  SiRender,
  SiDocker,
  SiGooglegemini,
  SiHtml5,
  SiCss,
} from "react-icons/si";
import { FileCode2, Server, Database, Zap } from "lucide-react";

export type TechIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

export type TechItem = {
  name: string;
  Icon: TechIcon;
};

export type TechGroup = {
  label: string;
  items: TechItem[];
};

/**
 * Full technical stack, grouped as on the résumé.
 * Single source of truth for the profile-card stack grid.
 */
export const techGroups: TechGroup[] = [
  {
    label: "Web",
    items: [
      { name: "JavaScript", Icon: SiJavascript },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "React", Icon: SiReact },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "Vite", Icon: SiVite },
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Python", Icon: SiPython },
      { name: "Django DRF", Icon: SiDjango },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "PHP", Icon: SiPhp },
      { name: "Java", Icon: SiOpenjdk },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Java", Icon: SiOpenjdk },
      { name: "XML", Icon: FileCode2 },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "Firebase", Icon: SiFirebase },
      { name: "Neon", Icon: Database },
    ],
  },
  {
    label: "Tools & AI",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
      { name: "VS Code", Icon: SiVscodium },
      { name: "Postman", Icon: SiPostman },
      { name: "XAMPP", Icon: Server },
      { name: "JetBrains", Icon: SiJetbrains },
      { name: "AI Studio", Icon: SiGooglegemini },
      { name: "Groq", Icon: Zap },
      { name: "Cloudinary", Icon: SiCloudinary },
    ],
  },
  {
    label: "Ship",
    items: [
      { name: "Vercel", Icon: SiVercel },
      { name: "Render", Icon: SiRender },
      { name: "Docker", Icon: SiDocker },
    ],
  },
];

export function TechStackGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "grid gap-2.5" : "grid gap-3"}>
      {techGroups.map((g) => (
        <div key={g.label}>
          <p className="text-[12.5px] font-medium text-[var(--muted)]">
            {g.label}
          </p>
          <ul className="mt-1 flex flex-wrap gap-1.5" aria-label={`${g.label} stack`}>
            {g.items.map((t) => (
              <li
                key={`${g.label}-${t.name}`}
                title={t.name}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--elevated)] px-2 py-1 text-[12px] font-medium text-[var(--ink-2)]"
              >
                <t.Icon className="size-3.5 shrink-0" aria-hidden />
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
