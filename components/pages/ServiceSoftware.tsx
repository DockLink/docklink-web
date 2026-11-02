import ServiceCaseCards from "@/components/services/ServiceCaseCards";
import ServicePage from "@/components/services/ServicePage";
import type { ServiceDocument } from "@/lib/cms/types";

// [TBC] Case-study figures are unverified (see TODO.md)
const cases = [
  {
    id: "grid",
    client: "GRID",
    industry: "Technology",
    headline: "How GRID replaced 6 internal tools with one custom platform",
    stats: [
      { number: "6", label: "legacy tools replaced" },
      { number: "4 mo", label: "full delivery timeline" },
    ],
  },
  {
    id: "a-design",
    client: "A-Design",
    industry: "Interior design",
    headline: "How A-Design tracks every project, invoice and client in one place",
    stats: [
      { number: "100%", label: "projects tracked digitally" },
      { number: "LKR 0", label: "invoices lost since launch" },
    ],
  },
];

export default function ServiceSoftware({ data }: { data: ServiceDocument }) {
  return (
    <ServicePage data={data}>
      <ServiceCaseCards title="What we've built for clients like you" cases={cases} />
    </ServicePage>
  );
}
