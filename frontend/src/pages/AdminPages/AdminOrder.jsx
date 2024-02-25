import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import styles from "./Styles/AdminOrder.module.css";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axiosInstance.get("/api/order/orders").then((data) => {
      console.log(data.data.data);
      setOrders(data.data.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>customer Details</th>
            <th>Product Details</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td>{value.user.name}</td>
                  </tr>
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td>{value.user.phone}</td>
                  </tr>
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td>{value.user.address[0].address1}</td>
                  </tr>
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td>{value.user.address[0].address2}</td>
                  </tr>
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td>{value.user.address[0].zipcode}</td>
                  </tr>
                  <tr style={{ backgroundColor: "transparent" }}>
                    <td>{value.user.address[0].city}</td>
                  </tr>
                </td>
                <td>
                  <td>
                    <td style={{ backgroundColor: "transparent" }}>
                      <img
                        style={{ width: "75px", height: "auto" }}
                        src={`http://localhost:5000/public/product-images/${value.product._id}.jpg`}
                        alt={value.name}
                      />
                    </td>
                    <td style={{ backgroundColor: "transparent" }}>
                      <td>{value.product.name}</td>
                    </td>
                  </td>
                </td>
                <td>
                  {value.status === "pending" && <button>Proccess</button>}
                  {value.status === "process" && <button>delievered</button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrder;
