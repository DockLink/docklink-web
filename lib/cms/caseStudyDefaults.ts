import { DEFAULT_CASE_STUDY_GRADIENT } from "./visuals";
import type { CaseStudyDocument, CaseStudyListing, CaseStudySummary } from "./types";

export const DEFAULT_CASE_STUDY_LISTING: CaseStudyListing = {
  seoTitle: "Case Studies",
  seoDescription: "Real results from DocLink deployments across Sri Lanka.",
  eyebrow: "Case Studies",
  headline: "Real Businesses, Real Results",
  subhead:
    "Four Sri Lankan businesses that replaced paper, spreadsheets, and guesswork with software that works.",
  cta: {
    headline: "Want results like this?",
    sub: "Tell us what you're running on today. A 20-minute call is all it takes to know whether we can help.",
    buttonLabel: "Book a Consultation",
    href: "/contact",
  },
};

export const DEFAULT_CASE_STUDIES: Record<string, CaseStudyDocument> = {
  emaar: {
    id: "20000000-0000-4000-8000-000000000010",
    slug: "emaar",
    client: "Emaar",
    industry: "Real Estate",
    location: "Colombo, Sri Lanka",
    date: "March 2024",
    gradient: "from-[#1e3a8a] to-[#1D4ED8]",
    headline: "How Emaar automated payroll for 300 employees and cut processing time to minutes",
    subhead:
      "A real estate company running payroll for 300 staff on spreadsheets. One ERP deployment later, a five-day job became a 20-minute task.",
    published: true,
    sortOrder: 1,
    seoTitle: "Emaar",
    seoDescription:
      "A real estate company running payroll for 300 staff on spreadsheets. One ERP deployment later, a five-day job became a 20-minute task.",
    quoteText:
      "What used to take my team five days now takes twenty minutes. I can see the total payroll cost by department before I approve it — something I couldn't do before even if I spent a whole day on Excel.",
    quoteName: "Asanka Ratnayake",
    quoteTitle: "CFO, Emaar Holdings",
    visualKey: "emaar",
    avatarInitials: "AR",
    avatarColor: "from-[#1e3a8a] to-[#1D4ED8]",
    photoCaption: "Asanka Ratnayake — CFO, Emaar Holdings, Colombo",
    stats: [
      { id: "20000000-0000-4000-8000-000000000201", number: "300", label: "employees on automated payroll", sortOrder: 1 },
      { id: "20000000-0000-4000-8000-000000000202", number: "200 hrs", label: "saved per month, across HR and finance", sortOrder: 2 },
      { id: "20000000-0000-4000-8000-000000000203", number: "LKR 0", label: "in payroll errors since deployment", sortOrder: 3 },
      { id: "20000000-0000-4000-8000-000000000204", number: "3 wks", label: "from kickoff to go-live", sortOrder: 4 },
    ],
    sections: [
      {
        id: "20000000-0000-4000-8000-000000000301",
        heading: "Moving 300 employees off spreadsheet payroll",
        body: "Before DocLink, Emaar's HR team maintained a master Excel workbook with 300 rows — one per employee. Every month, the payroll officer spent four to five days cross-referencing attendance logs, updating salaries, calculating EPF and ETF manually, and sending individual payslips by email. Errors were caught after the fact. Corrections were made by hand. The CFO had no real-time view of payroll cost by department.",
        sortOrder: 1,
      },
      {
        id: "20000000-0000-4000-8000-000000000302",
        heading: "Building the system around Emaar's existing approval flow",
        body: "The discovery call revealed Emaar had a two-tier approval structure: department heads approved their team's timesheets by the 25th, the CFO approved the total before release. We built that exact flow into the ERP — no workaround, no approximation. Staff records, pay grades, and tax tables were migrated in week one. By week two, the first test payroll run processed all 300 employees in under 90 seconds.",
        sortOrder: 2,
      },
      {
        id: "20000000-0000-4000-8000-000000000303",
        heading: "Go-live in three weeks, zero payroll interruptions",
        body: "We ran parallel payrolls for the first two months — the old spreadsheet and the new system side by side — until both figures matched consistently. When Emaar flipped to the new system in full, there was no disruption. Payslips now generate and distribute automatically on the 28th of every month. The payroll officer's role shifted from data entry to exception handling — exactly as it should be.",
        sortOrder: 3,
      },
      {
        id: "20000000-0000-4000-8000-000000000304",
        heading: "Phase 2: expense management and leave tracking",
        body: "Six months after the payroll launch, Emaar commissioned Phase 2: an expense claims module with photo-based receipt upload, and a leave management calendar integrated with payroll. Both shipped in four weeks. Emaar is now exploring a self-service employee portal as Phase 3.",
        sortOrder: 4,
      },
    ],
  },
  street82: {
    id: "20000000-0000-4000-8000-000000000020",
    slug: "street82",
    client: "Street82",
    industry: "Retail",
    location: "Colombo & Kandy, Sri Lanka",
    date: "August 2023",
    gradient: "from-[#1D4ED8] to-[#0284c7]",
    headline: "How Street82 cut stock discrepancies to near zero across three retail branches",
    subhead:
      "A multi-branch fashion retailer counting stock by hand and reconciling on spreadsheets. After a three-week POS deployment, inventory variance dropped to under 0.2%.",
    published: true,
    sortOrder: 2,
    seoTitle: "Street82",
    seoDescription:
      "A multi-branch fashion retailer counting stock by hand and reconciling on spreadsheets. After a three-week POS deployment, inventory variance dropped to under 0.2%.",
    quoteText:
      "I used to spend every first weekend of the month fixing inventory mistakes. Now I check the app on my phone before breakfast and I already know what sold yesterday and what to reorder. It changed how I run the business.",
    quoteName: "Dilini Jayawardena",
    quoteTitle: "CEO, Street82",
    visualKey: "street82",
    avatarInitials: "DJ",
    avatarColor: "from-[#1D4ED8] to-[#0284c7]",
    photoCaption: "Dilini Jayawardena — CEO, Street82, Colombo",
    stats: [
      { id: "20000000-0000-4000-8000-000000000221", number: "94%", label: "reduction in inventory counting errors", sortOrder: 1 },
      { id: "20000000-0000-4000-8000-000000000222", number: "3 wks", label: "from first call to fully live across all branches", sortOrder: 2 },
      { id: "20000000-0000-4000-8000-000000000223", number: "3", label: "branches on real-time shared inventory", sortOrder: 3 },
      { id: "20000000-0000-4000-8000-000000000224", number: "1,248", label: "SKUs now tracked without a single spreadsheet", sortOrder: 4 },
    ],
    sections: [
      {
        id: "20000000-0000-4000-8000-000000000321",
        heading: "The problem with counting stock by hand across three locations",
        body: "Street82 runs three retail branches — Colombo 07, Kandy, and Galle. Before DocLink POS, each branch manager kept a physical stock ledger and a separate Excel sheet. End-of-month reconciliation required the owner to collect three files, merge them manually, and spend a weekend chasing discrepancies. Shrinkage was invisible until it was too late. Transfers between branches weren't tracked consistently.",
        sortOrder: 1,
      },
      {
        id: "20000000-0000-4000-8000-000000000322",
        heading: "Deploying POS across three branches in under three weeks",
        body: "All 1,248 SKUs were imported from the existing spreadsheets in day one. Hardware — receipt printers and barcode scanners — was installed at each branch by our team. Cashiers were trained in under two hours per location. By the end of week three, all three branches were running live sales through DocLink POS, with inventory syncing across locations in real time.",
        sortOrder: 2,
      },
      {
        id: "20000000-0000-4000-8000-000000000323",
        heading: "From 6% variance to 0.2% — in the first full month",
        body: "The previous month's stock count had shown a 6.1% variance — roughly LKR 220,000 in unaccounted stock. The first month on DocLink POS brought that down to 0.2%. The main driver was simple: every sale now deducts from stock automatically. No more end-of-day manual entry, no more missed transactions, no more transfers without a record.",
        sortOrder: 3,
      },
      {
        id: "20000000-0000-4000-8000-000000000324",
        heading: "What the owner can see now that she couldn't before",
        body: "The CEO now opens the DocLink dashboard every morning on her phone and sees yesterday's sales by branch, current stock levels, and which items are approaching reorder. She makes buying decisions on data. She hasn't physically counted stock since the system launched.",
        sortOrder: 4,
      },
    ],
  },
  grid: {
    id: "20000000-0000-4000-8000-000000000030",
    slug: "grid",
    client: "GRID",
    industry: "Technology",
    location: "Colombo, Sri Lanka",
    date: "November 2023",
    gradient: "from-[#1e3a8a] to-[#1D4ED8]",
    headline:
      "How GRID replaced six internal tools with one custom platform — and got their whole team to actually use it",
    subhead:
      "A technology consultancy juggling six different SaaS tools for project management, CRM, invoicing, HR, inventory, and reporting. One custom build. One login. One source of truth.",
    published: true,
    sortOrder: 3,
    seoTitle: "GRID",
    seoDescription:
      "A technology consultancy juggling six different SaaS tools for project management, CRM, invoicing, HR, inventory, and reporting. One custom build. One login. One source of truth.",
    quoteText:
      "We were paying for six tools and still losing information between them. DocLink built us something that actually connects all the dots. The LKR 490k we spent paid for itself in the first quarter.",
    quoteName: "Chathura Wickramasinghe",
    quoteTitle: "Managing Director, GRID Corp",
    visualKey: "grid",
    avatarInitials: "CW",
    avatarColor: "from-[#1e3a8a] to-[#1D4ED8]",
    photoCaption: "Chathura Wickramasinghe — Managing Director, GRID Corp, Colombo",
    stats: [
      { id: "20000000-0000-4000-8000-000000000231", number: "6", label: "separate tools replaced by one platform", sortOrder: 1 },
      { id: "20000000-0000-4000-8000-000000000232", number: "LKR 490k", label: "total build cost for all six modules", sortOrder: 2 },
      { id: "20000000-0000-4000-8000-000000000233", number: "4 mo", label: "full delivery including training and handover", sortOrder: 3 },
      { id: "20000000-0000-4000-8000-000000000234", number: "28", label: "team members active on the system daily", sortOrder: 4 },
    ],
    sections: [
      {
        id: "20000000-0000-4000-8000-000000000331",
        heading: "Building a six-module ERP/CRM system for LKR 490k",
        body: "GRID came to DocLink with a clear brief: replace Trello, HubSpot, QuickBooks, an HR spreadsheet, a stock sheet, and a Power BI dashboard with a single system that their 28-person team could use from one login. The total budget was LKR 490,000. We scoped six modules — CRM, Project Management, Invoicing, HR, Inventory, and Reporting — and delivered all six within that figure over four months.",
        sortOrder: 1,
      },
      {
        id: "20000000-0000-4000-8000-000000000332",
        heading: "Why six tools become one problem",
        body: "The issue wasn't any one tool — it was the gaps between them. A deal won in HubSpot had to be manually entered into Trello as a project. An invoice in QuickBooks had no link to the project it came from. HR data lived in a Google Sheet that only the director could edit. By the time information moved from one tool to another, it was either outdated or wrong. GRID was paying six subscription fees and still losing data.",
        sortOrder: 2,
      },
      {
        id: "20000000-0000-4000-8000-000000000333",
        heading: "Adoption was the real challenge — and the real win",
        body: "The most common failure mode for enterprise software isn't the build — it's adoption. We addressed this by involving three team leads in the design sprint before a line of code was written. They signed off on workflows, named their own modules, and trained their own teams. By go-live, 28 of 30 staff were active users within the first week. The remaining two were onboarded by their peers, not by us.",
        sortOrder: 3,
      },
      {
        id: "20000000-0000-4000-8000-000000000334",
        heading: "Six months on: 34% year-on-year revenue growth, tracked",
        body: "GRID closed its books for the first time with complete revenue data across all projects. The Reporting module showed a 34% year-on-year increase in invoiced revenue — a number the leadership team had suspected but never been able to confirm. The CRM pipeline, project timelines, and invoicing are now fully linked. When a deal closes, a project is created automatically. When a project hits a milestone, an invoice drafts itself.",
        sortOrder: 4,
      },
    ],
  },
  "a-design": {
    id: "20000000-0000-4000-8000-000000000040",
    slug: "a-design",
    client: "A-Design",
    industry: "Interior Design",
    location: "Colombo, Sri Lanka",
    date: "June 2023",
    gradient: "from-[#1D4ED8] to-[#0284c7]",
    headline:
      "How A-Design went from a single project management build to an ongoing Phase 2 retainer — and hasn't lost an invoice since",
    subhead:
      "A boutique interior design studio tracking 12 active projects, 38 clients, and LKR 4.8M in annual revenue — all without losing a single invoice or missing a deadline.",
    published: true,
    sortOrder: 4,
    seoTitle: "A-Design",
    seoDescription:
      "A boutique interior design studio tracking 12 active projects, 38 clients, and LKR 4.8M in annual revenue — all without losing a single invoice or missing a deadline.",
    quoteText:
      "We found LKR 280,000 in unpaid invoices in the first month. That alone paid for the entire Phase 1 build. But what keeps us on retainer is that the system keeps getting better — it's not a one-time project, it's a tool that grows with us.",
    quoteName: "Amara Perera",
    quoteTitle: "Principal Designer & Founder, A-Design Studio",
    visualKey: "a-design",
    avatarInitials: "AP",
    avatarColor: "from-[#1D4ED8] to-[#0284c7]",
    photoCaption: "Amara Perera — Founder, A-Design Studio, Colombo",
    stats: [
      { id: "20000000-0000-4000-8000-000000000241", number: "100%", label: "of active projects tracked digitally — zero spreadsheets", sortOrder: 1 },
      { id: "20000000-0000-4000-8000-000000000242", number: "LKR 0", label: "in invoices lost or uncollected since launch", sortOrder: 2 },
      { id: "20000000-0000-4000-8000-000000000243", number: "12", label: "concurrent projects managed from one dashboard", sortOrder: 3 },
      { id: "20000000-0000-4000-8000-000000000244", number: "Phase 2", label: "ongoing retainer for new modules", sortOrder: 4 },
    ],
    sections: [
      {
        id: "20000000-0000-4000-8000-000000000341",
        heading: "Starting with project management for a 38-client studio",
        body: "A-Design runs a boutique interior design practice with a small core team and a rotating roster of contractors. Before DocLink, every project was a folder — physical and digital — with no central view of which stage each one was at, which invoices had been sent, or which contractors were still waiting to be paid. The principal designer was spending two hours a week just answering the question: what's the current status of project X?",
        sortOrder: 1,
      },
      {
        id: "20000000-0000-4000-8000-000000000342",
        heading: "The first phase: project tracking and invoicing",
        body: "Phase 1 was scoped tightly: a project board showing every active engagement by stage, a client directory, and an invoicing module. Nothing more. We delivered in six weeks. In the first month of use, A-Design found three invoices that had been sent but never followed up — a combined LKR 280,000 that was recovered within 30 days of the system going live.",
        sortOrder: 2,
      },
      {
        id: "20000000-0000-4000-8000-000000000343",
        heading: "From a single project to an ongoing partnership",
        body: "Three months after Phase 1 launched, A-Design came back. The studio had grown — three new hires, a second location, and a contractor management problem. Phase 2 added a contractor database with linked payment records, a materials procurement tracker, and a client portal where customers could log in and see the live status of their project. Phase 2 shipped over eight weeks, on a monthly retainer that covers ongoing support and feature additions.",
        sortOrder: 3,
      },
      {
        id: "20000000-0000-4000-8000-000000000344",
        heading: "What ongoing retainer actually means",
        body: "A-Design is now on a monthly support retainer — not for bug fixes, but for active product development. Every month, the principal designer flags two or three new requirements. We prioritise them, build them, and deploy them. The software grows as the business grows. There's no big-bang upgrade, no migration, no renegotiation. Just a steady, trusted working relationship.",
        sortOrder: 4,
      },
    ],
  },
};

export function defaultCaseStudyListing(): CaseStudyListing {
  return structuredClone(DEFAULT_CASE_STUDY_LISTING);
}

export function defaultCaseStudy(slug: string): CaseStudyDocument | null {
  const study = DEFAULT_CASE_STUDIES[slug];
  return study ? structuredClone(study) : null;
}

export function defaultCaseStudySummaries(): CaseStudySummary[] {
  return Object.values(DEFAULT_CASE_STUDIES)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((study) => ({
      id: study.id,
      slug: study.slug,
      client: study.client,
      industry: study.industry,
      location: study.location,
      date: study.date,
      gradient: study.gradient,
      headline: study.headline,
      subhead: study.subhead,
      published: study.published,
      sortOrder: study.sortOrder,
      stats: structuredClone(study.stats),
    }));
}

export function blankCaseStudy(slug: string, client: string, sortOrder: number): CaseStudyDocument {
  const initials = client
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return {
    id: crypto.randomUUID(),
    slug,
    client,
    industry: "Industry",
    location: "Sri Lanka",
    date: "Date",
    gradient: DEFAULT_CASE_STUDY_GRADIENT,
    headline: client,
    subhead: "Short summary of the outcome.",
    published: false,
    sortOrder,
    seoTitle: client,
    seoDescription: `${client} case study — DocLink Technologies.`,
    quoteText: "Add a client quote.",
    quoteName: "Name",
    quoteTitle: "Title",
    visualKey: "",
    avatarInitials: initials || client.slice(0, 2).toUpperCase(),
    avatarColor: DEFAULT_CASE_STUDY_GRADIENT,
    photoCaption: client,
    stats: [],
    sections: [],
  };
}
