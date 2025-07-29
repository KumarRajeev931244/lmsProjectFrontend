import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk('/courses/get', async() => {
    try {
        const response = axiosInstance.get('/courses/');
        console.log("course response:", response);
        toast.promise(response, {
            loading: "loading course data",
            success: "courses load successfully",
            error: "failed to get the courses"
        });
        return (await response).data.courses

    } catch (error) {
        console.log("course error:", error);
        toast.error(error?.response?.data?.message);
    }
})

export const createNewCourse = createAsyncThunk('/course/create', async(data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title)
        formData.append("description", data?.description)
        formData.append("category", data?.category)
        formData.append("createdBy", data?.createdBy)
        formData.append("thumbnail", data?.thumbnail)
        const response = axiosInstance.post('/courses', formData);
        toast.promise(response, {
            loading: "creating new course",
            success: "course created successfully",
            error: "failed to create course"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const deleteCourse = createAsyncThunk('/courses/delete', async(id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        console.log("course response:", response);
        toast.promise(response, {
            loading: "deleting course data",
            success: "courses deleted successfully",
            error: "failed to delete the courses"
        });
        return (await response).data.courses

    } catch (error) {
        console.log("course error:", error);
        toast.error(error?.response?.data?.message);
    }
})
const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload){
                console.log("courses:", action.payload);
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer