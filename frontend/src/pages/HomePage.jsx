import React from "react";
import Category from "../components/Category/Category";
import ProductCard from "../components/ProductCard/ProductCard";

const HomePage = () => {
  return (
    <div>
      <Category />
      <ProductCard
        image={
          "https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
        title={"hello"}
        description={"fdslkafjal;fjakl;jfklasjflaj"}
        price={"20"}
        discountPrice={"10"}
      />
    </div>
  );
};

export default HomePage;
