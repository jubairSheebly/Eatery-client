import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";

const UserHome = () => {
  //  show his pay bill base on his email and his info
  const { user } = useContext(AuthContext);
  const [users] = useUser();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const userData = users.find(
      (userEmail) => userEmail?.email === user?.email
    );
    setUserInfo(userData);
  }, [user?.email, users]);
  return (
    <div className="text-xl font-semibold ml-5">
      <h2 className="text-center p-20 bg-orange-300">User Home </h2>
      <div className="my-5">
        <p>Name : {userInfo?.name}</p>
        <p>Email : {userInfo?.email}</p>
      </div>
    </div>
  );
};

export default UserHome;
