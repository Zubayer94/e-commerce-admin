import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    authUser: {},
    isLoggedIn: !!JSON.parse(localStorage.getItem('user'))?.token,
    isloading: false,
    error: null,
}
export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {
        try {
            const response = await axios.post('/login', payload)
            return response.data
        } catch (error) {
            throw Error(error)
        }
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async (payload) => {
        try {
            console.log('got hit!');
            const response = await axios.post('/register', payload)
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
        [login.pending]: (state) => {
            state.isloading = true
            state.error = null
        },
        [login.fulfilled]: (state, action) => {
            state.isloading = false 
            state.authUser = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.error = null
        },
        [login.rejected]: (state, action) => {
            state.isloading = false 
            state.error = action.error.message
        },

        [register.pending]: (state) => {
            state.isloading = true
            state.error = null
        },
        [register.fulfilled]: (state, action) => {
            state.isloading = false 
            state.error = null
        },
        [register.rejected]: (state, action) => {
            state.isloading = false 
            state.error = action.error.message
        },

    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions