import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import {getCourseLectures,deleteCourseLecture} from '../Redux/Slice/LectureSlice.js'

function Displaylecture(){
    const navigate =  useNavigate();
    const dispatch = useDispatch()
    const {state} = useLocation()
    const {lectures} = useSelector((state) => state?.lecture)
    console.log("lectures:",lectures);
    // const lecturesId = lectures[0].lectures[0]._id;
    // console.log("lectureId", lecturesId);
    // const lecturesID = Object.fromEntries(lectures)
    // console.log("lectureId",lecturesID);
    // const allLectureIds = lectures.flatMap(module =>
    //     module.lectures.map(lecture => lecture._id)
    // );
    
    const {role} = useSelector((state) => state.auth)
    const [currentVideo, setCurrentVideo] = useState(0);
    useEffect (() => {
        if(!state){
            navigate('/courses')

        } 
        console.log("state12:",state);  
        dispatch(getCourseLectures(state?._id))

    },[])
    async function onlectureDelete(courseId, lectureId){
        console.log(courseId,lectureId);
        await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}))
        await dispatch(getCourseLectures(courseId))

    }

    

    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white">
                <div className=" text-center text-2xl font-semibold text-yellow-500">
                    course name: {state?.title}
                </div>
                {
                    lectures && (lectures).length > 0 && <div className="flex justify-center gap-10 w-full ">
                    {/* left section for playing video and displaying course details to admin */}
                    <div className="space-y-5 w-[20rem] p-2 rounded-lg shadow-[0_0_10px]">
                        <video 
                        src={lectures && lectures[currentVideo]?.lecture?.secure_url }
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                        controls
                        disablePictureInPicture
                        muted
                        controlsList="nodownload"
                        >

                        </video>
                        <div>
                            <h1>
                                <span className="text-yellow-500"> Title: {""}
                                    
                                </span>
                                {lectures && lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500 line-clamp-4">
                                    Description: {" "}
                                </span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                        </div>
                    </div>
                    {/* right section for displaying the list of lecture */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>lecture list</p>
                            {
                                role==="ADMIN" && (
                                    <button onClick={() => navigate("/addLecture", {state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm ">
                                        Add new lecture
                                    </button>
                                )
                            }
                        </li>
                        {lectures.flatMap(course => course.lectures).map((lecture, index) => (
                            <div key={index} className="cursor-pointer" onClick={() => setCurrentVideo(index)}>
                                <span>
                                    {" "} Lecture {index + 1}{": "}{lecture.title}<br/>                                  
                                </span>
                                <span>
                                    description{":"}{lecture.description}
                                </span>
                                <br />
                                {/* {console.log("lectureId::",lecture?._id)} */}
                                {console.log(state?._id)}
                            {role==="ADMIN" && (<button className="btn btn-soft btn-accent" onClick={() => onlectureDelete(state?._id,lecture?._id) }>
                                        Delete lecture
                                    </button>
                                )
                            }  
                            </div>
                            

                        ))}


                        {/* {lectures &&
                            lectures.map((lecture,idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id} >
                                        <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                        <span>
                                            {" "} Lecture {idx + 1} : {" "}
                                        </span>
                                        
                                        </p>
                                        {
                                            role==="ADMIN" && (
                                            <button onClick={(state?._id, lecture?._id)} className=" btn-accent px-2 py-1 rounded-md font-semibold text-sm ">
                                        Delete lecture
                                    </button>
                                )
                            }

                                    </li>
                                )
                            })
                        } */}
                    </ul>
                </div> 
                 }
            </div>            
        </HomeLayout>
    )

}
export default Displaylecture;