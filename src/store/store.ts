import { configureStore } from "@reduxjs/toolkit";
import { bankSlice } from "./bank/bank-slice";
import { customerSlice } from "./customer/customer-slice";
import { modalSlice } from "./modals/modal-slice";
import { notisSlice } from "./notifications/notifications";

const store = configureStore({
  reducer: {
    cust: customerSlice.reducer,
    bank: bankSlice.reducer,
    view: modalSlice.reducer,
    notis: notisSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
