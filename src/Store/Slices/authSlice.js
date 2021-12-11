import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: [],
    isLoggedIn: !!JSON.parse(localStorage.getItem('user'))?.token,
    isloading: false,
    error: null,
}
export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {
        try {
            const response = await axiospost('/login', payload)
            return response.data
        } catch (error) {
            throw Error(error)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
        
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isLoggedIn = true
            state.error = null
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = false 
            state.error = null
            state.authUser = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data));
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false 
            state.error = action.error.message
        }
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions