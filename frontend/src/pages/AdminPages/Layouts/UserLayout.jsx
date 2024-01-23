import React from "react";
import "./Layout.module.css";
import { Outlet } from "react-router-dom";
import UserHeader from "../Headers/UserHeader";
import styles from "./Layout.module.css";

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
