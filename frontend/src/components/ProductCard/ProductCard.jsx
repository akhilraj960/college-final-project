import React from "react";
import styles from "./ProductCard.module.css";
import { motion } from "framer-motion";
import { shorttenText } from "../../utils";
import axiosInstance from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const ProductCard = ({
  image,
  title,
  description,
  price,
  discountPrice,
  id,
}) => {
  const handleAddToCart = () => {
    axiosInstance.post(`/api/cart/${id}`).then((response) => {
      console.log(response);
    });
  };

  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!isLoggedIn) {
      toast.error("Login Please");
      return navigate("/login");
    }

    navigate(`/buy/${title}/${description}/${price}/${discountPrice}/${id}`);
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
          <button className={styles.buybtn} onClick={handleNavigate}>
            Buy Now
          </button>
          <button onClick={handleAddToCart} className={styles.btn}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
