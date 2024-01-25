import React from "react";
import { Outlet } from "react-router-dom";
import BrandHeader from "../Headers/BrandHeader";
import styles from "./Layout.module.css";
const BrandLayout = () => {
  return (
    <>
      <BrandHeader />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default BrandLayout;
