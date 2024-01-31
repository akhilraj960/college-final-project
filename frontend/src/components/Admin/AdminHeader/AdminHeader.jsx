import React from "react";
import styles from "./AdminHeader.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_AUTH } from "../../../redux/features/Auth/authSlice";
import { toast } from "react-toastify";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");

    dispatch(RESET_AUTH());
    toast.success("Logout Success")
    navigate("/admin/login");
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
