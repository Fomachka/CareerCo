import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: "",
  companyName: "",
  location: "",
  status: "",
  date: "",
};

const addjobSlice = createSlice({
  name: "addjob",
  initialState,
  reducers: {
    setForm(state, action) {
      state.position = action.payload.position;
      state.companyName = action.payload.companyName;
      state.location = action.payload.location;
      state.status = action.payload.status;
      state.date = action.payload.date;
    },
  },
});

export const { setForm } = addjobSlice.actions;

export default addjobSlice.reducer;
