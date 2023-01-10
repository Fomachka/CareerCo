import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsersData(state, action) {
      return [...action.payload];
    },
    addUsersData(state, action) {
      state.push(action.payload);
    },
    removeUsersData(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setUsersData, addUsersData, removeUsersData } = usersSlice.actions;

export default usersSlice.reducer;
