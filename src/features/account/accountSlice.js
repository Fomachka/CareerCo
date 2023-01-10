import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  name: null,
  id: null,
  email: null,
  token: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
