import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"));
const ContactDetails = dynamic(() => import("@/components/contact"));

const Contact = () => {
  return (
    <>
      <Header />
      <ContactDetails />
    </>
  );
};

export default Contact;
