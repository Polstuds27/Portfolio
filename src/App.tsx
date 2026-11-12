import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomePage } from "@/pages/Home";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { CertificationsPage } from "@/pages/CertificationsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { scrollToContact } from "@/lib/scroll-to-contact";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    // The old /contact route redirects home with { scrollTo: "contact" }.
    if ((state as { scrollTo?: string } | null)?.scrollTo === "contact") {
      requestAnimationFrame(scrollToContact);
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, state]);
  return null;
}

function Shell() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--accent-ink)] focus:border focus:border-[var(--line)] text-sm font-semibold"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          {/* Contact lives in the footer of every page now. */}
          <Route path="/contact" element={<Navigate to="/" replace state={{ scrollTo: "contact" }} />} />
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
