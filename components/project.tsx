"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectList } from "./common";
import { IconEye, IconGithubTransparent, IconRightArrow } from "./icons";

const Project = () => {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 mb-6">
        A selection of things I&apos;ve built. For the full list, check out my{" "}
        <a
          href="https://github.com/rahulmourya336"
          className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-0.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <IconRightArrow className="text-xs" />
        </a>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ProjectList.map((project, idx) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.35, ease: "easeOut" }}
            className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md dark:hover:shadow-purple-950/20 transition-all duration-200"
          >
            <div className="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
              <Image
                src={project.thumbnail}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                alt={project.name}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <div className="font-medium text-sm text-gray-900 dark:text-white mb-2 leading-snug">
                {project.name}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
                <a
                  href={project.githubLink}
                  className="inline-flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGithubTransparent /> Code
                </a>
                <a
                  href={project.demoLink}
                  className="inline-flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconEye /> Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Project;
