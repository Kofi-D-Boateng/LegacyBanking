import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authentication/auth-slice";
import { bankSlice } from "./bank/bank-slice";
import { customerSlice } from "./customer/customer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cust: customerSlice.reducer,
    bank: bankSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
