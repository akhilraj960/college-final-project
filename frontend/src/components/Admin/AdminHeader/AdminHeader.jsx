import React from "react";
import styles from "./AdminHeader.module.css";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const handlLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to={"/"}>
            SHOP<span>ITO</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to={"/"}>View</Link>
            </li>{" "}
            <li>
              <Link to={"/"} onClick={handlLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
