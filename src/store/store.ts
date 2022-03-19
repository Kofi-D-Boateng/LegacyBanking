import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authentication/auth-slice";
import { customerSlice } from "./customer/customer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cust: customerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
