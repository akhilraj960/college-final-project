import React, { useEffect, useState } from "react";
import styles from "./AdminLogin.module.css";

import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { adminLogin } from "../../../redux/features/Auth/authSlice";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "admin@admin",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = formData;

  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  },[isAdmin]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (email === "" || password === "") {
      setErrorMessage("Fill all the fields.");
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessage("Enter a Valid Email");
      return;
    }

    if (!validator.isLength(password, { min: 6 })) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setErrorMessage("");
    dispatch(adminLogin(formData));
    navigate("/admin");
  };
  return (
    <div className={styles.formcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <h2>Admin Login</h2>
          <p>welcome back admin</p>
        </div>
        {errorMessage && <div className={styles.errortext}>{errorMessage}</div>}

        <div className={styles.inputcontainer}>
          <Input
            label={"email"}
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <Input
            label={"password"}
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
