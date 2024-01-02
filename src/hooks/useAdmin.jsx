import { useQuery } from "@tanstack/react-query";

// this is for check about user

const useAdmin = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://uiueateryserver.onrender.com/users");
      return res.json();
    },
  });
  return [users, refetch, isPending];
};
export default useAdmin;
