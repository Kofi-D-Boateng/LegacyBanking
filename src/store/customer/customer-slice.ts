import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Account,
  Card,
  CustomerDetails,
  Transaction,
} from "../../types/CustomerDetails";
const DATE: Date = new Date();

function initialState(): CustomerDetails {
  const token: string | null = localStorage.getItem("lb-token");
  const exp: string | null = localStorage.getItem("exp");
  const isActivated: string | null = localStorage.getItem("enabled");
  const RemainingTime: number = +exp! || 0;
  return {
    token: token,
    authenticated: token ? true : false,
    expiresIn: RemainingTime,
    fName: "",
    lName: "",
    email: "",
    country: "",
    area: "",
    zipCode: "",
    isActivated: isActivated as unknown as boolean,
    transactions: [],
    accounts: [],
    cards: [],
    getInfo: true,
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
        isActivated: boolean;
      }>
    ) {
      const { token, expiresIn, isActivated } = action.payload;
      state.token = token;
      state.authenticated = true;
      state.isActivated = isActivated;
      state.expiresIn = expiresIn + DATE.getTime();
      localStorage.setItem("lb-token", state.token);
      localStorage.setItem("exp", state.expiresIn.toString());
      localStorage.setItem("enabled", "true");
    },
    createCustomer(
      state,
      action: PayloadAction<{
        fName: string;
        lName: string;
        email: string;
        country: string | undefined;
        area: string | undefined;
        zipCode: string | undefined;
        transactions: Transaction[];
        accounts: Account[];
        cards: Card[];
      }>
    ) {
      const {
        fName,
        lName,
        email,
        area,
        country,
        zipCode,
        transactions,
        accounts,
        cards,
      } = action.payload;
      state.fName = fName ? fName : state.fName;
      state.lName = lName ? lName : state.lName;
      state.email = email ? email : state.email;
      state.country = country ? country : state.country;
      state.area = area ? area : state.area;
      state.zipCode = zipCode ? zipCode : state.zipCode;
      state.transactions =
        transactions.length > state.transactions.length
          ? transactions.reverse()
          : state.transactions;
      state.accounts = accounts;
      state.cards = cards;
      state.getInfo = false;
    },
    logout(state) {
      localStorage.removeItem("lb-token");
      localStorage.removeItem("exp");
      localStorage.removeItem("enabled");
      state.authenticated = false;
    },
    refreshToken(
      state,
      action: PayloadAction<{ token: string; expiresIn: number }>
    ) {
      const { token, expiresIn } = action.payload;
      state.token = token;
      state.expiresIn = expiresIn + DATE.getTime();
      localStorage.setItem("lb-token", state.token);
      localStorage.setItem("exp", state.expiresIn.toString());
    },
    resetInfo(state) {
      state.getInfo = true;
    },
  },
});

const customerActions = customerSlice.actions;

export { customerActions, customerSlice };
