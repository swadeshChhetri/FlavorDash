import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routers = () => {
  return (
    <Routes>
      <Route path="/FlavorDash/" element={<Navigate to="/home" />} />
      <Route path="/FlavorDash/home" element={<Home />} />
      <Route path="/FlavorDash/foods" element={<AllFoods />} />
      <Route path="/FlavorDash/foods/:id" element={<FoodDetails />} />
      <Route path="/FlavorDash/cart" element={<Cart />} />
      <Route path="/FlavorDash/checkout" element={<Checkout />} />
      <Route path="/FlavorDash/login" element={<Login />} />
      <Route path="/FlavorDash/register" element={<Register />} />
      <Route path="/FlavorDash/contact" element={<Contact />} />
    </Routes>
  );
};

export default Routers;