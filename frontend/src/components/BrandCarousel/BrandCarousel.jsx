import React, { useEffect, useState } from "react";
import stlyes from "./BrandCarousel.module.css";
import Carousel from "react-multi-carousel";
import axiosInstance from "../../config/axiosInstance";
import BrandCard from "./BrandCard";

const BrandCarousel = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axiosInstance("/api/brand/activebrands").then(({ data }) => {
      console.log(data.brands[0]);
      setBrands(data.brands);
    });
  }, []);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={1000}
      arrows={false}
      keyBoardControl={true}
      className={stlyes.container}
    >
      <div className={stlyes.cardcontainer}>

      {brands?.map((value, index) => (
        <BrandCard key={index}
        image={`http://localhost:5000/public/brand-images/${value._id}.jpg`}

          title={value.name}
        />
      ))}
      </div>

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

export default BrandCarousel;
