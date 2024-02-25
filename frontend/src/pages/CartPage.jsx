import React, { useEffect, useState } from "react";
import styles from "./Styles/Cart.module.css";
import CartCard from "../components/Cart/CartCard";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axiosInstance.get("/api/cart/cartitems").then(({ data }) => {
      console.log(data);
      setCartItems(data.response);
    });
  }, [reload]);

  const removeHandler = (pid) => {
    axiosInstance.delete(`/api/cart/delete/${pid}`).then((response) => {
      console.log(response.data.success);
      if (response.data.success) {
        toast.success(response.data.message);
        setReload((prevReload) => !prevReload);
      }
    });
  };

  return (
    <div className={styles.container}>
      {cartItems.length !== 0 ? (
        <>
          {cartItems?.map((value, index) => {
            return (
              <CartCard
                key={index}
                title={value.product.title}
                description={value.product.description}
                price={value.product.price}
                image={`http://localhost:5000/public/product-images/${value.product._id}.jpg`}
                id={value._id}
                handleRemove={() => removeHandler(value._id)}
              />
            );
          })}
        </>
      ) : (
        <>
          <p style={{ color: "red", textAlign: "center" }}>Cart is Empty</p>
        </>
      )}
    </div>
  );
};

export default CartPage;
