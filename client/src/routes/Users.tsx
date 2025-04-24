import { Routes, Route } from "react-router";
import AboutUs from "../components/AboutUs";
import OurServices from "../components/OurServices";
import Privacy_Policy from "../components/Privacy_Policy";
import Terms_Conditions from "../components/Terms_Conditions";
import UserLayout from "../layouts/UserLayout";
import Login from "../pages/user/Login";
import Home from "../pages/user/Home";
import NotFound from "../pages/user/NotFound";
import ForgotPass from "../pages/ForgotPass";
import Register from "../pages/user/Register";
import ResetPass from "../pages/ResetPass";
import ProtectedRoute from "./ProtectedRoute";

const Users: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="our-services" element={<OurServices />} />
        <Route path="privacy-policy" element={<Privacy_Policy />} />
        <Route path="terms-conditions" element={<Terms_Conditions />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPass />} />
      <Route path="reset-password/:token" element={<ResetPass />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Users;
