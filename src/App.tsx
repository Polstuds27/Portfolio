import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomePage } from "@/pages/Home";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { CertificationsPage } from "@/pages/CertificationsPage";
import { EngineeringPage } from "@/pages/EngineeringPage";
import { ContactPage } from "@/pages/ContactPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { useTheme } from "@/hooks/useTheme";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Shell() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--accent-ink)] focus:border focus:border-[var(--line)] text-sm font-semibold"
      >
        Skip to content
      </a>
      <SiteHeader theme={theme} onToggleTheme={toggle} />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/engineering" element={<EngineeringPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  );
}
