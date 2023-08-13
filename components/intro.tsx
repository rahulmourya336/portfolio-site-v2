import { IconGithubTransparent, IconInstagarmOutline, IconProjects } from "./icons";

const Intro = () => {
  return (
    <>
      <div className="grid h-screen-fix w-screen-fix wrapper" id="about">
        <div className="text-2xl px-4 text-center flex items-center justify-center flex-col gap-6">
          {"Hi👋🏼 I'm Rahul Mourya, a web developer."}
          <div className="text-sm px-4 text-left leading-6">
            {
              'I enjoy building consumer and developer-facing products. While my job title says "Frontend Engineer", I like working on all the parts of the stack.'
            }
          </div>

          <div className="text-sm px-4 text-left leading-6">
            {
              "I love exploring frontend frameworks, especially the ones which faster DOM update and reliability. I previously wrote some apps in Angular, Vue.JS & React.JS, and I'm learning Svelte now."
            }
          </div>

          <div className="text-sm px-4 text-left leading-6">
            {
              "I recently discovered my interest in backend engineering, and I'm looking for pro-bono (and preferably open source) backend & AWS opportunities in order to help me grow."
            }
          </div>

          <div className="text-sm px-4 text-left  leading-6">
            {"I occasionally play video games & create vector illustrations."}
          </div>

          <div className="text-sm pb-4 grid gap-x-4 items-center justify-items-center grid-cols-2">
            <div className="py-2">
              <a href="https://github.com/rahulmourya336" target={"_blank"}>
                <button
                  type="button"
                  className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                >
                  <IconGithubTransparent className="text-xl mr-2" />
                  Code
                </button>
              </a>
            </div>
            <div className="py-2">
              <a
                href="https://www.instagram.com/archive.sketch"
                target={"_blank"}
              >
                <button
                  type="button"
                  className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                >
                  <IconInstagarmOutline className="text-xl mr-2" />
                  Design
                </button>
              </a>
            </div>
            <div className="py-2 col-span-2">
              <a
                href="/work#projects"
              >
                <button
                  type="button"
                  className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                >
                  <IconProjects className="text-xl mr-2" />
                  Projects
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
