import {
  IconGithubTransparent,
  IconInstagarmOutline,
} from "./icons";

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

          <div className="text-sm pb-4 grid gap-x-8 grid-cols-2 items-center justify-items-center">
            <div>
              <a href="https://github.com/rahulmourya336" target="_blank">
                <IconGithubTransparent className="text-5xl" />
              </a>
            </div>

            <div className="content-center">
              <a
                href="https://www.instagram.com/archive.sketch"
                target="_blank"
              >
                <IconInstagarmOutline className="text-5xl" />
              </a>
            </div>
            <div className="py-2">Code</div>
            <div className="py-2">Design</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
