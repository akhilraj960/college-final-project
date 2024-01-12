import React from "react";
import styles from "./Select.module.css";

const Select = ({ label, option = [], name, value, onChange }) => {
  return (
    <div className={styles.textfield}>
      <label>{label}</label>
      <div className={styles.inputcontainer}>
        <select
          className={styles.select}
          value={value}
          name={name}
          onChange={onChange}
        >
          {value === "" && <option>{`Select ${label}`}</option>}
          {option.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
