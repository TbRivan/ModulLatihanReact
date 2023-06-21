import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    userId: "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.userId = action.payload;
      return state;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.userId = "";
      return state;
    },
  },
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;
