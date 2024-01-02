import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import useOrdered from "../../../hooks/useOrdered";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
//  for normal user
const MyCart = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  // all food
  const [foodCarts, refetch] = useOrdered();
  const [orderedFood, setOrderedFood] = useState([]);
  // find the user info
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const userInfo = users.find(
      (userEmail) => userEmail?.email === user?.email
    );
    console.log("present user info", userInfo);
    setUserData(userInfo);
  }, []);
  // here find the user email
  console.log("email of user ", userData?.email);

  // this see his ordered food
  useEffect(() => {
    const userFood = foodCarts.filter(
      (oderEmail) => oderEmail?.email == user?.email
    );
    console.log(userFood);
    console.log("Cart length", userFood.length);
    setOrderedFood(userFood);
  }, [foodCarts, user?.email]);
  const total = orderedFood.reduce((sum, item) => item.price + sum, 0);
  const handelDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://uiueateryserver.onrender.com/foodCarts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="uppercase font-bold flex justify-evenly items-center h-[60px] ">
        <h2>this is my cart{orderedFood.length} </h2>

        <p>total Price : BDT {total}</p>
        <Link to="/dashboard/payment">
          <button className="btn btn-warning">PAY</button>
        </Link>
      </div>

      {/* table part  */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label># </label>
              </th>
              <th>Food Image</th>
              <th>Food Name</th>
              <th>Price </th>
              <th>Action</th>
              {/* <th>Pay</th> */}
            </tr>
          </thead>
          <tbody>
            {orderedFood.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar items-center">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                      <h1 className="text-sm ">{item.restaurantName}</h1>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>BDT {item.price}</td>
                <th>
                  <button
                    onClick={() => handelDelete(item)}
                    className="btn btn-ghost btn-xs  bg-[#facf41] text-gray-500"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
                {/* <td>pay</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
