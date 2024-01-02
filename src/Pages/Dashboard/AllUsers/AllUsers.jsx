import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [menu] = useMenu();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://uiueateryserver.onrender.com/users");
      return res.json();
    },
  });
  // this is to make the user admin
  const handleMakeAdmin = (user) => {
    fetch(`https://uiueateryserver.onrender.com/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `${user.name} is Admin now and add the restaurant Name`,
            showClass: {
              popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
            },
            hideClass: {
              popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
            },
          });
        }
      });
  };

  //   in data base two api is make here i update the user base on his id and add the restaurantName
  const handleRestaurantName = (restaurantName, user) => {
    const updateData = {
      restaurantName: restaurantName,
    };
    fetch(
      `https://uiueateryserver.onrender.com/users/restaurantName/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire(
            `Mr.${user.name} is now admin of the ${restaurantName} restaurant`
          );
        }
      });
  };
  // TODO : Delete the user
  const handleDelete = (user) => {
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
        fetch(`https://uiueateryserver.onrender.com/users/${user._id}`, {
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
    console.log(user);
  };
  return (
    <div>
      <h2 className="text-xl p-20 bg-orange-200 text-center font-semibold">
        This is all users
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Restaurant Won</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-orange-500"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <td>
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">
                      Restaurant Name
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {/* here first i take the rest name and then i take the user send it to the fnc  */}
                      {menu.map((restName) => (
                        <li key={restName._id}>
                          <a
                            key={user._id}
                            onClick={() =>
                              handleRestaurantName(
                                restName.restaurantName,
                                user
                              )
                            }
                          >
                            {restName.restaurantName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
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

export default AllUsers;
