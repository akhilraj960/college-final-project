import React from "react";
import styles from "./BrandCard.module.css";
import { motion } from "framer-motion";

const BrandCard = ({ image, title }) => {
  return (
    <div className={styles.container}>
      <motion.img
      className={styles.image}
        src={image}
        alt={title}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: .8 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1,
          transition: { duration: 0.5 },
        }}
      />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default BrandCard;
