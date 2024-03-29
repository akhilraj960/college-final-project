import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./FormStyles.module.css";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/Auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = formData;

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

    dispatch(userLogin(formData));
  };

  return (
    <div className={styles.formcontainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>
          <h2>Sign In</h2>
          <p>welcome</p>
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
        <Button type="submit">Sign In</Button>
        <span>
          <p>
            Don't have an Account? <Link to={"/register"}>Register Now</Link>
          </p>
        </span>
      </form>
    </div>
  );
};

export default Login;
