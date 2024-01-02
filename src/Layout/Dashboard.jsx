import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log("User", user?.email);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isWebAdmin, setIsWebAdmin] = useState(false);
  // const isWebAdmin = true;
  const [users] = useAdmin();

  useEffect(() => {
    // Check if any user has the role of "admin"
    const userInDb = users.find((dbUser) => dbUser?.email === user?.email);
    if (userInDb || null) {
      setIsAdmin(userInDb.role === "admin");
      setIsWebAdmin(userInDb.role === "webAdmin");
    } else {
      setIsAdmin(false);
      // setIsWebAdmin(false);
    }
  }, [user?.email, users]);
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content bg-amber-200">
            {/* this is fro admin */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    {" "}
                    <FaHome></FaHome>Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/restaurantItems">
                    {" "}
                    <FaHome></FaHome>Restaurant Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItem">Add Item </NavLink>
                </li>
              </>
            ) : // this is for webAdmin
            isWebAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/allUsers">
                    <FaUsers></FaUsers>All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/webAdmin">Approve Restaurant</NavLink>
                </li>
              </>
            ) : (
              //  normal user
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaShoppingCart></FaShoppingCart>User Home
                  </NavLink>
                </li>{" "}
                <li>
                  <NavLink to="/dashboard/myCart">
                    <FaShoppingCart></FaShoppingCart>My cart
                  </NavLink>
                </li>{" "}
                <li>
                  <NavLink to="/dashboard/payment">
                    <FaWallet></FaWallet> Payment History
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
