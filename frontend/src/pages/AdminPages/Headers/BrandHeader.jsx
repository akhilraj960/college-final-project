import React from "react";
import styles from "./Headers.module.css";
import { Link } from "react-router-dom";

function BrandHeader() {
  return (
    <>
      <div className={styles.header}>
        <nav>
          <ul>
            <li>
              <Link to={"/admin/brand"}>Brands</Link>
            </li>{" "}
            <li>
              <Link to={"newbrand"}>create new brand</Link>
            </li>{" "}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default BrandHeader;
