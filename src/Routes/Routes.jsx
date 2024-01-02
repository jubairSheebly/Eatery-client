import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Restaurants from "../Pages/Menu/Restaurants/Restaurants";
import RestaurantItem from "../Pages/RestaurantItem/Restauranitem/RestaurantItem";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/Allusers/Allusers";
import Payment from "../Pages/Dashboard/Payment/Payment";
import MakeRestaurant from "../Pages/MakeRestaurant/MakeRestaurant";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import WebAdmin from "../Pages/Dashboard/WebAdmin/WebAdmin";
import FewRestaurants from "../Pages/FewRestaurant/FewRestaurants/FewRestaurants";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import RestaurantItems from "../Pages/Dashboard/RestaurantItems/RestaurantItems";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Restaurants></Restaurants>,
      },
      {
        path: "/fewRestaurant",
        element: <FewRestaurants></FewRestaurants>,
      },
      {
        path: "/restaurantItem/:id", // dinmic route
        element: <RestaurantItem></RestaurantItem>,
        loader: () => fetch("https://uiueateryserver.onrender.com/menu"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/makeARestaurant",
        element: <MakeRestaurant></MakeRestaurant>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,

    children: [
      {
        path: "allusers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "myCart",
        element: <MyCart></MyCart>,
      },
      {
        path: "payment", // this is for pay btn
        element: <Payment></Payment>,
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "webAdmin",
        element: <WebAdmin></WebAdmin>,
      },
      {
        path: "restaurantItems",
        element: <RestaurantItems></RestaurantItems>,
      },
      {
        path: "addItem",
        element: <AddItem></AddItem>,
      },
    ],
  },
]);
