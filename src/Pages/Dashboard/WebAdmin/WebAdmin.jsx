import Swal from "sweetalert2";
import useMenu from "../../../hooks/useMenu";

const WebAdmin = () => {
  const [menu] = useMenu();

  //  hired info send data to backend
  //   TODO : Change the URL
  //  hired info send data to backend
  const handleHire = (applicantId) => {
    fetch(`https://uiueateryserver.onrender.com/menu/approve/${applicantId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire("This Restaurant is Approved");
        } else {
          console.log("all ready modified");
        }
      });
    console.log(applicantId);
  };
  const handleReject = (applicantId) => {
    fetch(`https://uiueateryserver.onrender.com/menu/reject/${applicantId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Are you sure?",
            text: "You reject this Restaurant",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Rejected!",
                text: "This restaurant is rejected.",
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
        {" "}
        This is web admin home page
      </h2>
      <div className="grid grid-cols-2 gap-5 ">
        {menu.map((restaurant) => (
          <div key={restaurant._id}>
            <div>
              <div className="p-5 card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={restaurant.img} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{restaurant.restaurantName}</h2>
                </div>
                <div>
                  <h2 className="card-title">Email : {restaurant?.email}</h2>
                </div>
                <div className="flex justify-between">
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => handleHire(restaurant._id)}
                      className="btn bg-[#abdbe3]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(restaurant._id)}
                      className="btn bg-[#abdbe3]"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebAdmin;
