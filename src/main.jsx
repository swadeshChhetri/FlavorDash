import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AllFoods from "./pages/AllFoods";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path: "/FlavorDash/",
    element: <App/>,
    children: [
      { index: true, element : <Home/> },
      {
        path: "/FlavorDash/foods",
        element: <AllFoods />,
      },
      {
        path: "/FlavorDash/foods/:id",
        element: <FoodDetails />,
      },
      {
        path: "/FlavorDash/cart",
        element: <Cart />,
      },
      {
        path: "/FlavorDash/checkout",
        element: <Checkout />,
      },
      {
        path: "/FlavorDash/login",
        element: <Login />,
      },
      {
        path: "/FlavorDash/register",
        element: <Register />,
      },
      {
        path: "/FlavorDash/contact",
        element: <Contact />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);