import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import useOrdered from "../../../hooks/useOrdered";
import useMenu from "../../../hooks/useMenu";
const NavBar = () => {
  // for login logout
  const { user, logOut } = useContext(AuthContext);
  const [users] = useUser();
  // all food
  const [foodCarts] = useOrdered();
  const [orderedFood, setOrderedFood] = useState([]);
  const [menu, refetch, isPending] = useMenu();

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // test
  const [userData, setUserData] = useState([]);

  // this is to find the user
  useEffect(() => {
    const userInfo = users.find(
      (userEmail) => userEmail?.email === user?.email
    );
    // console.log("present user info", userInfo);
    setUserData(userInfo);
  }, []);
  // this see his ordered food
  useEffect(() => {
    const userFood = foodCarts.filter(
      (oderEmail) => oderEmail?.email == user?.email
    );
    // console.log(userFood);
    // console.log("Cart length", userFood.length);
    refetch();
    setOrderedFood(userFood);
  }, [foodCarts, user?.email, refetch]);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert(`${user?.email} LogOut`);
      })
      .catch((error) => alert(error));
  };
  //  end
  const navPotion = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Restaurant </Link>
      </li>

      {user ? (
        <>
          <li>
            <Link to="/dashboard/myCart">
              <FaShoppingCart className="text-orange-500 text-xl"></FaShoppingCart>{" "}
              <div className="badge text-xl">+{orderedFood?.length || 0}</div>
            </Link>
          </li>
        </>
      ) : (
        <></>
      )}
      {userData?.role !== "webAdmin" && userData?.role !== "admin" && user && (
        // TODO :if user is not there remove it
        <li>
          <Link to="/makeARestaurant">Make a Restaurant</Link>
        </li>
      )}

      {/* {user ? (
        <>
          <button onClick={handleLogOut} className="btn btn-ghost">
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )} */}
    </>
  );

  // // implement search
  const [menuData, setMenuData] = useState([]); // set the item data form data base
  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    fetch("https://uiueateryserver.onrender.com/fooditem")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);
  const handleSearch = (event) => {
    const searchFood = event.target.value;

    if (searchFood) {
      const filtered = menuData.filter(
        (item) => item?.category?.toUpperCase() === searchFood.toUpperCase()
      );
      setFilteredItem(filtered);
      console.log("info the search item ", filteredItem.length);
    } else {
      setFilteredItem([]);
    }
  };

  const handleMouseEnter = async (restaurantName) => {
    const restId = menuDataID.find(
      (findRestName) => findRestName.restaurantName === restaurantName
    );
    await setRestName(restId);
  };
  // TODO : face the undefine of the restaurant._id
  const [menuDataID, setMenuDataID] = useState([]);
  const [restName, setRestName] = useState([]);
  useEffect(() => {
    fetch("https://uiueateryserver.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => setMenuDataID(data));
  }, []);
  const handleRestName = async (rName) => {
    const restId = menuDataID.find(
      (findRestName) => findRestName.restaurantName == rName
    );
    // setRestName and let the useEffect handle the logging
    await setRestName(restId);
    console.log(restId._id);
  };

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 bg-slate-900 text-white max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {/* for small device (dropdown-content)*/}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              {navPotion}
            </ul>
          </div>
          <img src={logo} alt="" />
        </div>
        {/* laptop view */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navPotion}</ul>
        </div>
        {/* implement the new search field  */}
        {isHomePage && (
          <div>
            <div>
              <input
                className="input input-bordered w-24 md:w-auto text-black"
                type="text"
                onBlur={handleSearch}
                placeholder="Search by category"
              />
            </div>
            {/* show search item model  */}
            <label htmlFor="my_modal_6" className="btn btn-sm">
              Search
            </label>
          </div>
        )}

        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className="grid grid-cols-2 gap-5">
              {filteredItem.length > 0 ? (
                filteredItem.map((item) => (
                  <div key={item._id}>
                    <p className=" text-amber-500 text-xl">
                      {item.restaurantName}
                    </p>
                    <p className=" text-black">{item.name}</p>

                    <p className="text-black">Price: {item.price}$</p>

                    {/* take the rest name and this rest id  */}
                    <Link
                      to={restName ? `/restaurantItem/${restName._id}` : "#"}
                      onMouseEnter={() => handleMouseEnter(item.restaurantName)}
                      onMouseLeave={() => setRestName(null)} // Reset restName on mouse leave
                      onClick={() => handleRestName(item.restaurantName)}
                    >
                      <div className="btn bg-black p-2 text-white">
                        Go to Order
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-red-500 ">No items found.</p>
              )}
            </div>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn bg-orange-500">
                Close
              </label>
            </div>
          </div>
        </div>
        {user ? (
          <>
            <button onClick={handleLogOut} className="btn btn-ghost">
              LogOut
            </button>
          </>
        ) : (
          <>
            <li className="navbar-end">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {/* TODO : when user login then do it  */}
        <div className="mr-2 ml-2 avatar placeholder">
          <div className="bg-orange-400 text-neutral-content rounded-full w-12">
            <span className="text-black">{user?.displayName}</span>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
