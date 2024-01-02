import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const useCart = () => {
  const { user } = useContext(AuthContext);

  // take the token form local Storage
  // const token = localStorage.getItem("access-token");
  //   the use of tanstackQ

  const {
    isPending,
    data: foodCart = [],
    refetch,
  } = useQuery({
    // this qurey key depend on two value  first is our Api name 2nd is user email
    queryKey: ["foodCarts", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `https://uiueateryserver.onrender.com/foodCarts?email=${user?.email}`,
        {} // this is use to show the price of an person
      );
      return response.json();
    },
  });
  return [foodCart, refetch, isPending];
};
export default useCart;
