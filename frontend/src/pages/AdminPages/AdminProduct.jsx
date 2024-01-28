import React, { useEffect, useState } from "react";
import styles from "./Styles/Product.module.css";
import axiosInstance from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("/admin/getallproducts")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [reload]);

  const activate = (id) => {
    axios.put(`${baseUrl}/api/product/status/activate/` + id).then((data) => {
      setReload((prevReload) => !prevReload);
      console.log(data);
    });
  };

  const inActivate = (id) => {
    axios.put(`${baseUrl}/api/product/status/inactivate/` + id).then((data) => {
      setReload((prevReload) => !prevReload);
      console.log(data);
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>All products</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>

            <th> name</th>
            <th>description</th>
            <th>brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>stock</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  style={{ width: "75px", height: "auto" }}
                  src={`http://localhost:5000/public/product-images/${product._id}.jpg`}
                  alt={`Product ${index + 1}`}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>${product.discountAmount}</td>
              <td>{product.stock}</td>

              <td>
                {product.status ? (
                  <p style={{ color: "green" }}>Active</p>
                ) : (
                  <p style={{ color: "red" }}>InActive</p>
                )}
              </td>

              <td className={styles.action}>
                <Link
                  to={`/admin/product/editproduct/${product._id}`}
                  className={styles.editbtn}
                >
                  Edit
                </Link>
                {product.status ? (
                  <button
                    onClick={() => inActivate(product._id)}
                    className={styles.status}
                    style={{ color: "red" }}
                  >
                    InActivate
                  </button>
                ) : (
                  <button
                    onClick={() => activate(product._id)}
                    className={styles.status}
                    style={{ color: "green" }}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProduct;
