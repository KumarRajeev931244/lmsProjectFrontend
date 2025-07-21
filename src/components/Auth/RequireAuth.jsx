import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

function RequireAuth({allowedRoles}) {
    console.log("allowed roles:",allowedRoles);
    const {isLoggedIn, role} = useSelector((state) => state.auth)
    // console.log("role:",role);
    console.log(useSelector((state) => state.auth));
    console.log("isloginin:",isLoggedIn);
   
    return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (<Outlet/>) : isLoggedIn ? (<Navigate to='/denied'/>) : (<Navigate to='login'/>)
}

export default RequireAuth;