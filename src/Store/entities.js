import { combineReducers } from "redux";
import authReducer from "./Slices/authSlice";
import productReducer from "./Slices/productSlice";

export default combineReducers({
    auth: authReducer,
    product: productReducer
})