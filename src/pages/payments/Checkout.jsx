import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slice/RazorpaySlice";
import { useEffect } from "react";
import {toast} from "react-hot-toast";
import {BiRupee} from 'react-icons/bi'


function Checkout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const razorpayKey = useSelector((state) => state?.razorpay?.key)
    console.log("razorpay key:",razorpayKey);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id)
    console.log("subscription key:",subscription_id);
    const userData = useSelector((state) => state?.auth?.data)
    console.log("user data:", userData);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified)
    // console.log("isPaymentVerified:", isPaymentVerified);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_signature: "",
        razorpay_subscription_id: "",
    }
    async function handleSubscription(e) {
        e.preventDefault()
        if(!razorpayKey || !subscription_id){
            toast.error("something went wrong")
            return
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "coursify Pvt. Limited",
            description: "subscription",
            theme:{
                color: '#F37254'
            },
            prefill: {
                email: userData?.email,
                name: userData?.fullname
            },
            handler: async function(response){
                console.log("handler fucntion:",response);
                paymentDetails.razorpay_payment_id = response?.razorpay_payment_id;
                paymentDetails.razorpay_signature = response?.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response?.razorpay_subscription_id;
                toast.success("payment successful")
                const res = await dispatch(verifyUserPayment(paymentDetails));
                console.log("verify payment:",res);
                (res?.payload?.success)?navigate('/checkout/success'):navigate('/checkout/fail')
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
    }


    async function load(){
        await dispatch(getRazorpayId());
        await dispatch(purchaseCourseBundle())
    }
    useEffect(() => {
        load()
    }, [])



    return ( 
        <HomeLayout>
            <form 
            onSubmit={handleSubscription}
            className="min-h-[90vh] flex items-center justify-center text-white "
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative ">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-sm rounded-tr-lg">Subscription Bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px] ">
                            This purchase will allow you to access all available course of our platform for {""}
                            <span className="text-yellow-500 font-bold">
                                <br />
                                1 year duration
                            </span>{" "}
                            All the existing and new launched courese will be also available
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee/><span>1</span>
                        </p>
                        <div className="text-gray-200">
                        <p>100% refund on cancellation</p>
                        <p>* Terms and conditions applied *</p>
                    </div>
                    </div>
                    
                    <button 
                    type="submit"
                    className="bg-yellow-500 hover:bg-green-500 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg py-2 cursor-pointer">Buy now</button>
                </div>

            </form>
            
        </HomeLayout>
     );
}

export default Checkout;