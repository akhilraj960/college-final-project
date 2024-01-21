import axiosInstance from "../../../config/axiosInstance";

const login = (userData) => {
  return axiosInstance
    .post("/login", userData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const adminLogin = (userData) => {
  return axiosInstance
    .post("/admin/login", userData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

const getStatus = (userData) => {
  return axiosInstance
    .get("/getstatus")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const authServices = {
  login,
  adminLogin,
  getStatus,
};

export default authServices;
