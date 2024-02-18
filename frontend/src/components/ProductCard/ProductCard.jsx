import React from "react";
import styles from "./ProductCard.module.css";
import { motion } from "framer-motion";
import { shorttenText } from "../../utils";
import axiosInstance from "../../config/axiosInstance";
const ProductCard = ({
  image,
  title,
  description,
  price,
  discountPrice,
  id,
}) => {
  const handleAddToCart = (e) => {
    axiosInstance.post(`/api/cart/${id}`).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className={styles.cardContainer}>
      <motion.img
        className={styles.cardImage}
        src={image}
        alt={title}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1,
          transition: { duration: 0.5 },
        }}
      />
      {/* <span>-10%</span> */}
      <div className={styles.cardContent}>
        <div className={styles.priceContainer}>
          {discountPrice ? (
            <>
              <p className={styles.price}>
                <s>${price}</s>
              </p>
              <p className={styles.discountprice}>{discountPrice}</p>
            </>
          ) : (
            <p className={styles.price}>{price}</p>
          )}
        </div>
        <p className={styles.title}>{shorttenText(title, 18)}</p>
        <p className={styles.description}>{shorttenText(description, 18)} </p>

        <div className={styles.btngroup}>
          <button className={styles.buybtn}>Buy Now</button>
          <button onClick={handleAddToCart} className={styles.btn}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
