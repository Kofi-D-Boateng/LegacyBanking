import { AccountType, CardType, CreditLine, CreditType } from "../enums/ProfileEnums";

export type Transaction = {
  id: number;
  amount: number;
  accountNumber: string;
  location: string;
  cardType: CardType;
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
  cardType: CardType;
  creditType:CreditType;
};

export type Account = {
  id: number;
  accountNumber: string;
  routingNumber: string;
  bankAccountType: AccountType;
  capital: number;
  creditType: CreditType;
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
