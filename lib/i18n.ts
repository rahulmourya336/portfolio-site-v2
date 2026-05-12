import type { Dictionary } from "./dictionaries/en";

export const supportedLocales = ["en"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loader();
}

export function isValidLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}
