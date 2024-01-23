import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Styles/AdminUsers.module.css";

import { baseUrl } from "../../config/config";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/category/category`)
      .then((response) => {
        setCategory(response.data.category);
        console.log(response.data.category)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        F;
      });
  }, []);

  const activate = (id) => {
    axios.put(`${baseUrl}/api/category/status/active/` + id).then((data) => {
      console.log(data);
    });
  };

  const inActivate = (id) => {
    axios.put(`${baseUrl}/api/category/status/inactive/` + id).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>All categories</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>id</th>
            <th>image</th>
            <th>name</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value._id}</td>
              <td>
                <img src={`data:image/jpeg;base64,+${value.image.data }`} alt="" />
              </td>
              <td>{value.name}</td>
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

export default Category;
