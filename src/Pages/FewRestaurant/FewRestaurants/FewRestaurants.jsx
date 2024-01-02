import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import FewRestaurantCard from "../FewRestautantCard/FewRestaurantCard";

const FewRestaurants = () => {
  const [menu] = useMenu();
  const displayRestaurant = menu.slice(0, 6);
  menu;
  console.log(displayRestaurant);

  return (
    <div>
      <SectionTitle
        heading={"Our Popular Restaurants"}
        subHeading={" UIU Food Code "}
      ></SectionTitle>
      <div className="grid grid-cols-3 gap-5 ">
        {displayRestaurant.map((restaurant) => (
          <div key={restaurant._id}>
            {console.log("Approval Status:", restaurant.approve)}
            {restaurant.approve &&
            restaurant.approve.toLowerCase() === "approve" ? (
              <FewRestaurantCard restaurant={restaurant}></FewRestaurantCard>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FewRestaurants;
