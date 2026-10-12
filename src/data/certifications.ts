export type Certification = {
  id: string;
  /** Certification or credential name. */
  name: string;
  /** Issuing organization. */
  issuer: string;
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
    issuer: "Certiport",
    issued: "Oct 2026",
    summary:
      "Python fundamentals, files, and functions.",
  },
  {
    id: "salesforce-internship",
    name: "Salesforce Supported Virtual Internship Program 2025 — Philippines",
    issuer: "SmartBridge Educational Services",
    issued: "Nov 2025",
    summary:
      "Eight-week virtual internship (Sep – Nov 2025): platform fundamentals, data and security modeling, automation, Apex, Visualforce, Lightning Web Components, and Agentforce.",
  },
  {
    id: "dict-python-intermediate",
    name: "Programming for Intermediate Users Using Python",
    issuer: "Department of Information and Communications Technology",
    issued: "Sep 2024",
    credentialId: "78ea4d03-b721-403e-929a-7d6d44bebbdd3",
    summary: "Intermediate Python programming.",
  },
  {
    id: "dict-python-beginners",
    name: "Programming For Beginners Using Python",
    issuer: "Department of Information and Communications Technology",
    issued: "Sep 2024",
    credentialId: "c6c3c4cb-1669-4106-b934-3cd5eb514fd1",
    summary: "Foundational Python programming.",
  },
];
