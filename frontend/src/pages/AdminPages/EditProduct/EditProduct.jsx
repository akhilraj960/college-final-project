import React, { useEffect, useState } from "react";
import styles from "./EditProduct.module.css";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import axiosInstance from "../../../config/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = (props) => {
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

  const { id } = useParams();

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
      .get("/getbrand")
      .then((response) => {
        setBrands(response.data.brands);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    axiosInstance
      .get("/getcategories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axiosInstance
      .get("/getsubcategories")
      .then((response) => {
        setSubCategories(response.data.subcategories);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });

    axiosInstance.get(`/admin/getoneproduct/` + id).then((response) => {
      console.log(response.data.product);
      setFormData((prevData) => ({
        ...prevData,
        name: response.data.product.name,
        brand: response.data.product.brand,
        category: response.data.product.category,
        subcategory: "",
        description: response.data.product.discription,
        price: response.data.product.price || 0, // Set a default value or null
        discountprice: response.data.product.discountAmount || 0, // Set a default value or null
        stock: response.data.product.stock || 0, // Set a default value or null
      }));
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

    axiosInstance
      .put(`/admin/editproduct/${id}`, formData)
      .then((data) => {
        console.log(data);
        toast.success("Product Updated")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
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
            <Select
              label={"Sub Category"}
              option={subCategories}
              value={subcategory}
              name={"subcategory"}
              onChange={handleChange}
            />
            <Input
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
          <Button type="submit">Edit product</Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
