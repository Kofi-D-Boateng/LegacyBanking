import { AccountType, TransactionEnv, TransactionType } from "../enums/ProfileEnums";

export type TransferRequest = {
  apiKey:string;
  email: string;
  emailOfTransferee: string | undefined;
  amount: number;
  accountNumber: string;
  bankAccountType: AccountType;
  phoneNumberOfTransferee: string | undefined;
  transactionType: TransactionType;
  transactionEnv:TransactionEnv
};
