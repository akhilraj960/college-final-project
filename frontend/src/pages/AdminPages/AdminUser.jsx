import React, { useEffect, useState } from "react";
import styles from "./Styles/AdminUsers.module.css";
import axios from "axios";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((response) => {
        setUsers(response.data.users);
        console.log(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // Handle error (e.g., show an error message to the user)
      });
  }, []);

  console.log(users);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>All Users</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            {/* <th>role</th> */}
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              {/* <td>{user.role}</td> */}
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
