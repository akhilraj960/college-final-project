import React, { useEffect, useState } from "react";
import styles from "./Styles/Cart.module.css";
import CartCard from "../components/Cart/CartCard";
import axiosInstance from "../config/axiosInstance";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/cart/cartitems").then((response) => {
      console.log(response);
    });
  });

  return (
    <div className={styles.container}>
      <CartCard
        title={"Title"}
        description={
          "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
        }
        price={"1999"}
        image={
          "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
        }
      />
    </div>
  );
};

export default CartPage;
