import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
import product from "../slices/products/productSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    product
  },
});

export default store;