import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../features/account/accountSlice";
import addjobSlice from "../features/addjob/addjobSlice";
import usersSlice from "../features/users/usersSlice";
import usersApiSlice from "../features/users/usersApiSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    addjob: addjobSlice,
    users: usersSlice,
    usersApi: usersApiSlice,
  },
});
