"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, workHistory } from "./common";
import Project from "./project";

const WorkDetails = () => {
  enum TAB {
    WORK = 0,
    PROJECT,
  }
  const [selectedTab, setSelectedTab] = useState<number>(TAB.WORK);

  useEffect(() => {
    const gotoProjects =
      window?.location?.hash?.split("#")?.includes("projects") || false;
    if (gotoProjects) setSelectedTab(TAB.PROJECT);
  }, []);

  return (
    <div className="wrapper px-4 py-10">
      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col gap-4"
      >
        {skillCategories.map((category) => (
          <div key={category.label}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
              {category.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-8">
        {[
          { label: "Experience", tab: TAB.WORK },
          { label: "Projects", tab: TAB.PROJECT },
        ].map(({ label, tab }) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              selectedTab === tab
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {label}
            {selectedTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {selectedTab === TAB.WORK ? (
          <motion.div
            key="work"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {workHistory.map((work) => (
              <div
                key={work.companyName}
                className="mb-10 relative pl-6 border-l-2 border-gray-200 dark:border-gray-800"
              >
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  {work.companyName}
                </div>
                {work.positionAndResponsibilities.map((PR) => (
                  <div key={PR.position} className="mt-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {PR.position}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 mb-3">
                      {PR.duration}
                    </p>
                    <ul className="space-y-2">
                      {PR.responsibilities.map((r, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 dark:text-gray-400 leading-6 flex gap-2 items-start"
                        >
                          <span className="mt-2.5 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Project />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkDetails;
