import { getPublishedServiceSummaries } from "@/lib/cms/services";

export async function GET() {
  const services = await getPublishedServiceSummaries();
  return Response.json(services);
}
