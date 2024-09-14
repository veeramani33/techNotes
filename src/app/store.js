
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import  authReducer from '../features/auth/authSlice'
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        //reducer will change the url dynamically
        //dynamically referring to this apiSlice with the reducer path
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false // we will use redux tools so make it true
})

setupListeners(store.dispatch)

