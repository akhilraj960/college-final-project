import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import styles from "./Styles/AdminOrder.module.css";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axiosInstance.get("/api/order/orders").then((data) => {
      console.log(data.data.data);
      setOrders(data.data.data);
    });
  }, [reload]);

  const statusProcess = (id) => {
    axiosInstance.put(`/api/order/statusprocess/${id}`).then((data) => {
      setReload((prevReload) => !prevReload);
    });
  };

  const statusShipping = (id) => {
    axiosInstance.put(`/api/order/statusshipping/${id}`).then((data) => {
      setReload((prevReload) => !prevReload);
    });
  };

  const statusDelivered = (id) => {
    axiosInstance.put(`/api/order/statusdelivered/${id}`).then((data) => {
      setReload((prevReload) => !prevReload);
    });
  };

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
                  {value.status === "pending" && (
                    <button
                      className={styles.btn}
                      onClick={() => statusProcess(value._id)}
                    >
                      Proccess
                    </button>
                  )}
                  {value.status === "processing" && (
                    <button
                      className={styles.btn}
                      onClick={() => statusShipping(value._id)}
                    >
                      Shipping
                    </button>
                  )}
                  {value.status === "shipping" && (
                    <button
                      className={styles.btn}
                      onClick={() => statusDelivered(value._id)}
                    >
                      Delivered
                    </button>
                  )}
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
