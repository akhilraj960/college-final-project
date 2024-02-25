import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import styles from "./Styles/Order.module.css";
import { toast } from "react-toastify";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axiosInstance.get("/api/order/userorders").then((data) => {
      console.log(data.data.data);
      setOrders(data.data.data);
    });
  }, [reload]);

  const statusDelivered = (id) => {
    axiosInstance.put(`/api/order/statusdelivered/${id}`).then((data) => {
      setReload((prevReload) => !prevReload);
      toast.success("Order Cancelled");
    });
  };

  if (orders.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
        No orders{" "}
      </p>
    );
  }

  return (
    <div className={styles.container}>
      {orders.map((value, index) => {
        return (
          <div key={index} className={styles.cardcontainer}>
            <div className={styles.firstsection}>
              <img
                src={`http://localhost:5000/public/product-images/${value.product._id}.jpg`}
                alt=""
              />

              <button
                onClick={() => statusDelivered(value._id)}
                className={styles.cancelbtn}
              >
                Cancel Order
              </button>
            </div>
            <div className={styles.content}>
              <div>
                <h2>{value.product.name}</h2>
                <p>price : {value.product.price} Rs</p>
                <p>{value.product.description}</p>
              </div>
              <p>Delivery Status : {value.status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
