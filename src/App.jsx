
import { Route,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import CourseList from "./pages/Course/CourseList";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import CourseDescription from "./pages/Course/CourseDescription";
import RequireAuth from "./components/Auth/RequireAuth";
import CreateCourse from "./pages/Course/CreateCourse";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile.jsx";
import Checkout from "./pages/payments/Checkout.jsx";
import CheckoutSucess from "./pages/payments/CheckoutSuccess.jsx";
import CheckoutFailure from "./pages/payments/CheckoutFailure.jsx";
import DisplayLecture from "./pages/DisplayLecture.jsx";
import AddLecture from "./pages/AddLecture.jsx";
import AdminDashboard from "./pages/AdminDashobard.jsx";

function App() {
    return (  
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/about" element={<AboutUs/>}></Route>
            <Route path="/*" element={<NotFound/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/courses" element={<CourseList/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/denied" element={<Denied/>}></Route>
            <Route path="/courses/description" element={<CourseDescription/>}></Route>
            <Route path="/courses/create" element={<CreateCourse/>}></Route>
            {/* <Route path="/user/profile" element={<Profile/>}></Route> */}
                     
                  
            <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                {/* <Route path="/courses/create" element={<CreateCourse/>}></Route> */}
            </Route> 

            <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} /> } >
                <Route path="/user/profile" element={<Profile/>} />
                <Route path="/user/editprofile" element={<EditProfile/>} /> 
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/checkout/success" element={<CheckoutSucess/>} />
                <Route path="/checkout/fail" element={<CheckoutFailure/>} />
                <Route path='/course/displayLectures' element={<DisplayLecture/>}></Route>
                <Route path='/addlecture' element={<AddLecture/>}></Route>
                <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
                


                

            </Route>

        


        </Routes>
           
        </>
    );
}

export default App;
