import React from "react";
import styles from "./CartCard.module.css";
import axiosInstance from "../../config/axiosInstance";

const CartCard = ({ price, title, description, image, handleRemove }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>Price: {price}</p>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartCard;
