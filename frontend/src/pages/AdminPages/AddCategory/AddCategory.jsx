import React, { useState } from "react";
import styles from "./AddCategory.module.css";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const AddCategory = () => {

    const [category,setCategory] = useState({
        
    })

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
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
            value={name}
            onChange={handleChange}
          />
          <Button>Add Category</Button>
        </div>
        <div className={styles.inputcontainer}>
          <Input
            label={"new  Sub category"}
            name={"name"}
            type={"text"}
            value={name}
            onChange={handleChange}
          />
          <Button>Add Sub Category</Button>
        </div>
      </div>
      <h3>All Categories</h3>
    </div>
  );
};

export default AddCategory;
