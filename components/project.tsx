import Image from "next/image";
import { ProjectList } from "./common";
import { IconEye, IconGithubTransparent, IconRightArrow } from "./icons";

const Project = () => {
  return (
    <>
      <div className="wrapper px-5">
        <div className="col-span-3 py-3 leading-7">
          This list isn't being kept updated. A better list can be found by
          looking at my GitHub profile.
          <div>
            <a
              href="https://github.com/rahulmourya336"
              className="underline  hover:text-gray-400"
            >
              Visit my GitHub <IconRightArrow className="inline" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 items-start place-content-between">
          {ProjectList.map((project, idx) => {
            return (
              <>
                <div>
                  <Image
                    src={project.thumbnail}
                    width={180}
                    height={100}
                    alt={project.name}
                    className="object-cover"
                  />
                  <div className="grid grid-cols-2  gap-2 text-gray-300 ">
                    <div className="py-2 font-bold col-span-2">
                      {project.name}
                    </div>
                    <div>
                      <IconGithubTransparent className="inline" />{" "}
                      <a
                        href={project.githubLink}
                        className="hover:text-gray-400 px-1"
                        target="_blank"
                      >
                        Github
                      </a>
                    </div>
                    <div>
                      <IconEye className="inline" />
                      <a
                        href={project.demoLink}
                        className="hover:text-gray-400 px-1"
                        target="_blank"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <div className="py-5 px-5 "></div>
        </div>
      </div>
    </>
  );
};

export default Project;
