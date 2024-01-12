import React from "react";
import styles from "./ProductLayout.module.css";
import ProductHeader from "../../../components/Admin/ProductHeader/ProductHeader";
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
