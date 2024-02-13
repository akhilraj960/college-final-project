import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./pages/AdminPages/AdminLogin/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./pages/AdminPages/AddProduct/AddProduct";
import EditProduct from "./pages/AdminPages/EditProduct/EditProduct";
import { getStatus } from "./redux/features/Auth/authSlice";
import AdminLayout from "./pages/AdminPages/Layouts/AdminLayout";
import ProductLayout from "./pages/AdminPages/Layouts/ProductLayout";
import AdminProduct from "./pages/AdminPages/AdminProduct";
import CategoryLayout from "./pages/AdminPages/Layouts/CategoryLayout";
import Category from "./pages/AdminPages/Category";
import AdminDashBoard from "./pages/AdminPages/AdminDashBoard";
import UserLayout from "./pages/AdminPages/Layouts/UserLayout";
import AdminUser from "./pages/AdminPages/AdminUser";
import NewCategory from "./pages/AdminPages/NewCategory";
import AdminOrder from "./pages/AdminPages/AdminOrder";
import BrandLayout from "./pages/AdminPages/Layouts/BrandLayout";
import Brands from "./pages/AdminPages/Brands";
import NewBrand from "./pages/AdminPages/NewBrand";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import MainLayout from "./pages/Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import EditCategory from "./pages/AdminPages/EditCategory";
import EditBrand from "./pages/AdminPages/EditBrand";
import CartPage from "./pages/CartPage";

const App = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getStatus());
    }
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* -------------------------------*/}
        {/* ADMIN ROUTES CONTAINER STARTS  */}
        {/* -------------------------------*/}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminDashBoard />} />
          <Route path="orders" element={<AdminOrder />} />

          {/* PRODUCT ROUTES STARTS  */}

          <Route path="product" element={<ProductLayout />}>
            <Route path="" element={<AdminProduct />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct/:id" element={<EditProduct />} />
          </Route>

          {/* PRODUCT ROUTES ENDS  */}

          {/* CATEGORY ROUTES STARTS */}

          <Route path="category" element={<CategoryLayout />}>
            <Route path="" element={<Category />} />
            <Route path="addcategory" element={<NewCategory />} />
            <Route path="editcategory/:id" element={<EditCategory />} />
          </Route>

          {/* CATEGORY ROUTES ENDS */}

          {/* USER ROUTES STARTS  */}

          <Route path="users" element={<UserLayout />}>
            <Route path="" element={<AdminUser />} />
          </Route>

          {/* USER ROUTES ENDS  */}

          {/* BRAND ROUTES STARTS  */}

          <Route path="brand" element={<BrandLayout />}>
            <Route path="" element={<Brands />} />
            <Route path="newbrand" element={<NewBrand />} />
            <Route path="editbrand/:id" element={<EditBrand />} />
          </Route>

          {/* BRAND ROUTES ENDS  */}
        </Route>

        {/* -------------------------------*/}
        {/* ADMIN ROUTES CONTAINER ENDS  */}
        {/* -------------------------------*/}
      </Routes>
      <ToastContainer
        position="bottom-right"
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
