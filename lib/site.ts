/**
 * Single source of truth for anything that needs an absolute URL or the
 * owner's identity: metadata, JSON-LD, sitemap, robots, OG images.
 */
const fallbackUrl = "https://rahulmourya.vercel.app";

const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = (fromEnv || fallbackUrl).replace(/\/$/, "");

export const site = {
  url: siteUrl,
  name: "Rahul Mourya",
  role: "Full Stack Engineer",
  email: "ierahul20@gmail.com",
  location: "Ahmedabad, India",
  twitterHandle: "@rahucrux",
  employer: "Miratech Group",
  mediumFeed: "https://medium.com/feed/@i.e.rahul",
  mediumProfile: "https://medium.com/@i.e.rahul",
  github: "https://github.com/rahulmourya336",
  linkedin: "https://www.linkedin.com/in/mouryarahul/",
  twitter: "https://twitter.com/rahucrux",
  stackoverflow: "https://stackoverflow.com/users/8186099/rahul-mourya",
  instagram: "https://www.instagram.com/archive.sketch",
} as const;

export const socialProfiles = [
  site.linkedin,
  site.github,
  site.twitter,
  site.stackoverflow,
  site.mediumProfile,
  site.instagram,
];

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
