import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  token: string | undefined | null;
  authenticated: boolean;
} {
  const token = sessionStorage.getItem("lb-token");
  if (typeof token === "string") {
    return {
      token: token,
      authenticated: true,
    };
  } else {
    return {
      token: undefined,
      authenticated: false,
    };
  }
}

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState(),
  reducers: {
    getCreds(
      state,
      action: PayloadAction<{ token: string | undefined | null }>
    ) {
      const { token } = action.payload;
      state.token = token;
      state.authenticated = true;
    },
  },
});

const authActions = authSlice.actions;

export { authActions, authSlice };
