import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rahul Mourya",
  description: "Frontend engineer who enjoys building things people actually use.",
  keywords: [
    "Rahul Mourya",
    "frontend engineer",
    "software developer",
    "React developer",
    "Next.js developer",
    "Vue.js",
    "portfolio",
  ],
  authors: [{ name: "Rahul Mourya" }],
  openGraph: {
    title: "Rahul Mourya, Frontend Engineer",
    description: "Frontend engineer who enjoys building things people actually use.",
    type: "website",
    locale: "en_US",
    siteName: "Rahul Mourya",
    images: [{ url: "/favicon.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rahucrux",
    title: "Rahul Mourya",
    description: "Frontend engineer who enjoys building things people actually use.",
    images: ["/favicon.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rahul Mourya",
  jobTitle: "Frontend Engineer",
  email: "ierahul20@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/mouryarahul/",
    "https://github.com/rahulmourya336",
    "https://twitter.com/rahucrux",
    "https://stackoverflow.com/users/8186099/rahul-mourya",
    "https://medium.com/@i.e.rahul",
    "https://www.instagram.com/archive.sketch",
  ],
  knowsAbout: [
    "Frontend Development",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Node.js",
    "GraphQL",
    "AWS",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Heals Healthcare",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevents dark/light flash on load — must run before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
          }}
        />
        {/* Structured data — helps search engines identify the person/profile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
