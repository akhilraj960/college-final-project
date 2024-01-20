import React, { useEffect } from "react";
import Head from "./components/Head/Head";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import AdminLogin from "./pages/AdminPages/AdminLogin/AdminLogin";
import AdminLayout from "./pages/AdminPages/AdminLayout/AdminLayout";
import AdminDashBoard from "./pages/AdminPages/AdminDashBoard/AdminDashBoard";
import AdminUser from "./pages/AdminPages/AdminUsers/AdminUser";
import { useDispatch, useSelector } from "react-redux";
import { getStatus } from "./redux/features/Auth/authSlice";
import ProductLayout from "./pages/AdminPages/ProductLayout/ProductLayout";
import AdminOrder from "./pages/AdminPages/AdminOrder/AdminOrder";
import AdminProduct from "./pages/AdminPages/AdminProduct/AdminProduct";
import AddProduct from "./pages/AdminPages/AddProduct/AddProduct";
import AddCategory from "./pages/AdminPages/AddCategory/AddCategory";
import NewBrand from "./pages/AdminPages/NewBrand/NewBrand";
import EditProduct from "./pages/AdminPages/EditProduct/EditProduct";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  const { isAdmin, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatus());
  }, []);

  return (
    <>
      <Head />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminDashBoard />} />
          <Route path="users" element={<AdminUser />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="product" element={<ProductLayout />}>
            <Route path="" element={<AdminProduct />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="createbrand" element={<NewBrand />} />
            <Route path="editproduct/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default App;
