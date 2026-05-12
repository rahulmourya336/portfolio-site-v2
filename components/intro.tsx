"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconGithubTransparent, IconInstagarmOutline, IconProjects } from "./icons";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const Intro = () => {
  return (
    <div className="min-h-[86vh] flex items-center justify-center px-4 py-16">
      <div className="wrapper w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 max-w-lg mx-auto text-center"
        >
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Hi, I&apos;m Rahul. 👋
          </motion.h1>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="text-base text-gray-600 dark:text-gray-300 leading-7"
          >
            I&apos;m a frontend engineer who enjoys building things people
            actually use, from polished UIs to the APIs behind them. My job
            title says frontend, but I like working across the full stack.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-base text-gray-600 dark:text-gray-300 leading-7"
          >
            I&apos;ve spent most of my career in the React / Vue / Next.js
            ecosystem and I&apos;m always curious about what makes web
            experiences feel fast and intuitive.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-base text-gray-600 dark:text-gray-300 leading-7"
          >
            Lately I&apos;ve been exploring backend engineering and cloud
            infrastructure. I&apos;m actively looking for open-source or
            pro-bono opportunities to grow in those areas. Hit me up if that
            sounds like a fit.
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            className="text-base text-gray-600 dark:text-gray-300 leading-7"
          >
            When I&apos;m not coding, you&apos;ll find me deep in a video game
            or sketching vector illustrations.
          </motion.p>

          <motion.div
            custom={5}
            variants={fadeUp}
            className="flex flex-wrap gap-3 pt-2 justify-center"
          >
            <a
              href="https://github.com/rahulmourya336"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <IconGithubTransparent className="text-base" />
              Code
            </a>
            <a
              href="https://www.instagram.com/archive.sketch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <IconInstagarmOutline className="text-base" />
              Design
            </a>
            <Link
              href="/work#projects"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <IconProjects className="text-base" />
              Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
