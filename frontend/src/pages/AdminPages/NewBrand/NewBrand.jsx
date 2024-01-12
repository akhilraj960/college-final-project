import React, { useState } from "react";
import styles from "./NewBrand.module.css";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import axiosInstance from "../../../config/axiosInstance";

const NewBrand = () => {
  const [brand, setBrand] = useState("");

  const addBrand = (e) => {
    e.preventDefault();


    axiosInstance
      .post("/admin/createbrand", { brand })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Create new brand</h2>
      <div className={styles.inputcontainer}>
        <Input
          label={"create new brand"}
          type={"text"}
          value={brand}
          name={"brand"}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Button onClick={addBrand}>Create new Brand</Button>
      </div>
    </div>
  );
};

export default NewBrand;
