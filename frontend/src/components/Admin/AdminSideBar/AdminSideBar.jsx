import React from "react";
import styles from "./AdminSideBar.module.css";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div>
      <div className={styles.sidenav}>
        <Link to={"/admin"} className={styles.link}>
          DashBoard
        </Link>
        <Link to={"/admin/orders"} className={styles.link}>
          Orders
        </Link>
        <Link to={"/admin/product"} className={styles.link}>
          Product
        </Link>
        <Link to={"/admin/users"} className={styles.link}>
          Users
        </Link>{" "}
        <Link to={"/admin/category"} className={styles.link}>
          Categories
        </Link>{" "}
      </div>
    </div>
  );
};

export default AdminSideBar;
