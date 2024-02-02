import axios from "axios";

import { baseUrl } from "../../../config/config";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/auth/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const adminLogin = (userData) => {
  return axiosInstance
    .post("/adminlogin", userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const userLogin = (userData) => {
  return axiosInstance
    .post("/login", userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const getStatus = () => {
  return axiosInstance
    .get("/getstatus")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const authServices = {
  userLogin,
  adminLogin,
  getStatus,
};

export default authServices;
