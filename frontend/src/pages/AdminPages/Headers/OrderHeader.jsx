import React from "react";
import styles from "./Headers.module.css";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

const OrderHeader = () => {
  return (
    <>
      <div className={styles.header}>
        <nav>
          <ul>
            <li>
              <Link to={"/admin/orders"}>Orders</Link>
            </li>{" "}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default OrderHeader;
