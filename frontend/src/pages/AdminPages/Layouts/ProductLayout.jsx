import React from "react";
import ProductHeader from "../Headers/ProductHeader";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
const ProductLayout = () => {
  return (
    <>
      <ProductHeader />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default ProductLayout;
