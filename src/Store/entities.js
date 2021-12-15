import { combineReducers } from "redux";
import authReducer from "./Slices/authSlice";
import categoryReducer from "./Slices/categorySlice";
import orderReducer from "./Slices/orderSlice";
import productReducer from "./Slices/productSlice";

export default combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
})