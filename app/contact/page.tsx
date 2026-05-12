import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"));
const ContactDetails = dynamic(() => import("@/components/contact"));
const Footer = dynamic(() => import("@/components/footer"));

const Contact = () => {
  return (
    <>
      <Header />
      <ContactDetails />
      <Footer />
    </>
  );
};

export default Contact;
