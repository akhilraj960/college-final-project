import React from "react";
import Head from "../../components/Head/Head";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};

export default MainLayout;
