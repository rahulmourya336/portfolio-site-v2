import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"));
const WorkDetails = dynamic(() => import("@/components/work"));
const Footer = dynamic(() => import("@/components/footer"));

const Work = () => {
  return (
    <>
      <Header />
      <WorkDetails />
      <Footer />
    </>
  );
};

export default Work;
