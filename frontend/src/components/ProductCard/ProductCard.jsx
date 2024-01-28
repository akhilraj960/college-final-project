import React from "react";
import styles from "./ProductCard.module.css";
import { motion } from "framer-motion";
import { shorttenText } from "../../utils";
const ProductCard = ({ image, title, description, price, discountPrice }) => {
  return (
    <div className={styles.cardcontainer}>
      <motion.img
        className={styles.cardimage}
        src={image}
        alt={title}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.5 },
        }}
      />
      {/* <span>-10%</span> */}
      <div className={styles.cardcontent}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{shorttenText(description, 18)} </p>
        <div className={styles.pricecontainer}>
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
        <button className={styles.btn}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
