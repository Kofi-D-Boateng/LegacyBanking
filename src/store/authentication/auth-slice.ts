import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  token: string;
  authenticated: boolean;
} {
  const token = sessionStorage.getItem("lb-token");
  if (token !== null) {
    return {
      token: token,
      authenticated: true,
    };
  } else {
    return {
      token: "",
      authenticated: false,
    };
  }
}

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState(),
  reducers: {
    getCreds(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;
      state.token = token;
      state.authenticated = true;
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
