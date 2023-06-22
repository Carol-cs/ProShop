import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
// we don't add productsApiSlice and usersApiSlice in the store because they are children of apiSlice

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
