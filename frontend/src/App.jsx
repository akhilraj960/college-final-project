import React from "react";
import Head from "./components/Head/Head";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

const App = () => {
  return (
    <>
      <Head />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
