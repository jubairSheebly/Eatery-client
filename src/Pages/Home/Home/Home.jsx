import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Restaurants from "../../Menu/Restaurants/Restaurants";

const Home = () => {
  // it contain all elemnt of home page footer will be added
  return (
    <div>
      <Helmet>
        <title>UIU Eatery | Home</title>
      </Helmet>
      <Banner></Banner>
      <Restaurants></Restaurants>
    </div>
  );
};

export default Home;
