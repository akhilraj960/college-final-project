import React, { useState } from "react";
import styles from  "./Input.module.css";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Input = ({ type, name, onChange, value, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.textfield}>
      <label>{label ? label : ""}</label>
      <div className={styles.inputcontainer}>
        <input
          name={name}
          value={value}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          onChange={onChange}
        />
        {type === "password" && (
          <div className="icon" onClick={handleTogglePassword}>
            {showPassword ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
