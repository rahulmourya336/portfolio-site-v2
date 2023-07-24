import Link from "next/link";
import { socialHandleList } from "./common";
import { IconContact } from "./icons";

const ContactDetails = () => {
  return (
    <>
      <div className="grid h-screen-fix w-screen-fix wrapper transition-all" id="about">
        <div className="text-2xl px-4 text-center flex items-center justify-start flex-col gap-6 py-20">
        <IconContact  className="text-6xl text-white"/>
          <div className="text-lg px-4 text-left leading-7">
            {
              "Drop me an email if there is anything you would like to talk about. Could be a hello, a potential work opportunity - anything, really. You could even send memes."
            }
          </div>

          <div className="text-lg px-4 text-left leading-7 underline">
            <a href="mailto:ierahul20@gmail.com">
              ierahul20[at]gmail[dot]com
            </a>
          </div>

          <div className="text-lg px-4 text-left leading-7 text-gray-400">
            {
              "And if you'd like to follow me on social media and other websites on the Internet, here are some cool buttons that lead to my profiles."
            }
          </div>

          <div className="px-4 text-left leading-6 flex gap-5 flex-wrap">
            {socialHandleList.map((handle, idx) => {
              return (
                <>
                  <Link href={handle.link}>
                    {<handle.icon className="text-4xl" />}
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
