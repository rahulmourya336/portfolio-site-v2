import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"));
const WorkDetails = dynamic(() => import("@/components/work"));


const Work = () => {

  return (
    <>
      <Header />
      <WorkDetails/>
    </>
  );
};

export default Work;
