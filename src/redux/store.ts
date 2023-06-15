import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

// console.log("onCreate Store : ", store.getState());

// store.subscribe(() => {
//   console.log("Store change:", store.getState());
// });

export default store;
