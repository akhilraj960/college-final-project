import React from "react";
import styles from "./CartCard.module.css";
import axiosInstance from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const CartCard = ({
  price,
  title,
  description,
  discountPrice,
  image,
  id,
  handleRemove,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/buy/${title}/${description}/${price}/${id}`);
  };
  return (
    <div className={styles.container}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>Price: {price}</p>
      </div>
      <div className={styles.btngroup}>
        <button className={styles.buybtn} onClick={handleNavigate}>
          Buy Now
        </button>
        <button className={styles.btn} onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
