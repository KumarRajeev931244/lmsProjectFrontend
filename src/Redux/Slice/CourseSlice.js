import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk('/courses/get', async() => {
    try {
        const response = axiosInstance.get('/courses');
        console.log("course response:", response);
        toast.promise(response, {
            loading: "loading course data",
            success: "courses load successfully",
            error: "failed to get the courses"
        });
        return (await response).data.courses
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const courseSlicce = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload){
                // console.log("courses:", action.payload);
                state.courseData = [...action.payload]
            }
        })
    }
})

export default courseSlicce.reducer