import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddItem = () => {
  //  find the user
  //  find the rest name he won
  //  then take the rest name add this to input field
  //  don't make any id
  // add the item to the food item data base
  //  this item u can delete

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const CurrentUserEmail = users.find(
      (userEmail) => userEmail?.email == user?.email
    );
    console.log(CurrentUserEmail?.email);
    setUserInfo(CurrentUserEmail);
  }, [user?.email, users]);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    //  here upload the img
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;
          const { name, price, category, recipe, quantity } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            category,
            recipe,
            restaurantName: userInfo?.restaurantName,
            image: imgUrl,
          };
          console.log(newItem);
          //    send the data to the database
          fetch("https://uiueateryserver.onrender.com/foodItem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item added successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        } else {
          console.log("data not added ");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="ml-10">
        {/*  rest name 1 */}
        <label className="label">
          <span className="label-text text-xl font-semibold">
            {" "}
            Restaurant Name:
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("restaurantName")}
          defaultValue={userInfo?.restaurantName}
          readOnly
        />
        {/* this is item name  */}
        <label className="label">
          <span className="label-text font-bold text-xl">Item Name*</span>
        </label>
        <input
          type="text"
          placeholder="Item Name"
          {...register("name", { required: true })}
          className="input input-bordered w-full "
        />

        {/* this is take the recipe 2  */}
        <label className="label">
          <span className="label-text font-bold text-xl">
            Recipe Information*
          </span>
        </label>
        <input
          type="text"
          placeholder="Recipe Name"
          {...register("recipe", { required: true })}
          className="input input-bordered w-full "
        />

        {/* this is take the category 3*/}
        <label className="label">
          <span className="label-text font-bold text-xl">Category*</span>
        </label>
        <input
          type="text"
          placeholder="category"
          {...register("category", { required: true })}
          className="input input-bordered w-full "
        />
        {/* this take the price  4*/}
        <label className="label">
          <span className="label-text font-bold text-xl">Price*</span>
        </label>
        <input
          type="number"
          placeholder="Give the price of the item"
          {...register("price", { required: true })}
          className="input input-bordered w-full "
        />
        <label className="label">
          <span className="label-text font-bold text-xl">Quantity*</span>
        </label>
        <input
          type="number"
          placeholder="Give the Quantity of the item"
          {...register("quantity", { required: true })}
          className="input input-bordered w-full "
        />

        {/* this is img 5*/}
        <label className="label ">
          <span className="label-text font-bold text-xl">Item Image</span>
        </label>
        <input
          {...register("image")}
          type="file"
          className="file-input file-input-bordered w-full "
        />
        <button
          className="btn bg-green-400 mt-5 label-text font-bold text-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
