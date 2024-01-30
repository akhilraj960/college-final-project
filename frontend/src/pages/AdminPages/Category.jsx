import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Styles/AdminUsers.module.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/config";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/category/category`)
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [reload]);

  const activate = (id) => {
    axios.put(`${baseUrl}/api/category/status/active/` + id).then((data) => {
      setReload((prevReload) => !prevReload);
      console.log(data);
    });
  };

  const inActivate = (id) => {
    axios.put(`${baseUrl}/api/category/status/inactive/` + id).then((data) => {
      setReload((prevReload) => !prevReload);
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
            <th>image</th>
            <th>name</th>
            <th>description</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category?.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  style={{ width: "75px", height: "auto" }}
                  src={`http://localhost:5000/public/category-images/${value._id}.jpg`}
                  alt={`Product ${index + 1}`}
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
              <td className={styles.action}>
                <Link
                  to={`/admin/category/editcategory/:id`}
                  className={styles.editbtn}
                >
                  Edit
                </Link>

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
