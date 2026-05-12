"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavLinks } from "./common";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { IconSun, IconMoon, IconExternalLink, IconGlobe } from "./icons";
import { supportedLocales, defaultLocale, type Locale } from "@/lib/i18n";

const Header = () => {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const cycleLocale = () => {
    const idx = supportedLocales.indexOf(locale);
    const next = supportedLocales[(idx + 1) % supportedLocales.length];
    setLocale(next);
  };

  const LocaleToggle = (
    <button
      onClick={cycleLocale}
      className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Switch language"
      title={supportedLocales.length === 1 ? "English only (more coming soon)" : "Switch language"}
    >
      <IconGlobe className="text-base" />
      {locale.toUpperCase()}
    </button>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 no-tap-highlight">
      {/* Top bar */}
      <div className="wrapper flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-semibold text-gray-900 dark:text-white tracking-tight hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          Rahul Mourya
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NavLinks.map((link) => {
            const isActive = pathname === link.href;
            const isExternal = link.target === "_blank";
            return (
              <Link
                key={link.id}
                href={link.href}
                target={link.target}
                className={`inline-flex items-center gap-1 text-sm transition-colors ${
                  isActive
                    ? "text-purple-600 dark:text-purple-400 font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.title}
                {isExternal && <IconExternalLink className="text-xs opacity-60" />}
              </Link>
            );
          })}
          {LocaleToggle}
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <IconSun className="text-lg" />
            ) : (
              <IconMoon className="text-lg" />
            )}
          </button>
        </nav>

        {/* Mobile: locale + theme toggles */}
        <div className="md:hidden flex items-center gap-1">
          {LocaleToggle}
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <IconSun className="text-lg" />
            ) : (
              <IconMoon className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav — always visible below top bar */}
      <nav className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div className="flex px-2 py-1.5 gap-1">
          {NavLinks.map((link) => {
            const isActive = pathname === link.href;
            const isExternal = link.target === "_blank";
            return (
              <Link
                key={link.id}
                href={link.href}
                target={link.target}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg text-sm transition-colors text-center ${
                  isActive
                    ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {link.title}
                {isExternal && <IconExternalLink className="text-xs opacity-60" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Header;
