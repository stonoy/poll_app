import { configureStore } from "@reduxjs/toolkit";
import pollReducer from "./feature/pollSlice"

export const store = configureStore({
    reducer : {
        poll: pollReducer,
        
    }
})