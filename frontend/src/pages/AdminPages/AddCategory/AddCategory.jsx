import React, { useState } from "react";
import styles from "./AddCategory.module.css";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import axiosInstance from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const addCategory = (e) => {
    e.preventDefault();
    console.log(category);

    axiosInstance
      .post("/admin/addcategory", { category })
      .then((data) => {
        toast.success("New Category Added");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSubCategory = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/admin/addsubcategory", { subCategory })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h3>Categories</h3>
      <div className={styles.categorycontainer}>
        <div className={styles.inputcontainer}>
          <Input
            label={"new category"}
            name={"name"}
            type={"text"}
            value={category.name}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button onClick={addCategory}>Add Category</Button>
        </div>
        {/* <div className={styles.inputcontainer}>
          <Input
            label={"new  Sub category"}
            name={"name"}
            type={"text"}
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <Button onClick={addSubCategory}>Add Sub Category</Button>
        </div> */}
      </div>
    </div>
  );
};

export default AddCategory;
