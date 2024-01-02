import { useContext, useEffect, useState } from "react";
import useMenu from "../../../hooks/useMenu";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const RestaurantItems = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [wonRestName, setWonRestName] = useState([]);
  const [menu, refetch] = useMenu();
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [foods, setFoods] = useState([]);
  const [showItem, setShowItem] = useState([]);

  //  this is for who is the current user and find the email then the restaurant he won
  useEffect(() => {
    const userData = users.find((userEmail) => userEmail?.email == user?.email);
    setCurrentUser(userData);
  }, [user?.email, users]);
  //    find the restaurant he won
  useEffect(() => {
    const wonRestaurant = menu.find(
      (restName) => restName?.restaurantName == currentUser?.restaurantName
    );
    setWonRestName(wonRestaurant);
  }, [currentUser?.restaurantName, menu]);

  // //we find the rest name in WonRestName then base on that show the item and it's easy to delete the item database
  useEffect(() => {
    fetch("https://uiueateryserver.onrender.com/foodItem")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  useEffect(() => {
    const itemsOfRest = foods.filter(
      (itemOfTheRest) =>
        itemOfTheRest?.restaurantName === wonRestName?.restaurantName
    );
    console.log(itemsOfRest);
    setShowItem(itemsOfRest);
  }, [foods, wonRestName?.restaurantName]);

  // delete an item from fooditem Collection
  const handleDeleteMenuItem = (itemId) => {
    console.log(itemId);
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
        fetch(`https://uiueateryserver.onrender.com/fooditem/${itemId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              console.log(data);
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
      <h2 className="text-xl p-20 bg-orange-200 text-center font-semibold">
        This is all {currentUser?.restaurantName} item
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>category</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {showItem.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDeleteMenuItem(item._id)}
                    className="btn btn-ghost bg-red-500"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantItems;
