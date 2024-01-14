// AdminProduct.js

import React, { useEffect, useState } from "react";
import styles from "./AdminProduct.module.css";
import axiosInstance from "../../../config/axiosInstance";
import ModelBox from "../../../components/ModelBox/ModelBox";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axiosInstance
      .get("/admin/getallproducts")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h3>All Products</h3>
      {/* <ModelBox/> */}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th> name</th>
            <th>discription</th>
            <th>brand</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Discount</th>
            <th>stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.discription}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.subCategory}</td>
              <td>${product.price}</td>
              <td>${product.discountAmount}</td>
              <td>${product.stock}</td>
              <td>
                <img
                  src={`http://localhost:5000/public/product-images/${product._id}.jpg`}
                  alt={`Product ${index + 1}`}
                />
              </td>
              <td>
                {/* Add your actions here (e.g., Edit, Delete) */}
                <Link to={`/admin/product/editproduct/${product._id}`} className={styles.actionButton}>Edit</Link>
                {/* <button className={styles.actionButton}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProduct;
