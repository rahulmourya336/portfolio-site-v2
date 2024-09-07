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
  "Python",
  "MySQL",
].join(", ");

export const frameWorksAndTools = [
  "React.JS",
  "Next.JS",
  "Vue.JS",
  "Node.JS",
  "MongoDB",
  "Firebase",
  "Git",
].join(", ");

export const workHistory = [
  {
    companyName: "Heals Healthcare",
    positionAndResponsibilities: [
      {
        position: "Software Developer",
        duration: "Jan 2022 to Present",
        responsibilities: [
          "Built all in one claim settlement portal with Vue.JS.",
          "Migrated patient app from Angular to React.",
          "Automated patient chits collection for EDI generation, resulting higher settlement ratio.",
          "Conducting code reviews to ensure quality of code & collaboration with stakeholders for requirement & to architect solution.",
          "Technologies: VueJS, ReactJS/NextJS, Tailwind CSS, Apollo-GraphQL",
        ],
      },
    ],
  },

  {
    companyName: "Deqode Solutions",
    positionAndResponsibilities: [
      {
        position: "Senior Solution Engineer",
        duration: "Jul 2021 to Jan 2022",
        responsibilities: [
          "Created cross-browser compatible and standards-compliant using ReactJS/NextJS.",
          "Developed modules in large cross-platform applications using Web Services (REST).",
          "Designed, built, and deployed applications utilizing the AWS stack",
          "Technologies: ReactJS/NextJS HighChartsJS",
        ],
      },
    ],
  },

  {
    companyName: "Rishabh Software",
    positionAndResponsibilities: [
      {
        position: "Associate Developer",
        duration: "Dec 2018 to Jul 2021",
        responsibilities: [
          "Worked on internal chat application RSPL chat, created APIs in Node.JS + Typescript and UI with Angular v7.",
          "Built internal tools for seating management using SVG & Vanilla Javascript.",
          "Worked on TLH (The Laundry House) product, built components in ReactJS and implemented tag printing using thermal printer using ZPL commands.",
          "Created firebase function to keep track of unread messages count for TenFold Android app.",
          "Created APIs in Node.JS for BOA Hub Client, used Google distance matrix API to calculate distance & book nearest available BOA Pod. Used AWS beanstalk to deploy Node.JS Backend & CloudFront to host frontend.",
          "Worked in all aspects of agile software development including design, implementation, and deployment.",
          "Technologies: Material UI, Angular 4+, ReactJS, WebSocket, Firebase, AWS & SonarQube",
        ],
      },
    ],
  },
];

export const socialHandleList = [
  {
    name: "linkedIn",
    icon: IconLinkedIn,
    link: "https://www.linkedin.com/in/mouryarahul/",
  },
  {
    name: "github",
    icon: IconGithub,
    link: "https://github.com/rahulmourya336",
  },
  {
    name: "twitter",
    icon: IconTwitter,
    link: "https://twitter.com/rahucrux",
  },
  {
    name: "stackoverflow",
    icon: IconStackoverflow,
    link: "https://stackoverflow.com/users/8186099/rahul-mourya",
  },
  {
    name: "instagram",
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
    tags: ["vanillaJS", "SpectreCSS"],
  },
  // {
  //   name: "100 Days of React",
  //   githubLink: "https://github.com/rahulmourya336/react-101",
  //   demoLink: "http://react-101-git-master.rahulmourya336.vercel.app/",
  //   thumbnail: "/react_thumbnail.png",
  //   tags: ["ReactJS"],
  // },
  {
    name: "React.JS Todo App",
    githubLink:
      "https://github.com/rahulmourya336/react-101/tree/master/src/Todo",
    demoLink: "https://react-101-git-master-rahulmourya336.vercel.app/todo",
    thumbnail: "/todo_application.png",
    tags: ["ReactJS"],
  },
  {
    name: "Full-stack Todo App",
    githubLink: "https://github.com/rahulmourya336/todo-with-theme",
    demoLink: "https://react101-todo.netlify.app/",
    thumbnail: "/full_stack_todo.png",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
  },
  {
    name: "Number Guessing Game",
    githubLink:
      "https://github.com/rahulmourya336/react-101/tree/master/src/NumberGuessing",
    demoLink:
      "https://react-101-git-master-rahulmourya336.vercel.app/number-guessing",
    thumbnail: "/number_guessing.png",
    tags: ["ReactJS"],
  },
  {
    name: "Quote Generator",
    githubLink:
      "https://github.com/rahulmourya336/react-random-quote-generator",
    demoLink: "https://react-random-quote.vercel.app/",
    thumbnail: "/quote_generator.png",
    tags: ["ReactJS"],
  },

  {
    name: "Weather APP",
    githubLink: "https://github.com/rahulmourya336/react-weather",
    demoLink: "https://react101-weather.netlify.app/",
    thumbnail: "/_weather_thumbnail.png",
    tags: ["ReactJS", "OpenWeather API"],
  },
  {
    name: "Calculator",
    githubLink: "https://github.com/rahulmourya336/react-calc",
    demoLink: "https://react-basic-calc.netlify.app/",
    thumbnail: "/_calc_thumbnail.png",
    tags: ["ReactJS", "Styled Components"],
  },
  {
    name: "NH48 Furniture Website",
    githubLink: "https://github.com/rahulmourya336/code-name-nh48",
    demoLink: "https://nh48.in/",
    thumbnail: "/NH48_thumbnail.png",
    tags: ["ReactJS", "Tailwind CSS", "HeadlessUI"],
  },
];
