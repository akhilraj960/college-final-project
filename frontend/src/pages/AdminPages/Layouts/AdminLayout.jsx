import React from "react";
import styles from "./Layout.module.css";
import AdminSideBar from "../../../components/Admin/AdminSideBar/AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      <AdminSideBar />
      <div className={styles.admincontainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
