import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    setLogin: (state) => {
      state = true;
      return state;
    },
    setLogout: (state) => {
      state = false;
      return state;
    },
  },
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;
