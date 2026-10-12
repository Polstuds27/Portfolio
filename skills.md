---
name: apple-design
description: Apply a refined Apple and macOS-inspired visual design system to existing web applications, replacing Neo-Brutalist styling with calm monochrome surfaces, precise typography, subtle depth, generous spacing, and polished interactions.
---

# Apple-Inspired Design Skill

## Purpose

Design and refine interfaces inspired by the visual principles of Apple's macOS and product websites.

The goal is a calm, polished, minimal, premium interface with excellent typography, spacing, hierarchy, and interaction details.

This skill is intended to transform existing interfaces, including applications originally built with Neo-Brutalism.

**When this skill conflicts with an existing Neo-Brutalist visual style, this skill takes precedence for visual design decisions.** Preserve existing functionality, application architecture, content, and routes.

Use Apple products as visual inspiration. Do not copy proprietary assets, logos, or exact Apple website layouts.

## 1. Core Design Principles

### Calm over aggressive

- Establish a clear visual hierarchy.
- Give content room to breathe.
- Use restrained contrast between surfaces.
- Let typography and content create visual interest.
- Avoid making every element compete for attention.

### Precision over decoration

- Align elements consistently.
- Use predictable spacing and sizing.
- Prefer subtle separators over heavy outlines.
- Use shadows only when they communicate depth.
- Remove unnecessary decorative elements.

### Content over components

- Project information and professional experience must remain the focus.
- Avoid turning every section into a separate boxed card.
- Use open layouts and editorial composition where appropriate.
- Use cards when they improve grouping or comprehension, not by default.

## 2. Explicitly Remove Neo-Brutalist Styling

When refining an existing Neo-Brutalist application, actively identify and replace the following:

- Thick black borders around every component.
- Hard, offset box shadows such as `box-shadow: 6px 6px 0`.
- Oversized, chunky buttons with exaggerated outlines.
- Excessive uppercase labels and decorative typography.
- Bright accent blocks competing with the content.
- Repeated boxed sections with identical heavy borders.
- Harsh hover animations involving large translations or shadow jumps.
- Unnecessary outlines around badges, tags, and navigation items.

Replace these with:

- Thin, low-contrast borders.
- Soft, diffused shadows where appropriate.
- Refined button shapes and restrained hover feedback.
- Consistent typography with deliberate hierarchy.
- Neutral surfaces and a limited accent palette.
- Generous whitespace and editorial section layouts.
- Subtle transitions without excessive movement.

**Important:** Changing only the colors is not enough. Update the actual border, shadow, radius, spacing, and interaction styles that create the Neo-Brutalist appearance.

## 3. Monochrome macOS-Inspired Palette

Use this palette for the dark theme:

| Token | Color | Usage |
|---|---|---|
| Background | `#1C1C1E` | Main page background |
| Surface | `#272729` | Cards and elevated sections |
| Secondary surface | `#303033` | Nested panels and controls |
| Border | `#414145` | Subtle dividers and outlines |
| Primary text | `#F5F5F7` | Headings and main content |
| Secondary text | `#B8B8BE` | Descriptions and supporting text |
| Muted text | `#929299` | Secondary metadata |
| Accent | `#D1D1D6` | Interactive emphasis |
| Hover surface | `#38383D` | Interactive surface hover |

Guidelines:

- Keep the interface predominantly monochrome.
- Avoid pure black backgrounds and excessively bright white surfaces.
- Do not introduce colorful gradients without a clear design reason.
- Maintain accessible foreground/background contrast.
- Use semantic status colors only when necessary.

If light mode exists, preserve it and implement a coordinated light-gray palette using warm or neutral whites, light gray surfaces, and dark readable text.

## 4. Typography

Use a system-oriented typography stack compatible with the existing project.

Preferred CSS font stack:

`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif`

Do not assume proprietary Apple fonts are installed on every device. Provide suitable fallbacks.

Typography rules:

- Use strong but controlled heading sizes.
- Use comfortable body text line heights.
- Keep paragraphs at readable line lengths.
- Use font weight to establish hierarchy rather than excessive uppercase text.
- Reserve monospace fonts for code, technical metadata, and small developer-oriented details.
- Avoid oversized headings on every section.

## 5. Layout and Spacing

- Use a consistent spacing scale.
- Prefer generous vertical spacing between major sections.
- Use a centered content container with a sensible maximum width.
- Keep text and project descriptions readable on wide screens.
- Align section headings, content, and navigation consistently.
- Use responsive layouts that adapt naturally to mobile devices.
- Avoid unnecessary nested containers and repetitive cards.

Use rounded corners in moderation, generally around 8–16px depending on component size. Do not round every small element into a pill.

## 6. Borders, Shadows, and Surfaces

### Borders

- Prefer thin 1px borders.
- Use low-contrast gray borders for separation.
- Avoid pure black outlines on dark surfaces.
- Do not apply borders to every child element.

### Shadows

- Prefer soft, diffused shadows.
- Use elevation sparingly for floating navigation, dialogs, dropdowns, and genuinely elevated surfaces.
- Remove all hard-offset Neo-Brutalist shadows.
- Do not simulate elevation with multiple heavy outlines.

### Glass effects

- Use translucent backgrounds and backdrop blur only for appropriate floating elements.
- Keep text readable regardless of what appears behind a translucent surface.
- Provide opaque fallbacks.
- Do not apply glass effects to every card or section.

## 7. Component Styling

### Navigation

- Minimal, clean, and unobtrusive.
- Use subtle separators or a restrained translucent surface.
- Keep active states understated.
- Avoid thick underlines, boxed navigation links, and excessive uppercase labels.

### Buttons

- Use refined shapes with moderate corner radii.
- Primary buttons should be clearly identifiable without oversized shadows.
- Secondary buttons may use subtle borders or neutral surfaces.
- Use smooth background and opacity transitions.
- Preserve keyboard focus indicators.

### Cards

- Use neutral surfaces and thin borders only when needed.
- Avoid identical boxed layouts for every content group.
- Provide subtle hover feedback for clickable cards.
- Keep descriptions and metadata visually subordinate to titles.

### Inputs and Forms

- Use consistent control heights, comfortable padding, and subtle borders.
- Make focus states obvious but restrained.
- Preserve validation messages and existing form behavior.

### Navigation Dock

A floating dock inspired by macOS may be used only if it complements the existing portfolio layout.

It must remain responsive and accessible. Do not turn the entire portfolio into a simulated desktop operating system.

## 8. Developer Portfolio Guidance

For developer portfolios:

- Give the hero a clear headline and concise professional introduction.
- Showcase projects with meaningful descriptions, real screenshots, technology stacks, and working links where available.
- Use an editorial layout for Experience and Certifications when appropriate.
- Keep technical details discoverable without overwhelming the page.
- Preserve real project content and avoid fabricated achievements.
- Avoid unnecessary animations that distract from the portfolio's purpose.

## 9. Motion and Interaction

- Use restrained transitions, typically around 150–250ms.
- Prefer subtle opacity, background, and border-color changes.
- Avoid large scaling, bouncing, exaggerated parallax, and dramatic shadow jumps.
- Respect `prefers-reduced-motion`.
- Keep interactions responsive and predictable.

## 10. Technical Implementation Rules

When applying this skill to an existing codebase:

1. Inspect the current framework, design tokens, theme configuration, and shared components.
2. Identify Neo-Brutalist styles in CSS, Tailwind classes, component variants, and custom shadows.
3. Update the existing design system instead of layering contradictory overrides.
4. Reuse the current component library, including shadcn/ui when already installed.
5. Centralize theme values in shared CSS variables or the existing token system.
6. Preserve routes, application state, forms, data structures, and existing functionality.
7. Preserve light and dark themes when already supported.
8. Do not add dependencies unless they solve a concrete need.
9. Check responsive layouts, contrast, keyboard navigation, and focus states.
10. Run lightweight sanity checks and fix obvious regressions without unnecessary lengthy test cycles.

## 11. Definition of Done

The final interface should feel:

- Minimal and refined.
- Calm and comfortable to browse.
- Consistent with macOS-inspired visual principles.
- Predominantly monochrome gray.
- Spacious and typography-driven.
- Free of the defining heavy borders and hard-offset shadows of Neo-Brutalism.

The design should look intentionally minimal, not unfinished or generic.

**Final rule:** Do not preserve Neo-Brutalist styling merely because it already exists in the codebase. Preserve the application and its functionality; deliberately replace the visual language.