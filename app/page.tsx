import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"));
const Intro = dynamic(() => import("@/components/intro"));

const Portfolio = () => {
  return (
    <>
      <Header />
      <Intro />
    </>
  );
};

export default Portfolio;
