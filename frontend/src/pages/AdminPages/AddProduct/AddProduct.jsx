import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    discription: "",
    price: "",
    discountprice: "",
    stock: "",
    image: null,
  });

  const {
    name,
    brand,
    category,
    subcategory,
    discountprice,
    discription,
    price,
    stock,
  } = formData;

  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <div className={styles.inputcontainer}>
          <Input
            label={"product name"}
            name={"name"}
            type={"text"}
            value={name}
            onChange={handleChange}
          />

          <div className={styles.inputsubcontainer}>
            <Select
              label={"brand"}
              option={users}
              value={brand}
              name={"brand"}
              onChange={handleChange}
            />
            <Select
              label={"Category"}
              option={users}
              value={category}
              name={"category"}
              onChange={handleChange}
            />
            <Select
              label={"Sub Category"}
              option={users}
              value={subcategory}
              name={"subcategory"}
              onChange={handleChange}
            />
            <Input
              label={"discription"}
              type={"text"}
              name={"discription"}
              value={discription}
              onChange={handleChange}
            />
            <Input
              label={"price"}
              type={"number"}
              name={"price"}
              value={price}
              onChange={handleChange}
            />
            <Input
              label={"discount price"}
              type={"number"}
              name={"discountprice"}
              value={discountprice}
              onChange={handleChange}
            />
            <Input
              label={"stock"}
              type={"number"}
              name={"stock"}
              value={stock}
              onChange={handleChange}
            />
            <Input
              label={"Image"}
              type={"file"}
              name={"image"}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
