import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rahul Mourya Home",
  description: "Rahul Mourya's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="Portfolio Website" />
        <meta
          name="keywords"
          content="Rahul Mourya, developer portfolio, portfolio site, Personal Website"
        />
        <meta name="author" content="Rahul Mourya" />
        <meta name="dns-prefetch" content="//fonts.googleapis.com" />

        <meta property="og:site_name" content="Rahul Mourya's website" />
        <meta property="og:title" content="Portfolio site" />
        <meta name="twitter:title" content="Portfolio site" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rahucrux" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:description"
          content="Rahul Mourya | Home | Work | About"
        />
        <meta
          property="og:description"
          content="Rahul Mourya | Home | Work | About"
        />
        <meta name="description" content="Portfolio" />

        <meta property="og:image" content="favicon.png" />
        <meta name="twitter:image" content="favicon.png" />

        <link rel="shortcut icon" type="image/png" href="favicon.png" />
        <link rel="shortcut icon" type="image/png" href="favicon.png" />

        <link rel="apple-touch-icon" href="favicon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
