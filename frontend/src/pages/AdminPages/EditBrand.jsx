import React, { useEffect, useState } from "react";
import styles from "./Styles/NewCategory.module.css";
import Input from "../../components/Input/Input";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import TextArea from "../../components/Input/TextArea";

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
      .then(({ data }) => {
        console.log(data);

        setFormData((prevData) => ({
          ...prevData,
          id: data.brand._id,
          name: data.brand.name,
          description: data.brand.description,
        }));
      })
      .catch((error) => {
        console.error("Error fetching Brand:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put("/api/brand/updatebrand/" + id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        toast.success("Brad Updated");
      })
      .catch((error) => {
        console.log(error);
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
          <TextArea
            label={"description"}
            name={"description"}
            type={"text"}
            value={description}
            onChange={handleChange}
          />

          <img
            style={{ width: "75px", height: "auto" }}
            src={`http://localhost:5000/public/brand-images/${id}.jpg`}
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

export default EditBrand;
