/** The contact block (id="contact") is the footer on every page; nav and hero links scroll to it. */
export function scrollToContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
