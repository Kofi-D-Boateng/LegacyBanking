import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../Interfaces/Auth";
const DATE: Date = new Date();

function initialState(): Auth {
  const token = sessionStorage.getItem("lb-token");
  const exp = sessionStorage.getItem("exp");
  const RemainingTime = +exp! || 0;

  return {
    token: token,
    authenticated: token ? true : false,
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
        expiresIn: number;
      }>
    ) {
      const { token, expiresIn } = action.payload;
      state.token = token;
      state.authenticated = true;
      state.expiresIn = expiresIn + DATE.getTime();
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
      state.expiresIn = expiresIn + DATE.getTime();
      sessionStorage.setItem("lb-token", state.token);
      sessionStorage.setItem("exp", state.expiresIn.toString());
    },
  },
});

const authActions = authSlice.actions;

export { authActions, authSlice };
