import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

// here we are creating an async thunk to handle the signup process
// it will return a promise that will be resolved when the user is created successfully
export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try {
        const response = axiosInstance.post("/register", data)
        console.log("create account response:",response);
        toast.promise(response, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "failed to create account"
        })
        return (await response).data

    } catch (error) {
        console.error("Error in createAccount:", error);
        toast.error(error?.response?.data?.message);
    }
    
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export const {} = authSlice.actions
export default authSlice.reducer