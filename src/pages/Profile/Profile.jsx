import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.auth?.data);
    console.log("user data:", userData);
    
    return ( 
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center ">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black] ">
                    <img 
                        className="w-40 m-auto rounded-full border border-black"
                        src={userData?.avatar?.secure_url} 
                        alt="avatar"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullname}
                    </h3>
                    <div className="grid">
                        <p>Email:{" "}{userData?.email}</p> 
                        <p>Role:{" "}{userData?.role}</p>
                        <p>Subscription:{" "} {userData?.subscription?.status === "active"? "Active" : "inactive"} </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 ">
                        <Link 
                            to='/changePassword'
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer">
                                <button>change Password</button>
                        </Link>
                        <Link 
                            to='/user/editprofike'
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer">
                                <button>Edit profile</button>
                        </Link>
                    </div>

                    {userData?.subscription?.status !== 'active' && (
                        <button className=" bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">cancel subscription</button>
                    )}
                </div>
            </div>
        </HomeLayout>
     );
}

export default Profile;