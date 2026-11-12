import { useLocation } from "react-router-dom";
import { LINKEDIN, PHOTO_URL } from "@/components/Hero";
import { DynamicIsland } from "@/components/ui/dynamic-island";
import { GlassNavbar, type NavItem } from "@/components/ui/glass-navbar";
import { scrollToContact } from "@/lib/scroll-to-contact";

const links: NavItem[] = [
  { id: "/", href: "#/", label: "Home" },
  { id: "/projects", href: "#/projects", label: "Projects" },
  { id: "/about", href: "#/about", label: "About" },
  { id: "/experience", href: "#/experience", label: "Experience" },
  { id: "/certifications", href: "#/certifications", label: "Certifications" },
  {
    id: "contact",
    href: "#/contact",
    label: "Contact",
    onClick: (e) => {
      e.preventDefault();
      scrollToContact();
    },
  },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const activeId = links.find((link) => link.id !== "/" && pathname.startsWith(`${link.id}/`))?.id ?? pathname;

  return (
    <GlassNavbar
      items={links}
      activeId={activeId}
      cta={null}
      brand={
        <>
        <a href="#/" className="text-sm font-semibold text-[var(--ink)] md:hidden">Paul Mojal</a>
        <div className="relative hidden h-11 w-[76px] shrink-0 md:block">
          <div className="absolute left-0 top-0">
            <DynamicIsland
              avatar={PHOTO_URL}
              avatarAlt="Paul Adrianne Mojal"
              name="Paul Adrianne Mojal"
              role="Full-stack developer"
              greeting="Paul Mojal"
              description="IT student focused on backend development, offline-first apps, and local AI."
              metadata={[{ label: "Based in", value: "Bulacan" }, { label: "School", value: "BulSU — BSIT" }]}
              socials={{ github: "https://github.com/Polstuds27", linkedin: LINKEDIN, email: "paul.mojal@gmail.com" }}
            />
          </div>
        </div>
        </>
      }
    />
  );
}
