import React from "react";
import CategoryHeader from "../Headers/CategoryHeader";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const CategoryLayout = () => {
  return (
    <>
      <CategoryHeader />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default CategoryLayout;
