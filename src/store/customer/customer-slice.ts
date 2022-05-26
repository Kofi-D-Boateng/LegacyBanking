import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../Interfaces/Customer";
const DATE: Date = new Date();

function initialState(): Customer {
  const token: string | null = sessionStorage.getItem("lb-token");
  const exp: string | null = sessionStorage.getItem("exp");
  const status: string | null = sessionStorage.getItem("status");
  const RemainingTime: number = +exp! || 0;
  return {
    token: token,
    authenticated: token ? true : false,
    expiresIn: RemainingTime,
    fName: "",
    lName: "",
    email: "",
    accountNum: "",
    routingNum: "",
    country: "",
    area: "",
    zipCode: "",
    funds: 0,
    isLocked: true,
    isEnabled: status as unknown as boolean,
    transactions: [
      { id: 0, amount: 0, dateOfTransaction: "", location: "", type: "" },
    ],
    accountTransfer: {
      accountNumber: "",
      amount: 0,
      email: undefined,
      type: "",
      phoneNumber: undefined,
    },
  };
}

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState(),
  reducers: {
    getCreds(
      state,
      action: PayloadAction<{
        token: string;
        expiresIn: number;
        isLocked: boolean;
        isEnabled: boolean;
      }>
    ) {
      const { token, expiresIn, isLocked, isEnabled } = action.payload;
      state.token = token;
      state.authenticated = true;
      state.isEnabled = isEnabled ? true : state.isEnabled;
      state.isLocked = !isLocked ? isLocked : state.isLocked;
      state.expiresIn = expiresIn + DATE.getTime();
      sessionStorage.setItem("lb-token", state.token);
      sessionStorage.setItem("exp", state.expiresIn.toString());
      sessionStorage.setItem("status", state.isEnabled as unknown as string);
    },
    createCustomer(
      state,
      action: PayloadAction<{
        fName: string;
        lName: string;
        email: string;
        accountingNum: string;
        routingNum: string;
        country: string | undefined;
        area: string | undefined;
        zipCode: string | undefined;
        funds: number;
        isEnabled: boolean;
        isLocked: boolean;
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
        isEnabled,
        isLocked,
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
      state.isEnabled = isEnabled;
      state.isLocked = isLocked;
      state.transactions =
        transactions.length > state.transactions.length
          ? transactions.reverse()
          : state.transactions;
    },
    createTransfer(
      state,
      action: PayloadAction<{
        email: string | undefined;
        amount: number;
        accountNumber: string;
        type: string;
        phoneNumber: string | undefined;
      }>
    ) {
      const { email, amount, accountNumber, type, phoneNumber } =
        action.payload;
      state.accountTransfer.accountNumber = accountNumber;
      state.accountTransfer.amount = amount;
      state.accountTransfer.email = email;
      state.accountTransfer.type = type;
      state.accountTransfer.phoneNumber = phoneNumber;
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

const customerActions = customerSlice.actions;

export { customerActions, customerSlice };
