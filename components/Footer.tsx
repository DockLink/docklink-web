import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { Container } from "@/components/ui/Section";
import { company } from "@/data/company";
import { companyLinks, productLinks, serviceLinks } from "@/data/navigation";

const linkClass = "text-sm text-muted transition-colors duration-(--dur-fast) hover:text-ink";

function Column({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const social = company.social.filter((s) => s.href);
  const legal = company.legal.filter((l) => l.href);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="DocLink Technologies home" className="-ml-1 inline-flex rounded-control p-1">
            <Logo height={32} />
          </Link>
          <p className="mt-4 max-w-[32ch] text-sm text-muted">
            ERP, POS and custom software for Sri Lankan businesses moving off paper, Excel and WhatsApp.
          </p>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-4">
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} className={linkClass} rel="me noreferrer" target="_blank">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Column title="Products" links={productLinks} />
        <Column title="Services" links={serviceLinks} />
        <Column title="Company" links={companyLinks} />

        <div>
          <h2 className="text-sm font-medium text-ink">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${company.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className={`${linkClass} inline-flex items-center gap-2`}>
                <Phone aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
                {company.phone}
              </a>
            </li>
            <li>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`${linkClass} inline-flex items-start gap-2`}
              >
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.country}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}
          </p>
          {legal.length > 0 && (
            <ul className="flex gap-5">
              {legal.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className={linkClass}>
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </footer>
  );
}
