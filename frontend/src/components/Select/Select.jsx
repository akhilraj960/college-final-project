import React, { useState } from "react";
import styles from "./Select.module.css";

const Select = ({ label, option, name, value, onChange }) => {
  console.log(option);
  return (
    <div className={styles.textfield}>
      <label>{label || null}</label>
      <div className={styles.inputcontainer}>
        <select
          className={styles.select}
          value={value}
          name={name}
          onChange={onChange}
        >
          {!option ? (
            <option>select {label}</option>
          ) : (
            <>
              {!value && <option>Select {label}</option>}
              {option.map((value, index) => (
                <option key={index} value={value}>
                  {value.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </div>
  );
};

export default Select;
