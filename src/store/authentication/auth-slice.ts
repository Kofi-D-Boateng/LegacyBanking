import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../Interfaces/Auth";

function initialState(): Auth {
  const token = sessionStorage.getItem("lb-token");
  return {
    token: token,
    authenticated: token ? true : false,
    isEnabled: false,
    isLocked: true,
  };
}

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState(),
  reducers: {
    getCreds(
      state,
      action: PayloadAction<{
        token: string;
        isLocked: boolean;
        isEnabled: boolean;
      }>
    ) {
      const { token, isEnabled, isLocked } = action.payload;
      state.token = token;
      state.authenticated = true;
      state.isEnabled = isEnabled;
      state.isLocked = isLocked;
      sessionStorage.setItem("lb-token", token);
    },
    logout(state) {
      sessionStorage.removeItem("lb-token");
      state.authenticated = false;
    },
  },
});

const authActions = authSlice.actions;

export { authActions, authSlice };
