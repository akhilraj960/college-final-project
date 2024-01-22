import React, { useEffect, useState } from "react";
import styles from "./Styles/Product.module.css";
import axiosInstance from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axiosInstance
      .get("/admin/getallproducts")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>All products</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th> name</th>
            <th>description</th>
            <th>brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>stock</th>
            <th>status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>${product.discountAmount}</td>
              <td>${product.stock}</td>
              <td>${product.status}</td>

              <td>
                <img
                  style={{ width: "75px", height: "auto" }}
                  src={`http://localhost:5000/public/product-images/${product._id}.jpg`}
                  alt={`Product ${index + 1}`}
                />
              </td>
              <td>
                <Link
                  to={`/admin/product/editproduct/${product._id}`}
                  className={styles.editbtn}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProduct;
