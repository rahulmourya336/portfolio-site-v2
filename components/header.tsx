"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NavLinks } from "./common";
import { toggleTheme } from "./theme-provider";
import { IconSun, IconMoon, IconExternalLink, IconGlobe } from "./icons";
import { supportedLocales, defaultLocale, type Locale } from "@/lib/i18n";

const isCurrent = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const Header = () => {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [scrolled, setScrolled] = useState(false);

  // Border and blur only appear once the page has moved. Keeps the top of
  // the hero clean on first paint.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cycleLocale = () => {
    const idx = supportedLocales.indexOf(locale);
    setLocale(supportedLocales[(idx + 1) % supportedLocales.length]);
  };

  // Both icons render, CSS picks one. Nothing here depends on React state,
  // so the server and client markup always match.
  const ThemeToggle = (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
      aria-label="Toggle dark mode"
    >
      <IconSun className="hidden text-lg dark:block" aria-hidden="true" />
      <IconMoon className="block text-lg dark:hidden" aria-hidden="true" />
    </button>
  );

  const LocaleToggle = (
    <button
      onClick={cycleLocale}
      className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
      aria-label={`${locale.toUpperCase()}, switch language`}
      title={
        supportedLocales.length === 1
          ? "English only (more coming soon)"
          : "Switch language"
      }
    >
      <IconGlobe className="text-base" aria-hidden="true" />
      {locale.toUpperCase()}
    </button>
  );

  return (
    <header
      className={`no-tap-highlight sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-bg"
      }`}
    >
      <div className="wrapper-wide flex items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="font-display text-xl leading-none tracking-tight text-fg transition-colors hover:text-accent"
        >
          Rahul Mourya
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NavLinks.map((link) => {
            const active = isCurrent(pathname, link.href);
            const external = link.target === "_blank";
            return (
              <Link
                key={link.id}
                href={link.href}
                target={link.target}
                rel={external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "text-accent"
                    : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                }`}
              >
                {link.title}
                {external && (
                  <IconExternalLink className="text-xs opacity-60" aria-hidden="true" />
                )}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
          {LocaleToggle}
          {ThemeToggle}
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          {LocaleToggle}
          {ThemeToggle}
        </div>
      </div>

      {/* Mobile: one scrollable row, no hamburger to open and close. */}
      <nav
        aria-label="Main"
        className="border-t border-border md:hidden"
      >
        <div className="flex gap-1 overflow-x-auto px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NavLinks.map((link) => {
            const active = isCurrent(pathname, link.href);
            const external = link.target === "_blank";
            return (
              <Link
                key={link.id}
                href={link.href}
                target={link.target}
                rel={external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={`inline-flex flex-shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-fg-muted hover:bg-surface-2 hover:text-fg"
                }`}
              >
                {link.title}
                {external && (
                  <IconExternalLink className="text-xs opacity-60" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
