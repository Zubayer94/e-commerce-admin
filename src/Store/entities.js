import { combineReducers } from "redux";
import authReducer from "./Slices/authSlice";

export default combineReducers({
    auth: authReducer
})