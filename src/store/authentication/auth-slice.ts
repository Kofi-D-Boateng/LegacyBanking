import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BUFFERTIME } from "../../components/UI/Constants/Constants";
import { Auth } from "../../Interfaces/Auth";

function initialState(): Auth {
  const DATE: Date = new Date();
  const token = sessionStorage.getItem("lb-token");
  const exp = sessionStorage.getItem("exp");
  const RemainingTime: number = exp
    ? DATE.getTime() + +exp - (DATE.getTime() + BUFFERTIME)
    : 0;
  return {
    token: token,
    authenticated: token ? true : false,
    isEnabled: false,
    isLocked: true,
    expiresIn: RemainingTime,
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
        expiresIn: number;
      }>
    ) {
      const { token, isEnabled, isLocked, expiresIn } = action.payload;
      state.token = token;
      state.authenticated = true;
      state.isEnabled = isEnabled;
      state.isLocked = isLocked;
      state.expiresIn = expiresIn;
      sessionStorage.setItem("lb-token", state.token);
      sessionStorage.setItem("exp", state.expiresIn.toString());
    },
    logout(state) {
      sessionStorage.removeItem("lb-token");
      sessionStorage.removeItem("exp");
      state.authenticated = false;
    },
    refreshToken(
      state,
      action: PayloadAction<{ token: string; expiresIn: number }>
    ) {
      const { token, expiresIn } = action.payload;
      state.token = token;
      state.expiresIn = expiresIn;
      sessionStorage.setItem("lb-token", state.token);
      sessionStorage.setItem("exp", state.expiresIn.toString());
    },
  },
});

const authActions = authSlice.actions;

export { authActions, authSlice };
