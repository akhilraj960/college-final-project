import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import axiosInstance from "../../../config/axiosInstance";
import { toast } from "react-toastify";
import TextArea from "../../../components/Input/TextArea";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    description: "",
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
    description,
    price,
    discountprice,
    stock,
    image,
  } = formData;

  useEffect(() => {
    axiosInstance
      .get("/api/brand/brands")
      .then((response) => {
        setBrands(response.data.brands);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    axiosInstance
      .get("/api/category/category")
      .then((response) => {
        setCategories(response.data.category);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance
        .post("/api/product/addproduct", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
        });

      // Optionally, you can handle the success here (e.g., show a success message)
      console.log("Product added successfully!");
      toast.success("Product Add");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <div className={styles.inputcontainer}>
          <Input
            label={"Product Name"}
            name={"name"}
            type={"text"}
            value={name}
            onChange={handleChange}
          />
          <div className={styles.inputsubcontainer}>
            <Select
              label={"Brand"}
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
            {/* <Select
              label={"Sub Category"}
              option={subCategories}
              value={subcategory}
              name={"subcategory"}
              onChange={handleChange}
            /> */}
            <TextArea
              label={"Description"}
              type={"text"}
              name={"description"}
              value={description}
              onChange={handleChange}
            />
            <Input
              label={"Price"}
              type={"number"}
              name={"price"}
              value={price}
              onChange={handleChange}
            />
            <Input
              label={"Discount Price"}
              type={"number"}
              name={"discountprice"}
              value={discountprice}
              onChange={handleChange}
            />
            <Input
              label={"Stock"}
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
