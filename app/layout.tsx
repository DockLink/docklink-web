import type { Metadata, Viewport } from "next";
import { company, SITE_URL } from "@/data/company";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Variable font: every weight from one file, no faux bold
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DocLink Technologies — ERP, POS & Custom Software in Sri Lanka",
    template: "%s | DocLink Technologies",
  },
  description: company.description,
  applicationName: company.name,
  keywords: [
    "ERP Sri Lanka",
    "POS system Sri Lanka",
    "custom software development",
    "payroll software EPF ETF",
    "web development Colombo",
    "mobile app development Sri Lanka",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_LK",
    title: "DocLink Technologies — ERP, POS & Custom Software",
    description: company.description,
    images: [{ url: "/doclink-logo.png", width: 1754, height: 1063, alt: "DocLink Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DocLink Technologies — ERP, POS & Custom Software",
    description: company.description,
    images: ["/doclink-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/doclink-logo.png`,
  email: company.email,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressCountry: "LK",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-ink-2">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
