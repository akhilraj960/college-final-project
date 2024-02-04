import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import image1 from "../../assets/image1.png";
import axiosInstance from "../../config/axiosInstance";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/category/activecategories").then((response) => {
      setCategory(response.data.categories);
    });
  }, []);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={1000}
      arrows={false}
      keyBoardControl={true}
      className={styles.container}
    >
      {category?.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <Card name={value.name} id={value._id} />
          </React.Fragment>
        );
      })}
    </Carousel>
  );
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
};

const Card = ({ name, id }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.cardimg}
        src={`http://localhost:5000/public/category-images/${id}.jpg`}
        alt="phone"
      />
      <p>{name}</p>
    </div>
  );
};

export default Category;
