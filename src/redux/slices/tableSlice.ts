import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    fetchData: [],
    filterData: [],
  },
  reducers: {
    setFetchTable: (state, action) => {
      state.fetchData = action.payload;
      return state;
    },
    setFilterTable: (state, action) => {
      state.filterData = action.payload;
      return state;
    },
  },
});

export const { setFetchTable, setFilterTable } = tableSlice.actions;
export default tableSlice.reducer;
