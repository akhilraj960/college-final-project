import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import Input from "../../components/Input/Input";
import styles from "./Styles/NewCategory.module.css";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import TextArea from "../../components/Input/TextArea";
const NewCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const { name, description, image } = formData;

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
      .post("/api/category/addcategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success) {
          toast.success(response.data.message);
        }
      });
  };

  return (
    <div className={styles.container}>
      <h3>New Category</h3>
      <form onSubmit={handleSubmit}>
        <Input
          label={"Category Name"}
          name={"name"}
          type={"text"}
          value={name}
          onChange={handleChange}
        />
        <TextArea
          label={"Category description"}
          name={"description"}
          type={"text"}
          value={description}
          onChange={handleChange}
        />
        <Input
          label={"Image"}
          type={"file"}
          name={"image"}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default NewCategory;
