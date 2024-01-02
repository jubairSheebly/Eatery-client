import Cover from "../../Shared/Cover/Cover";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useOrdered from "../../../hooks/useOrdered";
import useUser from "../../../hooks/useUser";

const RestaurantItemCart = ({ dataOfRestaurantsInfo }) => {
  const { img, restaurantName, menuName } = dataOfRestaurantsInfo; // this is called destructinng
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useOrdered();

  useEffect(() => {
    if (menuName) {
      setData(menuName);
      setLoading(true);
    }
  }, [menuName]);

  // this is for food json call
  useEffect(() => {
    fetch("https://uiueateryserver.onrender.com/foodItem")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  //  here find the rest name and rest name is the foodCart
  //  if rest name match the food cart then show those item
  const [matchFood, setMatchFood] = useState([]);
  useEffect(() => {
    const restName = foods.filter(
      (matchName) => matchName.restaurantName == restaurantName
    );
    console.log("rest name match", restName);
    setMatchFood(restName);
  }, [foods, restaurantName]);

  // this is for add the item in data base
  const handleAddToCart = (item) => {
    console.log("Id of the food ", item);
    // this find the id
    const addFood = foods.find((food) => food._id == item);
    const quantityValue = quantity[item];
    const totalPrice = parseFloat(
      (quantityValue * parseFloat(addFood?.price)).toFixed(2)
    ); // Calculate and ensure two decimal places

    console.log(addFood);
    console.log(user);
    if (user && user.email) {
      // we will send those data to our data base
      const orderItem = {
        foodId: addFood._id,
        category: addFood.category,
        name: addFood.name,
        price: totalPrice,
        img: addFood.image,
        restaurantName: addFood.restaurantName,
        email: user.email,
        quantity: quantityValue,
      };
      console.log("Order Item ", orderItem);
      fetch("https://uiueateryserver.onrender.com/foodCarts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // this is use for navbar
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Place Login to order the food !",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  // if user is admin or webAdmin this time addToCart is unable
  const [users] = useUser();
  const [userData, setUserData] = useState([]);
  // if user is admin he can not add item to cart
  useEffect(() => {
    const userinfo = users.find((userEmail) => userEmail?.email == user?.email);
    setUserData(userinfo);
  }, [user?.email, users]);

  // this is quantity code
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    if (menuName) {
      setData(menuName);
      setLoading(true);

      // Initialize quantity state with default values
      const initialQuantityState = {};
      menuName.forEach((item) => {
        initialQuantityState[item._id] = 1; // or you can set it to the existing quantity from the data
      });
      setQuantity(initialQuantityState);
    }
  }, [menuName]);
  return (
    <div>
      <Cover img={img} title={"Order Food"} restaurantName={restaurantName} />

      <div className="grid grid-cols-3 gap-5 mt-5">
        {matchFood.map((menuItem) => (
          <div key={menuItem._id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={menuItem.image} alt={menuItem.name} />
            </figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white">
              ${menuItem.price}
            </p>
            <div className="card-body flex flex-col items-center">
              <h2 className="card-title">{menuItem.name}</h2>
              <p>{menuItem.recipe}</p>
              {/* this is to make food as Quantity*/}
              <div className="flex items-center">
                <label htmlFor={`quantity_${menuItem._id}`} className="mr-5">
                  Quantity
                </label>
                <button
                  onClick={() => {
                    if (quantity[menuItem._id] > 1) {
                      setQuantity((prevQuantity) => ({
                        ...prevQuantity,
                        [menuItem._id]: prevQuantity[menuItem._id] - 1,
                      }));
                    }
                  }}
                  className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500"
                >
                  -
                </button>
                <input
                  type="number"
                  id={`quantity_${menuItem._id}`}
                  name={`quantity_${menuItem._id}`}
                  value={quantity[menuItem._id]}
                  readOnly
                  className="w-10 mx-2 text-center"
                />
                <button
                  onClick={() => {
                    setQuantity((prevQuantity) => ({
                      ...prevQuantity,
                      [menuItem._id]: prevQuantity[menuItem._id] + 1,
                    }));
                  }}
                  className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500"
                >
                  +
                </button>
              </div>

              {/* if user is admin unable to add item  */}
              {userData?.role === "admin" || userData?.role === "webAdmin" ? (
                <></>
              ) : (
                <>
                  {" "}
                  <div className="card-actions justify-end">
                    <button
                      // taking the item id new
                      onClick={() => handleAddToCart(menuItem?._id)}
                      className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500"
                    >
                      Add to Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantItemCart;
