import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { CertificationList } from "@/components/ExperienceRecognition";

/** Same compact list as the home page, showing every certification. */
export function CertificationsPage() {
  return (
    <HomeSection id="certifications" as="h1" title="Certifications">
      <Reveal className="border-t border-[var(--line-soft)]">
        <CertificationList />
      </Reveal>
    </HomeSection>
  );
}
