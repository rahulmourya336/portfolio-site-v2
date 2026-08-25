import { skillCategories, workHistory } from "./common";
import { Reveal } from "./reveal";

const WorkDetails = () => {
  return (
    <div className="wrapper-wide px-4 py-12">
      <header className="mb-10 flex max-w-2xl flex-col gap-4">
        <h1 className="font-display text-4xl text-fg sm:text-5xl">Work</h1>
        <p className="leading-7 text-fg-muted">
          Seven years of shipping: contact center tooling for a US health
          insurer, a claims portal used by 52,000 people, and the internal
          products before that.
        </p>
      </header>

      <section aria-labelledby="skills-heading" className="mb-14">
        <h2
          id="skills-heading"
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle"
        >
          Toolkit
        </h2>
        <div className="flex flex-col gap-5">
          {skillCategories.map((category) => (
            <Reveal key={category.label}>
              <p className="mb-2 text-sm font-medium text-fg">{category.label}</p>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-fg-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-heading">
        <h2
          id="experience-heading"
          className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle"
        >
          Experience
        </h2>

        <ol className="flex flex-col gap-10">
          {workHistory.map((work) => (
            <li key={work.companyName}>
              <Reveal className="relative border-l-2 border-border pl-6">
                <span
                  className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <h3 className="mb-1 text-lg font-semibold text-fg">
                  {work.companyName}
                </h3>
                {work.positionAndResponsibilities.map((role) => (
                  <div key={role.position} className="mt-1">
                    <p className="text-sm font-medium text-fg-muted">
                      {role.position}
                    </p>
                    <p className="mb-3 mt-0.5 text-xs text-fg-subtle">
                      {role.duration}
                    </p>
                    <ul className="space-y-2">
                      {role.responsibilities.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm leading-6 text-fg-muted"
                        >
                          <span
                            className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-fg-subtle"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default WorkDetails;
