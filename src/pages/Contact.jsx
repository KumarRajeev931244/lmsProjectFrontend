import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast';
import { isEmail } from '../Helpers/regexMatcher';
import axiosInstance from '../Helpers/axiosInstance';
function Contact() {
    
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });

    function handleInputChange(e){
        const {name, value} = e.target;
        console.log(name, value);
        setUserInput({
            ...userInput,
            [name]: value
        })
        
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.email || !userInput.message || !userInput.name){
            toast.error("All field are mandatory");
            return
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid email")
            return;
        }
        try {
            const response = axiosInstance.post("/contacts",userInput);
            console.log("contact response:", response);
            toast.promise(response, {
                loading: "submitting your message..",
                success: "form submitted successfully",
                error: "failed to submit the form"
            });
            const contactResponse = await response;
            console.log("contactResponse:",contactResponse);
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            toast.error("operation failed...")
        }

    }
    return (  
        <HomeLayout>
           <div className="flex items-center justify-center h-[100vh] ">
                <form className='flex flex-col items-center jsutify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]' noValidate onSubmit={onFormSubmit}>
                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className='text-xl font-semibold'>
                            Name
                        </label>
                        <input 
                            className="bg-transparent border px-2 py-1 rounded-sm" 
                            id='name' 
                            type='text' 
                            name='name' 
                            placeholder='enter your name'
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className='text-xl font-semibold'>
                            email
                        </label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm" 
                            id='email' 
                            type='text' 
                            name='email' 
                            placeholder='enter your email'
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className='text-xl font-semibold'>
                            Message
                        </label>
                        <textarea 
                        className="bg-transparent border px-2 py-1 rounded-sm" 
                        id='message' 
                        name='message' 
                        placeholder='enter your email'
                        onChange={handleInputChange}
                        value={userInput.message}
                        />
                    </div>
                    <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer '>submit</button>
                </form>
           </div>
        </HomeLayout>
    );
}

export default Contact;