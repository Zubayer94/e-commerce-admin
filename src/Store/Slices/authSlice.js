import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    authUser: {},
    isLoggedIn: !!JSON.parse(localStorage.getItem('user'))?.token,
    isloading: false,
    authError: null,
}
export const login = createAsyncThunk(
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('/login', payload)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('/register', payload)
            return response.data
        } catch (error) {
            // throw Error(error)
            return rejectWithValue(error.response.data)
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
            state.authError = null
        },
        [login.fulfilled]: (state, action) => {
            state.isloading = false 
            state.isLoggedIn = true
            state.authUser = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.authError = null
        },
        [login.rejected]: (state, action) => {
            state.isloading = false 
            state.authError = action.payload.message
        },

        [register.pending]: (state) => {
            state.isloading = true
            state.authError = null
        },
        [register.fulfilled]: (state, action) => {
            state.isloading = false 
            state.authError = null
        },
        [register.rejected]: (state, action) => {
            state.isloading = false 
            state.authError = action.payload.message
        },

    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions