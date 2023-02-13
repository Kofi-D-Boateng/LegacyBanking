// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { createTheme } from "@mui/material";
import "@testing-library/jest-dom";
import { randomBytes } from "crypto";
import { server } from "../src/test/mocks/server";
import { AccountType, CardType, CreditLine, CreditType } from "./enums/ProfileEnums";
import { BankDetails } from "./types/Bank";
import { LoginCredentials } from "./types/Credentials";
import { CustomerDetails } from "./types/CustomerDetails";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#03a9f4",
    },
    secondary: {
      main: "#FEFDFC",
    },
  },
  typography: {
    fontFamily: "Noto JP Sans",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const token = randomBytes(16).toString("hex");
export const timestamp = new Date();
export const isActivated = true;

export const Bank: BankDetails = {
  name: "Legacy Bank",
  country: "United States",
  area: "New York",
  totalHoldings: 1000000000,
  zipcode: "75231",
  branches: [
    {
      name: "Legacy Banking International",
      country: "Japan",
      state: "Tokyo",
      zipcode: "200151",
      totalHoldings: 50000000.35,
      latitude: 35.6762,
      longitude: 139.6503,
    },
  ],
};

export const Credentials: LoginCredentials = {
  email: "something@email.com",
  password: "pass123",
};

export const customer: CustomerDetails = {
  authenticated: token ? true : false,
  expiresIn: timestamp.getTime(),
  fName: "Kofi",
  lName: "Boateng",
  email: "email1@email.com",
  country: "The United States",
  area: "Texas",
  zipCode: "76762",
  isActivated: isActivated,
  transactions: [
    {
      id: 1,
      transactionType: "DEPOSIT",
      amount: 1500.16,
      dateOfTransaction: timestamp.toISOString(),
      dateTransactionPosted: timestamp.toISOString(),
      location: "ONLINE",
      accountNumber: "",
      cardType: CardType.DEBIT,
      merchantDescription: "",
      merchantName: "",
      recipient: "",
    },
  ],
  accounts: [
    {
      id: 1,
      accountNumber: "1200876342",
      routingNumber: "5300245231",
      annualPercentageRate: 0.0,
      bankAccountType: AccountType.CHECKING,
      capital: 10000.0,
      creditType: CreditType.NONE,
      isEnable: true,
      minimumBalance: 30.0,
      minimumPayment: 0.0,
      usedCredit: 0.0,
    },
  ],
  cards: [
    {
      id: 1,
      cardNumber: "6534678800232915",
      cardVerificationCode: "013",
      cardType:CardType.DEBIT,
      creditType:CreditType.NONE,
      expirationDate: timestamp.toISOString(),
      isLocked: false,
    },
  ],
  getInfo: true,
};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
