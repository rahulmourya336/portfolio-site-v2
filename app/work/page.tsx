import type { Metadata } from "next";
import WorkDetails from "@/components/work";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work and experience",
  description:
    "Seven years of full stack work: Amazon Connect config tooling at Miratech for UnitedHealth Group, a Vue claims portal for 52,000 users at Heals Healthcare, and Node and Angular products at Rishabh Software.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work and experience, Rahul Mourya",
    description:
      "Amazon Connect config tooling, a claims portal used by 52,000 people, and the internal products before that.",
    url: absoluteUrl("/work"),
    type: "profile",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
  ],
};

const Work = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
    <WorkDetails />
  </>
);

export default Work;
