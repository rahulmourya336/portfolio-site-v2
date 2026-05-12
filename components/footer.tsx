import Link from "next/link";
import { socialHandleList } from "./common";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="wrapper px-4 py-5 flex items-center justify-between gap-4 flex-wrap">
        <a
          href="mailto:ierahul20@gmail.com"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          ierahul20@gmail.com
        </a>
        <div className="flex items-center gap-4">
          {socialHandleList.map((handle) => (
            <Link
              key={handle.name}
              href={handle.link}
              target="_blank"
              rel="noopener noreferrer"
              title={handle.name}
              className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <handle.icon className="text-xl" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
