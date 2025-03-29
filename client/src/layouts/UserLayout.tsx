import React from "react";
import Header from "../components/user/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const UserLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
