import React, { useEffect, useState } from "react";
import styles from "./Styles/AdminUsers.module.css";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";
const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("/api/brand/brands")
      .then((response) => {
        setBrands(response.data.brands);
        console.log(response.data.brands);
      })
      .catch((error) => {
        console.log("Error fetching brands", error);
      });
  }, [reload]);

  const activate = (id) => {
    axiosInstance.put(`/api/brand/status/active/` + id).then((response) => {
      setReload((prevReload) => !prevReload);
      toast.success(response.data.message);
    });
  };

  const inActivate = (id) => {
    axiosInstance.put(`/api/brand/status/inactive/` + id).then((response) => {
      setReload((prevReload) => !prevReload);
      toast.success(response.data.message);
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>All Brands</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((value, index) => (
            <tr key={value._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  style={{ width: "75px", height: "auto" }}
                  src={`http://localhost:5000/public/brand-images/${value._id}.jpg`}
                  alt={value.name}
                />
              </td>
              <td>{value.name}</td>
              <td>{value.description}</td>
              <td>
                {value.status ? (
                  <p style={{ color: "green" }}>Active</p>
                ) : (
                  <p style={{ color: "red" }}>InActive</p>
                )}
              </td>
              <td>
                {value.status ? (
                  <button
                    onClick={() => inActivate(value._id)}
                    className={styles.status}
                    style={{ color: "red" }}
                  >
                    InActivate
                  </button>
                ) : (
                  <button
                    onClick={() => activate(value._id)}
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

export default Brands;
