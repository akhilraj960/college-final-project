import React, { useEffect } from "react";
import styles from "./Head.module.css";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH } from "../../redux/features/Auth/authSlice";
import { toast } from "react-toastify";

const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handlLogout = (e) => {
    e.preventDefault();
    localStorage.clear("token");
    dispatch(RESET_AUTH());
    toast.success("Logout Success");
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
              <Link to={"/cart"}>Cart</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/orders"}>Orders</Link>
                </li>

                <li>
                  <Link to={"/"} onClick={handlLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Head;
