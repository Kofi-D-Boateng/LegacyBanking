import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  fName: string;
  lName: string;
  email: string;
  accountNum: string | undefined;
  routingNum: string | undefined;
  country: string | undefined;
  area: string | undefined;
  zipCode: string | undefined;
  funds: number;
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
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
    transactions: [
      { id: 0, amount: 0, dateOfTransaction: "", location: "", type: "" },
    ],
  };
}

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState(),
  reducers: {
    createCustomer(
      state,
      action: PayloadAction<{
        fName: string;
        lName: string;
        email: string;
        accountingNum: string | undefined;
        routingNum: string | undefined;
        country: string | undefined;
        area: string | undefined;
        zipCode: string | undefined;
        funds: number;
        transactions: {
          id: number;
          type: string;
          dateOfTransaction: string;
          amount: number;
          location: string;
        }[];
      }>
    ) {
      const {
        fName,
        lName,
        email,
        accountingNum,
        routingNum,
        area,
        country,
        zipCode,
        funds,
        transactions,
      } = action.payload;
      state.fName = fName ? fName : state.fName;
      state.lName = lName ? lName : state.lName;
      state.email = email ? email : state.email;
      state.accountNum = accountingNum ? accountingNum : state.accountNum;
      state.routingNum = routingNum ? routingNum : state.routingNum;
      state.country = country ? country : state.country;
      state.area = area ? area : state.area;
      state.zipCode = zipCode ? zipCode : state.zipCode;
      state.funds = funds ? funds : state.funds;
      state.transactions =
        transactions.length > state.transactions.length
          ? transactions.reverse()
          : state.transactions;
    },
  },
});

const customerActions = customerSlice.actions;

export { customerActions, customerSlice };
