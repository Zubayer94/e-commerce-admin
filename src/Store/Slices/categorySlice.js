import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    categories: [],
    categoryPagination: {
        current_page: 1
    },
    isloading: false,
    cError: null
}

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/categories?page=${payload.page}`, {
                params: payload
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.isloading = true
            state.cError = null
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isloading = false
            let { data, links, ...rest } = action.payload.categories
            state.categories = data
            state.categoryPagination = rest
            state.cError = null
        },
        [getCategories.rejected]: (state, action) => {
            state.isloading = false
            state.cError = action.payload.message
        },
    }
})

export default categorySlice.reducer

