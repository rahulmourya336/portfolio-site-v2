import Link from "next/link";
import { socialHandleList } from "./common";
import { site } from "@/lib/site";

const footerLinks = [
  { title: "Work", href: "/work" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="wrapper-wide flex flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-fg-muted transition-colors hover:text-accent"
          >
            {site.email}
          </a>
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} {site.name}. Built with Next.js and
            Tailwind.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-accent"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <ul className="flex items-center gap-4">
          {socialHandleList.map((handle) => (
            <li key={handle.name}>
              <a
                href={handle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-fg-subtle transition-colors hover:text-accent"
              >
                <handle.icon className="text-xl" aria-hidden="true" />
                <span className="sr-only">{handle.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
