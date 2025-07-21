import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance'


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {}

};
console.log(localStorage.getItem('role'));

// here we are creating an async thunk to handle the signup process
// it will return a promise that will be resolved when the user is created successfully
export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try {
        const response = axiosInstance.post("/users/register", data)
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

export const login = createAsyncThunk("/auth/login", async(data) => {
    try {
        const response = axiosInstance.post("/users/login", data)
        console.log("login response:",response);
        toast.promise(response, {
            loading: "Wait! login in your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "failed to login"
        })
        return (await response).data

    } catch (error) {
        console.error("Error in login:", error);
        toast.error(error?.response?.data?.message);
    }
    
})

export const logout = createAsyncThunk('/auth/logout', async() => {
    try {
        const response = axiosInstance.get('/users/logout');
        console.log("logout response:",response);
        toast.promise(response, {
            loading: "wait! logout in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "failed to logout"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message); 
    }

})

export const updateProfile = createAsyncThunk('/user/update/updateProfile', async(data) => {
    // console.log("update profile id:",id);
    // console.log("update profile data:",data);
    try {
        const response = axiosInstance.put(`users/update`,data);
        console.log("updateProfile response:", (await response).data);
        toast.promise(response, {
            loading: "Wait ! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "failed to update profile"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

export const getUserDetails = createAsyncThunk('/user/details', async() => {
    try { 
        const res = axiosInstance.get(`users/me`);
        console.log("res:",res);
        return (await res).data;
    } catch (error) {
        toast.error(error?.message)
        
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("action:", action);
            
            localStorage.setItem("data", JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        } )
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = ""
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            console.log("get user action:", action);
            localStorage.setItem("data", JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })

    }
})

export const {} = authSlice.actions
export default authSlice.reducer