import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import {BsPersonCircle} from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slice/AuthSlice.js";
import { isEmail, isPassword } from "../Helpers/regexMatcher.js";
function Signup () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [previewImage, setPreviewImage] = useState("")
    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
        avatar: ""
    })

    // here we handle user input for email, fullname and password
    function handleUserInput(e){
        // console.log("event:",e);
        // here we are using destructuring to get name and value from the event target
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function handleUserImage(e){
        // prevent default to stop the form submission
        e.preventDefault()
        // here we are getting the file from the input and setting it to the state
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            })
        }
        console.log("uploadedImage:", uploadedImage);
        const fileReader = new FileReader();
        console.log("fileReader:", fileReader);
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load', function(){
            // console.log("result:",this.result);
            setPreviewImage(this.result)
        })
        
    }

    async function createNewAccount(event){
        event.preventDefault();
        console.log("signupData:", signupData);

        if(!signupData.email || !signupData.fullname || !signupData.avatar ){
            toast.error("please fill all the details");
            return;
        }
        console.log(signupData.fullname.length);
        if(signupData.fullname.length<5){
            toast.error("fullname should be atleast 5 characters long")
            return
        }
        // if(!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        //     toast.error("invalid email id");
        //     return;
        // }

        if(!isEmail(signupData.email)){
            toast.error("invalid email id");
        //     return;
        }

        // check password validation
        // console.log(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
        // if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        //     toast.error("Password should be 8-16 character long with atleast one upper and lower case letter and number")
        //     return;
        // }

        if(!isPassword(signupData.password)){
             toast.error("Password should be 8-16 character long with atleast one upper and lower case letter and number")
             return;
        }
        // create a form data object to send the data to the server
        const formData = new FormData();
        formData.append("fullname",signupData.fullname)
        formData.append("email",signupData.email)
        formData.append("avatar",signupData.avatar)
        formData.append("password",signupData.password)

        // dispatch create account action
        const response = await dispatch(createAccount(formData))
        console.log("response:", response);
        if(response?.payload?.success){
              navigate('/');
        }
        setSignupData({
            fullname: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("")

    }

    return (  
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" onSubmit={createNewAccount} noValidate>
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_upload" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}

                    </label>
                    <input 
                        onChange={handleUserImage}
                        type="file"
                        name="image_upload"
                        id= "image_upload"
                        accept=".jpg,.jpeg,.png,.svg"
                        hidden
                    />
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
                            value={signupData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold">Fullname</label>
                        <input 
                            type="text"
                            required
                            name="fullname"
                            id="fullname"
                            placeholder="enter your fullname.."
                            className="bg-transparent px-2 py-1 border rounded-4xl"
                            onChange={handleUserInput}
                            value={signupData.fullname}
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
                            value={signupData.password}
                        />
                    </div>
                    <button 
                        className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out rounded-sm duration-300 py-2 font-semibold text-large cursor-pointer" 
                        type="submit" 
                        >
                            Create account
                    </button>
                    <p className="text-center">
                        Already have an account? <Link to='/login' className="link text-accent cursor-pointer" > Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
     );
}

export default Signup;