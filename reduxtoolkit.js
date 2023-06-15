import toolkit from "@reduxjs/toolkit";

const { configureStore, createSlice } = toolkit;

const loginReducer = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin(state) {
      state.isLogin = true;
    },
    setLogout(state) {
      state.isLogin = false;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginReducer.reducer,
  },
});

console.log("onCreate Store : ", store.getState());

store.subscribe(() => {
  console.log("Store change:", store.getState());
});

store.dispatch(loginReducer.actions.setLogin());
store.dispatch(loginReducer.actions.setLogout());
