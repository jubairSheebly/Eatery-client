import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const {
    isPending,
    data: menu = [],
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await fetch("https://uiueateryserver.onrender.com/menu");
      return res.json();
    },
  });
  return [menu, refetch, isPending];
};

export default useMenu;
