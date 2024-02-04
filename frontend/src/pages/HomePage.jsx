import React, { useEffect, useState } from "react";
import Category from "../components/Category/Category";
import ProductCard from "../components/ProductCard/ProductCard";
import axiosInstance from "../config/axiosInstance";
import styles from "./Styles/HomePage.module.css";
const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/product/activeproducts").then(({ data }) => {
      setProducts(data.products);
    });
  }, []);

  console.log(products[0]);

  return (
    <div>
      <Category />
      <div className={styles.productcontainer}>
        {products?.map((value, index) => {
          return (
            <ProductCard
              key={value._id}
              image={`http://localhost:5000/public/product-images/${value._id}.jpg`}
              title={value.name}
              description={value.description}
              price={value.price}
              discountPrice={value.discountAmount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
