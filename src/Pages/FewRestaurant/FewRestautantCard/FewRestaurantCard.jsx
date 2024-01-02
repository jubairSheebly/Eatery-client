import { Link } from "react-router-dom";

const FewRestaurantCard = ({ restaurant }) => {
  const { restaurantName, img, _id } = restaurant;
  return (
    <div>
      <Link to={`/restaurantItem/${_id}`}>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={img} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{restaurantName}</h2>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FewRestaurantCard;
