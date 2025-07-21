import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import { getUserDetails, updateProfile } from '../Redux/Slice/AuthSlice';
import {Link, useNavigate} from 'react-router-dom'
import HomeLayout from '../Layouts/HomeLayout';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';

function EditProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector((state) => state?.auth?.data?._id)

    const [data, setData] = useState({
        previewImage: "",
        fullname: "",
        avatar: undefined, 
        userId
    })
    

    function handleImageUpload(e){
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if(uploadImage){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadImage
                })
            })
        }
    }

    function handleInputChange(e){
        console.log("event:",e.target);
        const {name, value} = e.target;
        console.log(name, value);
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        console.log("form data:", data);
        if(!data.fullname || !data.avatar){
            toast.error("all field are mandatory")
            return
        }
        if(data.fullname.length<5){
            toast.error("name cannot be of less than 5 character")
            return
        }
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("avatar", data.avatar);
        const res = await dispatch(updateProfile(formData));
        if (res.error) {
            toast.error("Failed to update profile");
            return;
        }


        await dispatch(getUserDetails())
        navigate('/user/profile')

        
        }

    return ( 
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form  noValidate onSubmit={onFormSubmit} className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black] '>
                    
                    <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
                    <label className='cursor-pointer' htmlFor='image_uploads'>
                        {data.previewImage ? (
                            <img src={data.previewImage}  className='w-28 h-28 rounded-full m-auto'/>
                        ) : (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                        )}
                    </label>
                    <input 
                        onChange={handleImageUpload} 
                        className='hidden' 
                        type='file'
                        id='image_uploads' 
                        accept='.jpg, .png, .svg, .jpeg'
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className='text-lg font-semibold'>Fullname</label>
                        <input 
                            autoComplete='fullname'
                            type="text"
                            required
                            name='fullname'
                            id='fullname'
                            placeholder='enter your name'
                            className='bg-transparent px-2 py-1 border'
                            value={data?.fullname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button 
                    className="w-full bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer" 
                    type='submit'>
                        Update Profile
                    </button>
                    <Link to='/user/profile'>
                    <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-2'> <AiOutlineArrowLeft/> Go back to profile</p>
                    </Link>

                </form>
            </div>
        </HomeLayout>
     );
}

export default EditProfile;