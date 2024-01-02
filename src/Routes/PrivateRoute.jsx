// import  { useContext } from 'react';
// import { AuthContext } from '../Provider/AuthProvider';
// import { Navigate, useLocation } from 'react-router-dom';

// //  this is making for make the path secure
// const PrivateRoute = ({children}) => {

//     // here checking is the user is has the auth value
// const {user,loading} =useContext(AuthContext);
// const {location} = useLocation();
// if(loading){
//     return<progress className="progress w-56"></progress>
// }
// if(user){
//     return children
// }
//  // if the use is not login then take him to login page
//     return <Navigate to="/login" state={{ from: location }} replace></Navigate>
// };

// // export default PrivateRoute;
