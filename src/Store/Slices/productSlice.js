import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    productsPagination: {
        current_page: 1
    },
    isloading: false,
    pError: null
}

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/products?page=${payload.page}`, {
                params: payload
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isloading = true
            state.pError = null
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isloading = false
            let {data , links,...rest} = action.payload.products
            state.products = data
            state.productsPagination = rest
            state.pError = null
        },
        [getProducts.rejected]: (state, action) => {
            state.isloading = false
            state.pError = action.payload.message
        },
    }
})

export default productSlice.reducer

