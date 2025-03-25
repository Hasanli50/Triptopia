import { Routes, Route } from "react-router";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import OurServices from "../components/OurServices";
import Privacy_Policy from "../components/Privacy_Policy";
import Terms_Conditions from "../components/Terms_Conditions";

const Users = () => {
  return (
    <>
      <Routes>
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="footer" element={<Footer />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="our-services" element={<OurServices />} />
        <Route path="privacy-policy" element={<Privacy_Policy />} />
        <Route path="terms-conditions" element={<Terms_Conditions />} />
      </Routes>
    </>
  );
};

export default Users;
