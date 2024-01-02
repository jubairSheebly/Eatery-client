import { useQuery } from "@tanstack/react-query";

const useOrdered = () => {
  const {
    isPending,
    data: foodCarts = [],
    refetch,
  } = useQuery({
    queryKey: ["foodCarts"],
    queryFn: async () => {
      const res = await fetch("https://uiueateryserver.onrender.com/foodCarts");
      return res.json();
    },
  });
  return [foodCarts, refetch, isPending];
};
export default useOrdered;
