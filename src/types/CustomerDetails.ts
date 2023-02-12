import { AccountType, CardType } from "../enums/ProfileEnums";

export type Transaction = {
  id: number;
  amount: number;
  accountNumber: string;
  location: string;
  cardType: string;
  dateOfTransaction: string;
  dateTransactionPosted: string;
  transactionType: string;
  merchantDescription: string;
  merchantName: string;
  recipient: string;
};

export type Card = {
  id: number;
  cardNumber: string;
  cardVerificationCode: string;
  expirationDate: string;
  isLocked: boolean;
  type: string;
  creditType: CardType;
};

export type Account = {
  id: number;
  accountNumber: string;
  routingNumber: string;
  bankAccountType: AccountType;
  capital: number;
  creditType: string;
  isEnable: boolean;
  minimumBalance: number;
  minimumPayment: number;
  usedCredit: number;
  annualPercentageRate: number;
};

export type CustomerDetails = {
  getInfo: boolean;
  fName: string;
  lName: string;
  email: string;
  country: string | undefined;
  area: string | undefined;
  zipCode: string | undefined;
  isActivated: boolean;
  transactions: Transaction[];
  accounts: Account[];
  cards: Card[];
  authenticated: boolean;
  expiresIn: number;
};
