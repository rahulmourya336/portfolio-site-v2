import {
  IconGithub,
  IconInstagram,
  IconLinkedIn,
  IconStackoverflow,
  IconTwitter,
} from "./icons";

export const NavLinks = [
  { id: 1, title: "Home", href: "/", target: "_self" },
  { id: 2, title: "Work", href: "/work", target: "_self" },
  { id: 3, title: "Projects", href: "/projects", target: "_self" },
  { id: 4, title: "Blog", href: "/blog", target: "_self" },
  { id: 5, title: "Contact", href: "/contact", target: "_self" },
  { id: 6, title: "Resume", href: "/Rahul_Mourya_CV.pdf", target: "_blank" },
];

export const languagesList = [
  "HTML",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "Python",
  "SQL",
].join(", ");

export const frameWorksAndTools = [
  "React.js",
  "Next.js",
  "Vue.js",
  "Node.js",
  "GraphQL",
  "TanStack Query",
  "DynamoDB",
  "MongoDB",
  "Tailwind CSS",
  "AWS",
  "Terraform",
  "Git",
].join(", ");

export const skillCategories = [
  {
    label: "Languages",
    skills: ["HTML", "CSS3", "JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    label: "Frameworks",
    skills: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Node.js",
      "GraphQL",
      "TanStack Query",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    label: "Tools & Services",
    skills: [
      "AWS (Lambda, S3, CloudFront)",
      "DynamoDB",
      "MongoDB",
      "Firebase",
      "Terraform",
      "GitHub Actions",
      "Splunk",
      "Vitest",
      "Git",
    ],
  },
];

export const workHistory = [
  {
    companyName: "Miratech Group (client: UnitedHealth Group)",
    positionAndResponsibilities: [
      {
        position: "Full Stack Engineer",
        duration: "Jul 2023 – Present",
        responsibilities: [
          "Built a real-time configuration datastore for Amazon Connect: a React + MUI app with Monaco Editor where users add, edit, and publish agent and line-of-business configs in real time.",
          "Wrote its Python backend: CRUD APIs on AWS Lambda over DynamoDB, with LSI and GSI indexes powering search and sorting.",
          "Cut config publish time from about 2 minutes per change to milliseconds, with updates reflecting to agents instantly.",
          "Owned the feature end to end: GitHub Actions CI/CD workflows, Terraform setup for new instances, and failover testing across east and west AWS regions.",
          "Unified frontend and backend Splunk queries into a single user-journey log, so one query traces a request across the full stack.",
          "Customize and ship Genesys contact center features for UnitedHealth Group, from stakeholder requirements through demo and release.",
          "Mentor a team of 5-6 engineers: onboarding, PR reviews, coding standards, Vitest test coverage, and security patching.",
          "Tech stack: React, TypeScript, MUI, Python, AWS Lambda, DynamoDB, Terraform, Amazon Connect, Genesys, GitHub Actions, Splunk, Vitest",
        ],
      },
    ],
  },
  {
    companyName: "Heals Healthcare",
    positionAndResponsibilities: [
      {
        position: "Frontend Engineer",
        duration: "Jul 2021 – Jul 2023",
        responsibilities: [
          "Built an all-in-one claim settlement portal in Vue.js serving 52,000+ users and processing 5-6K claims a month across payor and provider workflows, consuming GraphQL APIs through TanStack Query.",
          "Migrated the patient-facing app from Angular to React with full UI parity, cutting build times and hot-reload waits enough to visibly speed up the team's release cycle.",
          "Automated patient chit collection for EDI generation, replacing a fully manual step and improving the claim settlement ratio.",
          "Tech stack: Vue.js, React, Next.js, GraphQL, TanStack Query, Tailwind CSS, HighCharts, Jest, Webpack",
        ],
      },
    ],
  },
  {
    companyName: "Rishabh Software",
    positionAndResponsibilities: [
      {
        position: "Associate Developer",
        duration: "Dec 2018 – Jul 2021",
        responsibilities: [
          "Built REST APIs in Node.js + TypeScript and an Angular UI for the company-wide internal chat platform serving 500-1K daily active users, including a Firebase function tracking unread counts for the Android app.",
          "Created a vehicle booking service using the Google Distance Matrix API to assign the nearest available vehicle; deployed the Node.js backend on AWS Elastic Beanstalk with the frontend on CloudFront.",
          "Shipped React components for The Laundry House product, including thermal label printing via raw ZPL commands.",
          "Tech stack: React, Angular, Node.js, TypeScript, WebSocket, Firebase, AWS, Material UI, SonarQube",
        ],
      },
    ],
  },
];

export const socialHandleList = [
  {
    name: "LinkedIn",
    icon: IconLinkedIn,
    link: "https://www.linkedin.com/in/mouryarahul/",
  },
  {
    name: "GitHub",
    icon: IconGithub,
    link: "https://github.com/rahulmourya336",
  },
  {
    name: "Twitter",
    icon: IconTwitter,
    link: "https://twitter.com/rahucrux",
  },
  {
    name: "Stack Overflow",
    icon: IconStackoverflow,
    link: "https://stackoverflow.com/users/8186099/rahul-mourya",
  },
  {
    name: "Instagram",
    icon: IconInstagram,
    link: "https://www.instagram.com/archive.sketch",
  },
];
