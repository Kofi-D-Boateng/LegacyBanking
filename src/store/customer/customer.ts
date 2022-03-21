import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  fName: string | undefined;
  lName: string | undefined;
  email: string | undefined;
  accountNum: string | undefined;
  routingNum: string | undefined;
  country: string | undefined;
  area: string | undefined;
  zipCode: string | undefined;
  funds: number | undefined;
} {
  return {
    fName: "",
    lName: "",
    email: "",
    accountNum: "",
    routingNum: "",
    country: "",
    area: "",
    zipCode: "",
    funds: 0,
  };
}

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState(),
  reducers: {
    createCustomer(
      state,
      action: PayloadAction<{
        fName: string | undefined;
        lName: string | undefined;
        email: string | undefined;
      }>
    ) {
      const { fName, lName, email } = action.payload;
      state.fName = fName;
      state.lName = lName;
      state.email = email;
    },
  },
});

const customerActions = customerSlice.actions;

export { customerActions, customerSlice };
