import { createSlice } from "@reduxjs/toolkit";

const usersApiSlice = createSlice({
  name: "usersApi",
  initialState: [],
  reducers: {
    setUsersApiData(state, action) {
      return [...action.payload];
    },
  },
});

export const { setUsersApiData } = usersApiSlice.actions;

export default usersApiSlice.reducer;
