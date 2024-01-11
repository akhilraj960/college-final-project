import React, { useState } from "react";
import styles from "../FormStyles.module.css";

import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import axiosInstance from "../../../config/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { name, email, password, cPassword } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (name === "" || email === "" || password === "" || cPassword === "") {
      setErrorMessage("Fill all the fields.");
      return;
    }

    if (name.length < 4) {
      setErrorMessage("Name must be 4 letters or greater.");
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

    if (password !== cPassword) {
      setErrorMessage("Password and confirm password do not match.");
      return;
    }

    setErrorMessage(""); 

    try {
      const response = await axiosInstance.post("/register", formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className={styles.formcontainer}>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h2>Sign Up</h2>
          <p>welcome</p>
        </div>
        {errorMessage && <div className={styles.errortext}>{errorMessage}</div>}

        <div className={styles.inputcontainer}>
          <Input
            label={"name"}
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
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
          <Input
            label={"confirm password"}
            name="cPassword"
            type="password"
            value={cPassword}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Submit</Button>
        <span>
          <p>
            Already have an Account. <Link to={"/login"}>Login Now</Link>
          </p>
        </span>
      </form>
    </div>
  );
};

export default Register;
