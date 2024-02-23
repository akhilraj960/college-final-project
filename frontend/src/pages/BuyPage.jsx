import React, { useCallback, useEffect, useState } from "react";
import styles from "./Styles/BuyPage.module.css";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-toastify";
import {
  useNavigate,
  useParams,
} from "react-router-dom/dist/umd/react-router-dom.development";

const BuyPage = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zipcode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/api/auth/profile").then(({ data }) => {
      setFormData((prev) => ({
        ...prev,
        phone: data.data.phone,
        address1: data.data.address[0].address1,
        address2: data.data.address[0].address2,
        zipcode: data.data.address[0].zipcode,
        city: data.data.address[0].city,
      }));
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.put("/api/user/update", formData).then(({ data }) => {
      if (data.success === true) {
        axiosInstance.post(`/api/order/${id}`).then(({ data }) => {
          console.log(data);
          if ((data.success = true)) {
            toast.success(data.message);
            navigate("/cart");
          }
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label={"phone"}
          type="number"
          name={"phone"}
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          label={"Address 1"}
          name={"address1"}
          value={formData.address1}
          onChange={handleChange}
        />
        <Input
          label={"Address 2"}
          name={"address2"}
          value={formData.address2}
          onChange={handleChange}
        />
        <Input
          label={"city"}
          name={"city"}
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          label={"zipcode"}
          type="number"
          name={"zipcode"}
          value={formData.zipcode}
          onChange={handleChange}
        />
        <Button type={"submit"}>Place Order</Button>
      </form>
    </div>
  );
};

export default BuyPage;
