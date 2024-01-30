import React, { useState } from "react";
import styles from "./Styles/NewCategory.module.css";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";

const EditCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const { id } = useParams();

  console.log(id);

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
  };

  return (
    <div className={styles.container}>
      <h3>Edit Category</h3>

      <form>
        <div className={styles.container}>
          <Input
            label={"Category Name"}
            name={"name"}
            type={"text"}
            value={name}
            onChange={handleChange}
          />
          <Input
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
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
