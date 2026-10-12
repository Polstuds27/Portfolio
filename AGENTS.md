# AGENTS.md — C:\Users\leomo\Desktop

This is a Windows Desktop folder mis-initialized as a git repo, NOT a monorepo. It holds ~50 unrelated project folders plus shortcuts/documents (`.lnk`, `.exe`, `.pbix`, `.xlsx`). There is no root build, test, lint, or deploy.

## Scope

- Work inside one subproject at a time (e.g. `FinTrack/`, `CafeCollective/cafe-collective/`). Read that subproject's own `README.md`, manifest (`package.json`, `requirements*.txt`), and nearest `AGENTS.md` / `CLAUDE.md` — those override this file.
- Never invent root commands: no root `package.json`, `README`, CI workflow, `opencode.json`, or task runner exists. Each subfolder has its own toolchain.
- Ignore non-code Desktop clutter (shortcuts, installers, spreadsheets). Use `read`/`glob`/`grep` to locate code, not `shell` directory dumps.

## Git — broken by design

- Desktop `.git` has zero commits, no remote, no `.gitignore`; every folder shows as untracked (`??`).
- ~19 nested `.git` repos exist (`FinTrack`, `SeekICT`, `web`, `Web CICT`, `iLabCICT-Web`, `Concurrent Web`, `Concurrent Frontend`, `Flashquiz`, `firebase-admin-api`, `foodfactsapi`, `CafeCollective`, `cloud-in-action`, etc.). Parent-level `git add`/`git status` over them fails or misleads.
- Do NOT `git add -A`, commit, or add a root `.gitignore` at Desktop level. Run git commands only inside the target subproject directory.

## Shell

- `shell` runs PowerShell on `win32`. Unix-isms fail (verified: `head` does not exist). Use `;` to chain, and prefer dedicated `read`/`edit`/`write`/`glob`/`grep` over `cat`/`sed`/`find`/`ls`.


# AGENTS.md — Neo-Brutalist Developer Portfolio

## Project Mission

Build a distinctive, production-ready developer portfolio using the existing codebase. The visual direction is Neo-Brutalism combined with editorial typography, technical storytelling, and a polished engineering-journal aesthetic.

The portfolio must feel intentionally designed, responsive, accessible, fast, and professional. Avoid generic AI-generated portfolio layouts.

## 1. Inspect Before Implementing

- Inspect the existing repository, package.json, routes, components, styling system, and installed dependencies.
- Preserve the existing framework, project structure, working functionality, and deployment configuration.
- Identify the current entry point, routing setup, reusable components, and theme implementation.
- Do not replace the project with a new scaffold unless absolutely necessary.
- If Impeccable is installed, read its actual instructions and use its available design skills.
- If shadcn/ui is installed, reuse and customize its existing components.
- If a dependency is missing, install it only when necessary.

## 2. Design System

### Visual direction

Neo-Brutalism with an editorial developer-portfolio aesthetic.

- Background: warm off-white, approximately #F5F0E6.
- Foreground: ink black, approximately #171717.
- Primary accent: acid lime, approximately #D7FF64.
- Optional secondary accent: cobalt blue.
- Use bold, expressive typography with clear hierarchy.
- Use strong outlines, hard offset shadows, visible separators, and deliberate asymmetry.
- Prefer square or minimally rounded corners.
- Use whitespace strategically; brutalism must remain readable.
- Avoid excessive gradients, glassmorphism, excessive pill shapes, and generic floating-card layouts.

### Design tokens

Define reusable CSS variables for:

- Background and foreground.
- Primary and secondary colors.
- Borders and muted surfaces.
- Accent and interactive states.
- Card shadows and offset shadows.
- Typography sizes and line heights.
- Spacing and layout widths.
- Light and dark theme values.

Use Tailwind CSS and the existing project's conventions. Avoid scattering arbitrary colors throughout components.

### Dark mode

- Provide a working light/dark theme toggle.
- Persist the user's preference using an appropriate existing mechanism.
- Respect the system preference when no preference has been saved.
- Prevent a flash of the wrong theme when practical.
- Maintain contrast and the Neo-Brutalist identity in both themes.

## 3. Technology and Components

- Preserve the existing React and TypeScript setup if already present.
- Use shadcn/ui for accessible, reusable UI primitives.
- Use Tailwind CSS and design tokens for styling.
- Use lucide-react for icons if compatible with the project.
- Prefer semantic HTML and reusable, well-typed components.
- Use the existing routing solution.
- Avoid introducing unnecessary dependencies or duplicate UI libraries.
- Use real project content and assets; never invent achievements, metrics, or client testimonials.

Customize shadcn/ui to match the portfolio's design system. Do not leave the interface looking like an unmodified shadcn starter template.

## 4. Portfolio Sections

### Home

- Distinctive hero headline and concise introduction.
- Professional role and technical focus.
- Clear calls to action for projects and contact.
- Featured project or engineering highlight.
- Social links and résumé access.

### Projects

- Showcase real projects with meaningful visual hierarchy.
- Include project name, problem, solution, role, tech stack, and relevant links.
- Use screenshots or project-specific visuals where available.
- Explain important engineering decisions and architecture.
- Make project cards and filters functional when implemented.

### About

- Developer background and working philosophy.
- Technical strengths and areas of interest.
- Relevant experience, education, and verified certifications.
- A readable timeline or editorial layout when appropriate.

### Contact

- Email, GitHub, LinkedIn, and résumé links when available.
- Functional contact form only if a working submission mechanism exists.
- Provide clear loading, success, and error states.

### Supporting pages

Implement or improve a project detail page, custom 404 page, and any additional routes justified by the existing application.

## 5. Interaction and Accessibility

- All buttons, navigation links, filters, dialogs, and theme controls must work.
- Use visible focus states and keyboard-accessible interactions.
- Follow semantic HTML and accessible labeling.
- Respect reduced-motion preferences.
- Avoid animation that interferes with reading.
- Add responsive layouts for mobile, tablet, and desktop.
- Prevent horizontal overflow and layout shifts.
- Never use placeholder links that silently lead nowhere.

## 6. Implementation Workflow

Work in short, implementation-first phases.

1. Inspect the codebase and identify the minimum changes needed.
2. Establish or refine design tokens and global styles.
3. Improve the shared layout, navigation, and theme system.
4. Implement the hero and project showcase.
5. Complete the remaining sections and routes.
6. Add responsive behavior, accessibility, and functional interactions.
7. Perform lightweight verification and fix discovered issues.

Do not spend excessive time writing plans or running long test suites. Prioritize visible implementation and feature completion.

After each meaningful phase, summarize files changed, features completed, and any remaining blockers.

## 7. Quality Standards

- Avoid giant monolithic components.
- Extract shared components when doing so improves clarity.
- Keep TypeScript types accurate.
- Handle missing images, optional content, and invalid external links gracefully.
- Do not expose secrets or commit environment credentials.
- Do not modify deployment settings without a clear reason.
- Do not claim tests, builds, or interactions succeeded unless verified.
- Run the available build or type-check command after the main implementation, and fix blocking errors.
- Do not rewrite working code just to satisfy stylistic preferences.

## Definition of Done

The portfolio is complete when it has a coherent Neo-Brutalist identity, polished responsive layouts, working light/dark mode, real project content, functional navigation, accessible shadcn/ui components, and a successful lightweight build check.
