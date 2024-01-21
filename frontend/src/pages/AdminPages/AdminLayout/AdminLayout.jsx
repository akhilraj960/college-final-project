import React, { useEffect } from "react";
import styles from "./AdminLayout.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminLayout = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  });

  return (
    <>
      <div className={styles.container}>
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
        </div>
        <div className={styles.admincontainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
