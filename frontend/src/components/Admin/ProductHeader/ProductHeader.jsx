import React from "react";
import styles from "./ProductHeader.module.css";

import { Link } from "react-router-dom";

const ProductHeader = () => {
  return (
    <>
      <div className={styles.productheader}>
        <nav>
          <ul>
            <li>
              <Link to={"/admin/product"}>products</Link>
            </li>{" "}
            <li>
              <Link to={"addproduct"}>add product</Link>
            </li>{" "}
            <li>
              <Link to={"addcategory"}>add category</Link>
            </li>{" "}
            <li>
              <Link to={"createbrand"}>create new brand</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductHeader;
