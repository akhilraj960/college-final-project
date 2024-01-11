import axiosInstance from "../../../config/axiosInstance";

const login = (userData) => {
  return axiosInstance
    .post("/login", userData)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const authServices = {
  login,
};

export default authServices;
