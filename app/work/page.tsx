import dynamic from "next/dynamic";
import { getProjects } from "@/lib/projects";

const Header = dynamic(() => import("@/components/header"));
const WorkDetails = dynamic(() => import("@/components/work"));
const Footer = dynamic(() => import("@/components/footer"));

const Work = async () => {
  const projects = getProjects();

  return (
    <>
      <Header />
      <WorkDetails projects={projects} />
      <Footer />
    </>
  );
};

export default Work;
