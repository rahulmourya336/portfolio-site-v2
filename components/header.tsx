"use client";
import { usePathname } from "next/navigation";
import { NavLinks } from "./common";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const Links = NavLinks;
  return (
    <>
      <div className="flex items-center justify-around backdrop-blur-sm	bg-transparent  sticky top-0 z-30 w-full shadow-xl transition-all">
        <div className="p-5 flex justify-between items-center flex-wrap gap-y-4  gap-x-6 sm:gap-x-10 cursor-pointer sm:justify-center">
          {Links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <div
                key={link.id}
                className={
                  isActive
                    ? link.cssClasses + " border-b-4 border-purple-500"
                    : link.cssClasses
                }
              >
                <Link
                  href={link?.href ? link.href : "#"}
                  className={isActive ? "text-white" : "text-gray-400"}
                  target={link.target}
                >
                  {" "}
                  {link.title}{" "}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Header;
