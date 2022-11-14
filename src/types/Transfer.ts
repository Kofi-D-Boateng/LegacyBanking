export type TransferDetails = {
  email: string;
  emailOfTransferee: string | undefined;
  amount: number;
  accountNumber: string;
  bankAccountType: string;
  phoneNumberOfTransferee: string | undefined;
  transactionType: string;
};
