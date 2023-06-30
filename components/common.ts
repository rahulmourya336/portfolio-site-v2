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
    title: "About",
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
    href: "https://flowcv.com/resume/1jmeqqddgi",
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
  "Javascript",
  "Python",
  "MySQL",
].join(", ");

export const frameWorksAndTools = [
  "React",
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
          "Built all in one claim settlement portal with VueJS.",
          "Migrated patient app from Angular to React.",
          "Automated patient chits collection for EDI generation, resulting higher settlement ratio.",
          "Conducting code reviews to ensure quality of code & collaboration with stakeholders for requirement & to architect solution.",
          "Technologies: VueJS, ReactJS/NextJS, Tailwind CSS, Apollo-GraphQL",
        ],
      },
    ],
  },

  {
    companyName: "Deqode",
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
          "Worked on TLH (The Launday House) product, built components in ReactJS and implemented tag printing using thermal printer using ZPL commands.",
          "Created firebase function to keep track of unread messages count for TenFold Android app.",
          "Created APIs in Node.JS for BOA Hub Client, used Google distance matrix API to calculate distance & book nearest available BOA Pod. Used AWS beankstalk to deploy Node.JS Backend & cloudfront to host frontend.",
          "Worked in all aspects of agile software development including design, implementation, and deployment.",
          "Technologies: Material UI, Angular 4+, ReactJS, Websocket, Firebase, AWS & SonarQube",
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
    name: "Todo App",
    githubLink: "https://github.com/rahulmourya336/VanillaToDo",
    demoLink: "https://vanillav2beta.netlify.com/",
    thumbnail: "/todo_thumbnail.png",
    tags: ["vanillaJS, spectre.css"],
  },
  {
    name: "100 Days of CSS",
    githubLink: "https://github.com/rahulmourya336/css-101",
    demoLink: "http://css-101-git-master.rahulmourya336.vercel.app/",
    thumbnail: "/css_thumbnail.png",
    tags: ["CSS3"],
  },
  {
    name: "100 Days of React",
    githubLink: "https://github.com/rahulmourya336/react-101",
    demoLink: "http://react-101-git-master.rahulmourya336.vercel.app/",
    thumbnail: "/react_thumbnail.png",
    tags: ["ReactJS"],
  },
  {
    name: "Weather APP",
    githubLink: "https://github.com/rahulmourya336/react-weather",
    demoLink: "https://react101-weather.netlify.app/",
    thumbnail: "/weather_thumbnail.png",
    tags: ["ReactJS", "OpenWeather API"],
  },
  {
    name: "Calculator",
    githubLink: "https://github.com/rahulmourya336/react-calc",
    demoLink: "https://react-basic-calc.netlify.app/",
    thumbnail: "/calc_thumbnail.png",
    tags: ["ReactJS", "Styled Components"],
  },
  {
    name: "NH48 Furniture Website",
    githubLink: "https://github.com/rahulmourya336/code-name-nh48",
    demoLink: "https://uat-nh48.netlify.app/",
    thumbnail: "/NH48_thumbnail.png",
    tags: [
      "ReactJS",
      "Tailwind CSS",
      "Google Maps",
      "Styled Components",
      "HeadlessUI",
    ],
  },
];
