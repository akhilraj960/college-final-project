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
              <Link to={"/admin/product"}>Product</Link>
            </li>{" "}
            <li>
              <Link to={"addproduct"}>Add Product</Link>
            </li>{" "}
            <li>
              <Link to={"addcategory"}>Add Category</Link>
            </li>{" "}
            <li>
              <Link to={"addsubcategory"}>Add Sub Cagetory</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductHeader;
