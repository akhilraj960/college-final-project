import React from "react";
import styles from "./Headers.module.css";
import { Link } from "react-router-dom";

const UserHeader = () => {
  return (
    <div className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link to={""}>all users</Link>
          </li>{" "}
          {/* <li>
          <Link to={"addcategory"}>add category</Link>
        </li>{" "}
        <li>
          <Link to={"createbrand"}>create new brand</Link>
        </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default UserHeader;
