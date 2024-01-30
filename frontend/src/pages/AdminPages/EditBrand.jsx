import React, { useEffect, useState } from "react";
import styles from "./Styles/NewCategory.module.css";
import Input from "../../components/Input/Input";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import Button from "../../components/Button/Button";

const EditBrand = () => {
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

  useEffect(() => {
    axiosInstance
      .get("/api/brand/onebrand/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching Brand:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/api/brand/updatebrand/" + id, formData)
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className={styles.container}>
      <h3>Edit Brand</h3>

      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <Input
            label={"Brand Name"}
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EditBrand;
