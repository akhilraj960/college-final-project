import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import axiosInstance from "../../../config/axiosInstance";

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

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

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

  useEffect(() => {
    axiosInstance
      .get("/getbrand")
      .then((response) => {
        setBrands(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosInstance
      .get("/getcategories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosInstance.get("/getsubcategories").then((response) => {
      setSubCategories(response.data.subcategories);
    });
  }, []);

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
              option={brands}
              value={brand}
              name={"brand"}
              onChange={handleChange}
            />
            <Select
              label={"Category"}
              option={categories}
              value={category}
              name={"category"}
              onChange={handleChange}
            />
            <Select
              label={"Sub Category"}
              option={subCategories}
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
