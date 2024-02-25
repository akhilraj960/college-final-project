import React from "react";
import OrderHeader from "../Headers/OrderHeader";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom/dist/umd/react-router-dom.development";

const OrderLayout = () => {
  return (
    <>
      <OrderHeader />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default OrderLayout;
