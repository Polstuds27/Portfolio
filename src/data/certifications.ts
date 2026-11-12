export type Certification = {
  id: string;
  /** Certification or credential name. */
  name: string;
  /** Optional shorter name for compact layouts. */
  shortName?: string;
  /** Set false to keep it off the home page (still listed on /certifications). */
  showOnHome?: boolean;
  /** Issuing organization. */
  issuer: string;
  /** Optional short issuer name for compact layouts, e.g. "DICT". */
  issuerShort?: string;
  /** Date issued, e.g. "Mar 2025". */
  issued: string;
  /** Expiration date, when applicable. */
  expires?: string;
  /** Credential ID, when available. */
  credentialId?: string;
  /** Verification URL — renders a "Verify credential" link when present. */
  verifyUrl?: string;
  /** Optional certificate image, logo, or PDF link. */
  assetUrl?: string;
  /** Short, factual summary of what the credential covered. */
  summary?: string;
};

/**
 * Certification entries, newest first.
 */
export const certifications: Certification[] = [
  {
    id: "its-python",
    name: "Information Technology Specialist — Python",
    shortName: "IT Specialist — Python",
    issuer: "Certiport",
    // TODO: Paul, add the Certiport / Credly credential URL as verifyUrl to show "Verify ↗".
    issued: "Oct 2026",
    summary:
      "Python fundamentals, files, and functions.",
  },
  {
    id: "salesforce-internship",
    name: "Salesforce Supported Virtual Internship Program 2025 — Philippines",
    showOnHome: false, // already listed under Experience
    issuer: "SmartBridge Educational Services",
    issued: "Nov 2025",
    summary:
      "Eight-week virtual internship (Sep – Nov 2025): platform fundamentals, data and security modeling, automation, Apex, Visualforce, Lightning Web Components, and Agentforce.",
  },
  {
    id: "dict-python-intermediate",
    name: "Programming for Intermediate Users Using Python",
    shortName: "Programming for Intermediate Users (Python)",
    issuer: "Department of Information and Communications Technology",
    issuerShort: "DICT",
    issued: "Sep 2024",
    credentialId: "78ea4d03-b721-403e-929a-7d6d44bebbdd3",
    summary: "Intermediate Python programming.",
  },
  {
    id: "dict-python-beginners",
    name: "Programming For Beginners Using Python",
    showOnHome: false,
    issuer: "Department of Information and Communications Technology",
    issuerShort: "DICT",
    issued: "Sep 2024",
    credentialId: "c6c3c4cb-1669-4106-b934-3cd5eb514fd1",
    summary: "Foundational Python programming.",
  },
];
