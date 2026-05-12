import {
  IconGithub,
  IconInstagram,
  IconLinkedIn,
  IconStackoverflow,
  IconTwitter,
} from "./icons";

const commonClasses = "border-b-2 hover:border-gray-500 pt-1 pb-1";
export const NavLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
    cssClasses: commonClasses,
    target: "_self",
  },
  {
    id: 2,
    title: "Work",
    href: "/work",
    cssClasses: commonClasses,
    target: "_self",
  },
  {
    id: 3,
    title: "Get In Touch",
    href: "/contact",
    cssClasses: commonClasses,
    target: "_self",
  },
  {
    id: 4,
    title: "Resume",
    href: "/Rahul_Mourya_CV.pdf",
    cssClasses: commonClasses,
    target: "_blank",
  },
  {
    id: 5,
    title: "Blog",
    href: "https://medium.com/@i.e.rahul",
    cssClasses: commonClasses,
    target: "_blank",
  },
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
  "MongoDB",
  "Firebase",
  "Tailwind CSS",
  "AWS",
  "Git",
].join(", ");

export const skillCategories = [
  {
    label: "Languages",
    skills: ["HTML", "CSS3", "JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    label: "Frameworks",
    skills: ["React.js", "Next.js", "Vue.js", "Node.js", "GraphQL"],
  },
  {
    label: "Tools & Services",
    skills: ["MongoDB", "Firebase", "Tailwind CSS", "AWS", "Git"],
  },
];

export const workHistory = [
  {
    companyName: "Heals Healthcare",
    positionAndResponsibilities: [
      {
        position: "Software Developer",
        duration: "Jan 2022 – Present",
        responsibilities: [
          "Built an all-in-one claim settlement portal with Vue.js, used by operations teams daily.",
          "Migrated the patient app from Angular to React, improving performance and maintainability.",
          "Automated patient chit collection for EDI generation, resulting in a higher settlement ratio.",
          "Conduct code reviews and collaborate with stakeholders on requirements and solution architecture.",
          "Tech stack: Vue.js, React.js / Next.js, Tailwind CSS, Apollo GraphQL",
        ],
      },
    ],
  },
  {
    companyName: "Deqode Solutions",
    positionAndResponsibilities: [
      {
        position: "Senior Solution Engineer",
        duration: "Jul 2021 – Jan 2022",
        responsibilities: [
          "Built cross-browser compatible, standards-compliant UIs with React.js / Next.js.",
          "Developed modules in large cross-platform applications using REST web services.",
          "Designed, built, and deployed applications using the AWS stack.",
          "Tech stack: React.js / Next.js, Highcharts.js",
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
          "Built an internal chat app (RSPL Chat) with Node.js + TypeScript APIs and an Angular v7 UI.",
          "Created internal tools for seating management using SVG and vanilla JavaScript.",
          "Built React components and implemented ZPL-based tag printing for the TLH product.",
          "Created a Firebase function to track unread message counts for the TenFold Android app.",
          "Built Node.js APIs for BOA Hub Client, using the Google Distance Matrix API and AWS Beanstalk.",
          "Worked across the full agile cycle: design, implementation, and deployment.",
          "Tech stack: Angular 4+, React.js, Material UI, WebSocket, Firebase, AWS, SonarQube",
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

export const ProjectList = [
  {
    name: "100 Days of CSS",
    githubLink: "https://github.com/rahulmourya336/css-101",
    demoLink: "https://css101.vercel.app/",
    thumbnail: "/css_thumbnail.png",
    tags: ["CSS3"],
  },
  {
    name: "Vanilla JS Todo App",
    githubLink: "https://github.com/rahulmourya336/VanillaToDo",
    demoLink: "https://vanillav2beta.netlify.com/",
    thumbnail: "/todo_thumbnail.png",
    tags: ["Vanilla JS", "Spectre CSS"],
  },
  {
    name: "React.js Todo App",
    githubLink:
      "https://github.com/rahulmourya336/react-101/tree/master/src/Todo",
    demoLink: "https://react-101-git-master-rahulmourya336.vercel.app/todo",
    thumbnail: "/todo_application.png",
    tags: ["React.js"],
  },
  {
    name: "Full-stack Todo App",
    githubLink: "https://github.com/rahulmourya336/todo-with-theme",
    demoLink: "https://react101-todo.netlify.app/",
    thumbnail: "/full_stack_todo.png",
    tags: ["React.js", "Node.js", "MongoDB"],
  },
  {
    name: "Number Guessing Game",
    githubLink:
      "https://github.com/rahulmourya336/react-101/tree/master/src/NumberGuessing",
    demoLink:
      "https://react-101-git-master-rahulmourya336.vercel.app/number-guessing",
    thumbnail: "/number_guessing.png",
    tags: ["React.js"],
  },
  {
    name: "Quote Generator",
    githubLink:
      "https://github.com/rahulmourya336/react-random-quote-generator",
    demoLink: "https://react-random-quote.vercel.app/",
    thumbnail: "/quote_generator.png",
    tags: ["React.js"],
  },
  {
    name: "Weather App",
    githubLink: "https://github.com/rahulmourya336/react-weather",
    demoLink: "https://react101-weather.netlify.app/",
    thumbnail: "/_weather_thumbnail.png",
    tags: ["React.js", "OpenWeather API"],
  },
  {
    name: "Calculator",
    githubLink: "https://github.com/rahulmourya336/react-calc",
    demoLink: "https://react-basic-calc.netlify.app/",
    thumbnail: "/_calc_thumbnail.png",
    tags: ["React.js", "Styled Components"],
  },
  {
    name: "NH48 Furniture Website",
    githubLink: "https://github.com/rahulmourya336/code-name-nh48",
    demoLink: "https://nh48.in/",
    thumbnail: "/NH48_thumbnail.png",
    tags: ["React.js", "Tailwind CSS", "Headless UI"],
  },
];
