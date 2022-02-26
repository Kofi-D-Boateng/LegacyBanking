import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authentication/auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
