import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import tableReducer from "./slices/tableSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    table: tableReducer,
  },
});

// console.log("onCreate Store : ", store.getState());

// store.subscribe(() => {
//   console.log("Store change:", store.getState());
// });

export default store;
