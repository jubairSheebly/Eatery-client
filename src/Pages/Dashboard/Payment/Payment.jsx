import { useContext, useEffect, useState } from "react";
import useOrdered from "../../../hooks/useOrdered";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import bkash from "../../../assets/icon/Bkash-logo.png";
const Payment = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();

  const [foodCarts, refetch] = useOrdered();
  const [orderedFood, setOrderedFood] = useState([]);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const userInfo = users.find(
      (userEmail) => userEmail?.email === user?.email
    );
    console.log("present user info", userInfo);
    setUserData(userInfo);
  }, []);

  useEffect(() => {
    const userFood = foodCarts.filter(
      (oderEmail) => oderEmail?.email == user?.email
    );
    console.log(userFood);
    console.log("Cart length", userFood.length);
    setOrderedFood(userFood);
  }, [foodCarts, user?.email]);
  const total = orderedFood.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  //  TODO : update the foodCarts add this is payment done
  //  in this collection payment is not done then show them to the user
  const handlePay = (userData) => {
    fetch(
      `https://uiueateryserver.onrender.com/foodCarts/paymentDone?email=${userData?.email}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          console.log(data.modifiedCount);
          Swal.fire(`Total ${total} Payment Done `);
        }
      });
  };
  refetch();
  return (
    <div className="ml-5">
      <h2 className="p-20 text-center text-xl font-bold bg-orange-300">
        I want to Pay
      </h2>
      {/* we will show those un paid items  */}
      <div className="mt-5 text-xl font-semibold">
        <p>Total Food you ordered : {orderedFood.length}</p>
        <p>Price : {price}</p>
      </div>
      <button
        className=" mt-2"
        onClick={() => handlePay(userData)}
        disabled={orderedFood.length === 0}
      >
        <img className="w-28" src={bkash} alt="" />
      </button>{" "}
    </div>
  );
};

export default Payment;
