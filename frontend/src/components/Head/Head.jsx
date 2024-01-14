import React from "react";
import styles from "./Head.module.css";

import { Link, useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();

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
              <Link to={"/"}>Home</Link>
            </li>{" "}
            <li>
              <Link>Cart</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
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

export default Head;
