import React, { useEffect } from "react";
import styles from "./Layout.module.css";
import AdminSideBar from "../../../components/Admin/AdminSideBar/AdminSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin]);

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
