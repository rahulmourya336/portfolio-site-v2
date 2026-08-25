import Link from "next/link";
import { socialHandleList } from "./common";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

const ContactDetails = () => {
  return (
    <div className="wrapper px-4 py-16">
      <Reveal className="flex flex-col gap-6">
        <h1 className="font-display text-4xl text-fg sm:text-5xl">
          Let&apos;s talk.
        </h1>

        <p className="leading-7 text-fg-muted">
          Drop me an email. Could be about a project, an opportunity, or just to
          say hi. Memes are welcome too.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="w-fit text-lg font-medium text-accent hover:underline"
        >
          {site.email}
        </a>

        <div className="mt-2">
          <h2 className="mb-4 text-sm text-fg-subtle">
            Or find me elsewhere on the internet
          </h2>
          <ul className="flex flex-wrap gap-3">
            {socialHandleList.map((handle) => (
              <li key={handle.name}>
                <Link
                  href={handle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm text-fg-muted hover:text-fg"
                >
                  <handle.icon className="text-lg" aria-hidden="true" />
                  {handle.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
};

export default ContactDetails;
