import React from "react";
import styles from "./Input.module.css";

const TextArea = ({ name, onChange, value, label }) => {
  return (
    <div className={styles.textfield}>
      <label>{label ? label : ""}</label>
      <div className={styles.inputcontainer}>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextArea;
