import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { FcSalesPerformance } from "react-icons/fc"
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { CiTrash } from "react-icons/ci";
import {  BsCollectionPlayFill } from "react-icons/bs";
import { deleteCourseLecture } from "../Redux/Slice/LectureSlice";
import { getAllCourses } from "../Redux/Slice/CourseSlice";
import HomeLayout from "../Layouts/HomeLayout";
import { getStatsData } from "../Redux/Slice/StatSlice";
import { getPaymentRecord } from "../Redux/Slice/RazorpaySlice";


ChartJs.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title,Tooltip)
function AdminDashboard(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {allUsersCount, subscribedUsersCount} = useSelector((state) => state?.stats)
    console.log(allUsersCount,subscribedUsersCount);
    const {allPayment, finalMonths, monthlySalesRecord} = useSelector((state) => state?.razorpay)
    console.log("all payments:",allPayment);
    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [{
            label: 'User Details',
            data: [allUsersCount, subscribedUsersCount],
            backgroundColor: ['yellow','green'],
            borderWidth: 1,
            borderColor: ['yellow', 'green']

        }]
    }

    const salesData = {
        labels: ['jan', 'feb', 'march','april', 'may','june','july', 'august','sept','oct','nov','dec'],
        fontColor: 'white',
        datasets: [
            {
                label: "sales/month",
                data: monthlySalesRecord,
                backgroundColor: ['rgb(255,99,132)'],
                borderWidth: 2
            }
        ]
    }
    console.log("sales data:",salesData);
    const myCourses = useSelector((state) => state?.course?.courseData);
    console.log("myCourse:",myCourses);

    async function onCourseDelete(id){
        if(window.confirm('are you sure you want to delete the course ?')){
            const res = await dispatch(deleteCourseLecture(id));
            if(res?.payload?.success){
                await dispatch(getAllCourses())
            }
        }
    }

    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses())
                await dispatch(getStatsData())
                await dispatch(getPaymentRecord())
            }
        )()
    },[])
    

    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-mg">
                        <div className="w-80 h-80">
                            <Pie data={userData}>  

                            </Pie>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Registered users</p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className='text-yellow-500 text-5xl'/>

                            </div>
                            
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscribed users</p>
                                    <h3 className="text-4xl font-bold">{subscribedUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl"/>
                            </div>     
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar className="absolute bottom-0 h-80 w-full`" data={salesData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex items-center justify-between   p-5 gap-5 rounded-md shadow">
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">Subscription count</p>
                                        <h3 className="text-4xl font-bold"> {allPayment?.count}</h3>
                                    </div>                                   
                                </div>
                                <FcSalesPerformance  className="text-yellow-500 text-5xl"/>
                                <div className="flex items-center justify-between   p-5 gap-5 rounded-md shadow">
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">Total Revenue</p>
                                        <h3 className="text-4xl font-bold">{(allPayment?.count)* 499}</h3>
                                       
                                    </div>                           
                               </div>
                               <GiMoneyStack className="text-green-500 text-5xl "/>  
                            
                            </div>
                        </div>                                                
                    </div>
                    
                </div>
                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="text-center text-3xl font-semibold">
                                courses overview
                            </h1>
                            <button
                                className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 py-2 px-4 font-semibold text-lg cursor-pointer" 
                                onClick={() => {
                                    navigate('/course/create')
                                }}>
                                    create new course
                            </button>
                        </div>

                        <table className="table overflow-x-scroll">
                            <thead>
                                <tr>
                                    <th>S No.</th>
                                    <th>Course Title</th>
                                    <th>Course Category</th>
                                    <th>Instructor</th>
                                    <th>Total Lectures</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myCourses?.map((course,idx) => {
                                    return (
                                        <tr key={course._id}>
                                            <td>{idx+1}</td>
                                            <td>
                                                <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                            </td>
                                            <td>
                                                {course?.category}
                                            </td>
                                            <td>
                                                {course?.createdBy}
                                            </td>
                                            <td>
                                                {course?.numbersOfLectures}
                                            </td>
                                            <td className="maz-w-28 overflow-hidden text-ellipsis whitespace-normal">
                                                <textarea  value={course?.description}
                                                readOnly
                                                className="w-80 h-auto bg-transparent resize-none"
                                                ></textarea>
                                            </td>
                                            <td className="flex items-center gap-4">
                                                <button onClick={()=> navigate('/course/displayLectures',{state:{...course}})}
                                                className="bg-green-500 hover:bg-green-600 transition-all  ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-semibold"
                                                ><BsCollectionPlayFill/></button>
                                                <button className="bg-red-500 hover:bg-red-600 transition-all  ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-semibold"
                                                onClick={() => onCourseDelete(course?._id)}>
                                                
                                                <CiTrash /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
            </div>

        </HomeLayout>
    )

}
export default AdminDashboard;