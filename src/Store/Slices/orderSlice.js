import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    orders: [],
    ordersPagination: {
        current_page: 1
    },
    isloading: false,
    oError: null
}

export const getOrders = createAsyncThunk(
    'order/getOrders',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/orders?page=${payload.page}`, {
                params: payload
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: {
        [getOrders.pending]: (state) => {
            state.isloading = true
            state.oError = null
        },
        [getOrders.fulfilled]: (state, action) => {
            state.isloading = false
            let {data , links,...rest} = action.payload.orders
            state.orders = data
            state.ordersPagination = rest
            state.oError = null
        },
        [getOrders.rejected]: (state, action) => {
            state.isloading = false
            state.oError = action.payload.message
        },
    }
})

export default orderSlice.reducer

