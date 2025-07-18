import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { login } from "../Redux/Slice/AuthSlice";

function Login () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    function handleUserInput(e){
        // console.log("event:",e);
        // here we are using destructuring to get name and value from the event target
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(event){
        event.preventDefault();
        if(!loginData.email || !loginData.password ){
            toast.error("please fill all the details");
            return;
        }
    
        const response = await dispatch(login(loginData))
        console.log("response:", response);
        if(response?.payload?.success){
              navigate('/');
        }
        setLoginData({
            email: "",
            password: ""
        });
    }

    return (  
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" onSubmit={onLogin} noValidate>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="enter your email.."
                            className="bg-transparent px-2 py-1 border rounded-4xl"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
            
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="enter your password.."
                            className="bg-transparent px-2 py-1 border rounded-4xl"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>
                    <button 
                        className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out rounded-sm duration-300 py-2 font-semibold text-large cursor-pointer" 
                        type="submit" 
                        >
                            Login
                    </button>
                    <p className="text-center">
                        Don't have an account? <Link to='/signup' className="link text-accent cursor-pointer" >signUp</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
     );
}

export default Login;