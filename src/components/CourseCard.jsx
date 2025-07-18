import { useNavigate } from "react-router-dom";

function CourseCard({data}) {
    console.log("course data:", data);
    const navigate = useNavigate()
    return (
         <div 
         onClick={() => navigate('/courses/description')}
         className="text-white w-[22em] shadow-lg rounded-lg coursor-pointer group overflow-hidden ">
            <img 
                src= {data?.thumbnail?.secure_url}
                alt= "course thumbnail"
                className="h-48 w-full rounded-tl-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300 "
            />
            <div className="-3 space-y-1 text-white">
                <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
                    {data?.title}
                </h2>
                <p className="line-clamp-2">
                    {data?.description}
                </p>
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold space-y-3"> category: </span>
                    {data?.category}
                </p>
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold"> Total lecture: </span>
                    {data?.numbersOfLectures}
                </p>
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold"> Instructor: </span>
                    {data?.createdBy}
                </p>
            </div>

    </div> 
    );
}

export default CourseCard;