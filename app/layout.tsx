import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { site, siteUrl, socialProfiles } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rahul Mourya, Full Stack Engineer",
    template: "%s | Rahul Mourya",
  },
  description:
    "Full stack engineer with 7+ years building React and Vue front ends, Python and Node APIs, and the AWS infrastructure under them.",
  applicationName: "Rahul Mourya",
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Rahul Mourya",
    "full stack engineer",
    "React developer",
    "Next.js developer",
    "Vue.js developer",
    "Python AWS Lambda",
    "frontend engineer India",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

// Person schema describes the site owner once, at the root, for every page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/rahul-mourya.webp`,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressCountry: "IN",
  },
  sameAs: socialProfiles,
  knowsAbout: [
    "Frontend Development",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Node.js",
    "Python",
    "GraphQL",
    "AWS",
    "Terraform",
  ],
  worksFor: {
    "@type": "Organization",
    name: site.employer,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#person` },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable}`}
    >
      <head>
        {/* Prevents dark/light flash on load. Must run before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body className="font-sans">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
