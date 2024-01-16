import React from "react";
import axiosInstance from "../../../config/axiosInstance";

const AdminUser = () => {
  axiosInstance.get("/admin/getallusers").then((data) => {
    console.log(data);
  });

  return <div>AdminUser</div>;
};

export default AdminUser;
