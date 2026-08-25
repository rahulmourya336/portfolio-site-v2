import type { Metadata } from "next";
import ContactDetails from "@/components/contact";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rahul Mourya about full stack work, a freelance build, or a question about something on this site. Email or any of the usual profiles.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Rahul Mourya",
    description:
      "Email me about full stack work, a freelance build, or anything on this site.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absoluteUrl("/contact"),
  name: "Contact Rahul Mourya",
  mainEntity: { "@id": `${siteUrl}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: absoluteUrl("/contact"),
      },
    ],
  },
  email: `mailto:${site.email}`,
};

const Contact = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <ContactDetails />
  </>
);

export default Contact;
