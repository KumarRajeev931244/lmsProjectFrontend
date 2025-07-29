import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayment: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try {
        const response = await axiosInstance.get('payments/razorpay-key')
        console.log("get razorpay id response:", response.data);
        return  response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const purchaseCourseBundle = createAsyncThunk('/razorpay/subscribe', async () => {
    try {
        const response = await axiosInstance.post('payments/subscribe')
        console.log("purchase course bundle response data:", response.data);
         return  response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const verifyUserPayment = createAsyncThunk('/payments/verify', async(data) => {
    try {
        const response = await axiosInstance.post('/payments/verify', {
            razorpay_payment_id: data?.razorpay_payment_id,
            razorpay_signature: data?.razorpay_signature,
            razorpay_subscription_id: data?.razorpay_subscription_id
        })
        console.log("verify user payment response:", await response);
        return (await response)?.data
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const getPaymentRecord = createAsyncThunk('/payments/record', async() => {
    try {
        const response = axiosInstance.get('/payments?count=100');
        console.log("razorpay response:",response);
        toast.promise(response, {
            loading: "getting the payment records",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to get payment records"
        })
        return (await response).data
    } catch (error) {
        toast.error("operation failed")
    }
})

export const cancelCourseBundle = createAsyncThunk('/payments/cancel', async() => {
    try {
        const response = axiosInstance.post('/payments/unsubscribe');
        toast.promise(response, {
            loading: "unsubscribing the course",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to unsubscribe"
        })
        return (await response).data
    } catch (error) {
        toast.error("operation failed to unscribe")
    }
})

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled, (state,action) => {
            console.log("razorpay action:",action);
            state.allPayment = action?.payload?.allPayment;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })

    }
})

export default razorpaySlice.reducer