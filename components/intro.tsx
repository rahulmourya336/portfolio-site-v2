import Image from "next/image";
import Link from "next/link";
import {
  IconGithubTransparent,
  IconGrid,
  IconInstagarmOutline,
  IconRightArrow,
} from "./icons";

const stack = ["React", "Next.js", "Vue", "TypeScript", "Python", "AWS"];

/*
  The hero animates with a plain CSS keyframe rather than JavaScript. It is
  the largest paint on the page, so it must not wait for a bundle, and it
  still animates if scripts fail.
*/
const step = (index: number) => ({ animationDelay: `${index * 80}ms` });

const Intro = () => {
  return (
    <section className="hero-glow px-4 pb-16 pt-12 sm:pt-20">
      <div className="wrapper-wide">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
          <div className="flex-shrink-0">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-full bg-accent/10 blur-2xl"
                aria-hidden="true"
              />
              <Image
                src="/rahul-mourya.webp"
                alt="Rahul Mourya, full stack engineer, smiling in a navy blazer"
                width={160}
                height={160}
                priority
                sizes="160px"
                className="relative h-32 w-32 rounded-full border border-border object-cover shadow-lg sm:h-40 sm:w-40"
              />
            </div>
          </div>

          <div className="flex max-w-2xl flex-col gap-5 text-center md:text-left">
            <p
              className="animate-fade-in text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle"
              style={step(1)}
            >
              Full stack engineer, 7+ years
            </p>

            <h1
              className="animate-fade-in text-balance font-display text-4xl leading-[1.1] text-fg sm:text-5xl"
              style={step(2)}
            >
              Hi, I&apos;m Rahul. I build web apps people actually use.
            </h1>

            <p
              className="animate-fade-in leading-7 text-fg-muted"
              style={step(3)}
            >
              Polished React and Vue front ends, the Python and Node.js APIs
              behind them, and the AWS infrastructure they run on. Right now
              that means React and MUI on the front, Python on AWS Lambda behind
              it, and Terraform holding the infrastructure together.
            </p>

            <p
              className="animate-fade-in leading-7 text-fg-muted"
              style={step(4)}
            >
              I care about what makes a web experience feel fast and obvious.
              Off the clock you will find me deep in a video game or drawing
              vector illustrations, which I post as{" "}
              <a
                href="https://www.instagram.com/archive.sketch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                @archive.sketch
              </a>
              .
            </p>

            <ul
              className="animate-fade-in flex flex-wrap justify-center gap-2 md:justify-start"
              style={step(5)}
            >
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="animate-fade-in flex flex-wrap justify-center gap-3 pt-2 md:justify-start"
              style={step(6)}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                <IconGrid className="text-sm" aria-hidden="true" />
                See the projects
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              >
                Read the blog
                <IconRightArrow className="text-xs" aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/rahulmourya336"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              >
                <IconGithubTransparent className="text-base" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://www.instagram.com/archive.sketch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
              >
                <IconInstagarmOutline className="text-base" aria-hidden="true" />
                Sketches
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
