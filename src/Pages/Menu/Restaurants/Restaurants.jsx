import { useEffect, useState } from "react";
import RestaurantsCard from "../RestaurantsCard/RestaurantsCard";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("https://uiueateryserver.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);
  return (
    <section className="mb-12">
      <SectionTitle
        heading={"Our Popular Restaurants"}
        subHeading={" UIU Food Code "}
      ></SectionTitle>
      {/* <div className="grid grid-cols-3 gap-5 ">
        {restaurants.map((restaurant) => (
          <RestaurantsCard
            key={restaurant._id}
            restaurant={restaurant} // pass as a props in RestaurantsCard
          ></RestaurantsCard>
        ))}
      </div> */}
      <div className="grid grid-cols-3 gap-5 ">
        {restaurants.map((restaurants) => (
          <div key={restaurants._id}>
            {console.log("Approval Status:", restaurants.approve)}
            {restaurants.approve &&
            restaurants.approve.toLowerCase() === "approve" ? (
              <RestaurantsCard restaurant={restaurants}></RestaurantsCard>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
