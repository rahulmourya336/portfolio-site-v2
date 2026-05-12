const en = {
  nav: {
    home: "Home",
    work: "Work",
    contact: "Get In Touch",
    resume: "Resume",
    blog: "Blog",
  },
  intro: {
    greeting: "Hi, I'm Rahul.",
    p1: "I'm a frontend engineer who enjoys building things people actually use, from polished UIs to the APIs behind them. My job title says frontend, but I like working across the full stack.",
    p2: "I've spent most of my career in the React / Vue / Next.js ecosystem and I'm always curious about what makes web experiences feel fast and intuitive.",
    p3: "Lately I've been exploring backend engineering and cloud infrastructure. I'm actively looking for open-source or pro-bono opportunities to grow in those areas. Hit me up if that sounds like a fit.",
    p4: "When I'm not coding, you'll find me deep in a video game or sketching vector illustrations.",
    codeBtn: "Code",
    designBtn: "Design",
    projectsBtn: "Projects",
  },
  work: {
    skillsLabel: "Skills",
    languagesLabel: "Languages",
    frameworksLabel: "Frameworks",
    toolsLabel: "Tools & Services",
    experienceTab: "Experience",
    projectsTab: "Projects",
    githubNote: "A selection of things I've built. For the full list, check out my",
    githubLinkText: "GitHub",
  },
  contact: {
    heading: "Let's talk.",
    p1: "Drop me an email. Could be about a project, an opportunity, or just to say hi. Memes are welcome too.",
    socialLabel: "Or find me elsewhere on the internet:",
  },
  meta: {
    title: "Rahul Mourya, Frontend Engineer",
    description: "Frontend engineer who enjoys building things people actually use.",
    keywords: "Rahul Mourya, frontend engineer, software developer, React, Next.js, Vue.js, portfolio",
  },
} as const;

export type Dictionary = typeof en;
export default en;
