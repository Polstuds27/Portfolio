import { MoreBuilds, SelectedWork } from "@/components/SelectedWork";

/** Same showcase as the home page, followed by every other build. */
export function ProjectsPage() {
  return (
    <>
      <SelectedWork page />
      <MoreBuilds />
    </>
  );
}
