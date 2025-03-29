import { Routes, Route } from "react-router";
import AboutUs from "../components/AboutUs";
import OurServices from "../components/OurServices";
import Privacy_Policy from "../components/Privacy_Policy";
import Terms_Conditions from "../components/Terms_Conditions";
import UserLayout from "../layouts/UserLayout";
import Login from "../components/user/Login";

const Users: React.FC = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="about-us" element={<AboutUs />} />
        <Route path="our-services" element={<OurServices />} />
        <Route path="privacy-policy" element={<Privacy_Policy />} />
        <Route path="terms-conditions" element={<Terms_Conditions />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Users;
