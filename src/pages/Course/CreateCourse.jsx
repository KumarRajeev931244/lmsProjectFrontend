import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slice/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    })

    function handleImageUpload(e){
        e.preventDefault();
        console.log("event:",e);
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }
       }
       function handleUserInput(e){
        console.log("handle user input event:",e);
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
       }

       async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title || !userInput.description || !userInput.thumbnail || !userInput.category || !userInput.createdBy){
            toast.error("all field are mandatory");
            return;
        }
        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success){
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
        })
            

        }
        navigate("/courses")
       }


    return (
      <HomeLayout>
        <div className="flex justify-center items-center h-[100vh] ">
          <form
            noValidate
            onSubmit={onFormSubmit}
            className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
          >
            <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
              <AiOutlineArrowLeft />
            </Link>
            <h1 className="text-center text-2xl font-bold">
              create new course
            </h1>
            <main className="grid grid-cols-2 gap-x-10">
              <div className="gap-y-6">
                <div>
                  <label 
                  htmlFor="image_uploads" 
                  className="cursor-pointer">
                    {userInput.previewImage ? (
                      <img
                        src={userInput.previewImage}
                        alt="preview image"
                        className="w-full h-44 m-auto border"
                      />
                    ) : (
                      <div className="w-full h-44 m-auto flex items-center justify-center border">
                        <h1 className="font-bold textl-lg">
                          upload your course thumbnail
                        </h1>
                      </div>
                    )}
                  </label>
                  <input
                    
                    onChange={handleImageUpload}
                    type="file"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    name="image_uploads"
                    hidden
                    
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-lg font-semibold">
                    Course Title
                  </label>
                  <input
                    type="text"
                    required
                    name="title"
                    id="title"
                    placeholder="enter course title"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.title}
                    onChange={handleUserInput}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <label htmlFor="createdBy" className="text-lg font-semibold">
                    Course Instructor
                  </label>
                  <input
                    type="text"
                    required
                    name="createdBy"
                    id="createdBy"
                    placeholder="enter course instructor"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.createdBy}
                    onChange={handleUserInput}
                  />
                </div>
                <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <label htmlFor="category" className="text-lg font-semibold">
                    Course Category
                  </label>
                  <input
                    type="text"
                    required
                    name="category"
                    id="category"
                    placeholder="enter course category"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.category}
                    onChange={handleUserInput}
                  />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                    <label
                        htmlFor="description"
                        className="text-lg font-semibold"
                    >
                        Course Description
                    </label>
                    <textarea
                        type="text"
                        required
                        name="description"
                        id="description"
                        placeholder="enter course description"
                        className="bg-transparent px-2 py-1 border h-24 overflow-x-scroll resize-none"
                        value={userInput.description}
                        onChange={handleUserInput}
                    />
                    </div>
                </div>
                </div>
              </div>
            </main>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-lg rounded-sm  bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
            >create course</button>
          </form>
        </div>
      </HomeLayout>
    );
}

export default CreateCourse;