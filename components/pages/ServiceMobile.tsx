import ServicePage from "@/components/services/ServicePage";
import type { ServiceDocument } from "@/lib/cms/types";

export default function ServiceMobile({ data }: { data: ServiceDocument }) {
  return <ServicePage data={data} />;
}
