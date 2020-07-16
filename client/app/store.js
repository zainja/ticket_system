import {configureStore} from "@reduxjs/toolkit";
import tokenReducer from '../features/tokenSlice'
import userReducer from '../features/userSlice'
export default configureStore({
    reducer: {
        token: tokenReducer
    }
})