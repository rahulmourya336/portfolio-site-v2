"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { socialHandleList } from "./common";

const ContactDetails = () => {
  return (
    <div className="min-h-[86vh] flex items-center justify-center px-4 py-16">
      <div className="wrapper w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6 max-w-lg"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Let&apos;s talk.
          </h1>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-7">
            Drop me an email. Could be about a project, an opportunity, or
            just to say hi. Memes are welcome too.
          </p>

          <a
            href="mailto:ierahul20@gmail.com"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline text-lg w-fit"
          >
            ierahul20@gmail.com
          </a>

          <div>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
              Or find me elsewhere on the internet:
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialHandleList.map((handle, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + idx * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={handle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    title={handle.name}
                  >
                    <handle.icon className="text-3xl" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactDetails;
