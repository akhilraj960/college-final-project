import React, { useEffect, useState } from "react";
import styles from "./Styles/NewCategory.module.css";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import axiosInstance from "../../config/axiosInstance";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import TextArea from "../../components/Input/TextArea";
const EditCategory = () => {
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: null,
  });

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    axiosInstance
      .get("/api/category/onecategory/" + id)
      .then(({ data }) => {
        console.log(data.category);

        setFormData((prevData) => ({
          ...prevData,
          id: data.category._id,
          name: data.category.name,
          description: data.category.description,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { name, description, image, categoryId } = formData;

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
      .put("/api/category/updatecategory/" + id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        toast.success("Category Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h3>Edit Category</h3>

      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
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
          <img
            style={{ width: "75px", height: "auto" }}
            src={`http://localhost:5000/public/category-images/${id}.jpg`}
            alt={`Product ${id}`}
          />
          <Input
            label={"Image"}
            type={"file"}
            name={"image"}
            onChange={handleChange}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EditCategory;
