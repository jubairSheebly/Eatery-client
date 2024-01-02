import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import useOrdered from "../../../hooks/useOrdered";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [userInfo, setUserInfo] = useState([]);
  const [foodCart, refetch] = useOrdered();
  const [orderedFoods, setOrderedFoods] = useState([]);
  //   find the email is email match then show the info
  useEffect(() => {
    const userData = users.find((userEmail) => userEmail?.email == user?.email);
    setUserInfo(userData);
  }, [user?.email, users]);
  // email of user in userInfo

  //   show all food which user ordered
  useEffect(() => {
    const orderTake = foodCart.filter(
      (userRestaurantName) =>
        userRestaurantName?.restaurantName == userInfo?.restaurantName
    );
    setOrderedFoods(orderTake);
  }, [foodCart, userInfo?.restaurantName]);
  refetch();
  return (
    <div className="ml-5">
      <h2 className="text-2xl font-bold bg-orange-300 p-20 text-center">
        Admin Home
      </h2>
      <div className="mt-5">
        <p className="text-xl">
          <span className="font-semibold">Name :</span> {userInfo?.name}
        </p>
        <p className="text-xl">
          <span className="font-semibold">Email :</span> {userInfo?.email}
        </p>
        <p className="font-semibold text-xl">
          <u> {userInfo?.role?.toUpperCase()}</u> of the Restaurant{" "}
          <u>{userInfo?.restaurantName}</u>
        </p>
      </div>

      <div className="mt-5  grid grid-cols-2 gap-5 ">
        {orderedFoods.map((orderedFood) => (
          <div
            key={orderedFood._id}
            className="bg-green-400 p-5 text-xl font-semibold  "
          >
            <p>Food name : {orderedFood.name}</p>
            <p>Person ordered : {orderedFood.email}</p>
            <p>Price: {orderedFood.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
