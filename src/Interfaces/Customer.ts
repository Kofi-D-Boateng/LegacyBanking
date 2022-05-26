export interface Customer {
  fName: string;
  lName: string;
  email: string;
  accountNum: string;
  routingNum: string;
  country: string | undefined;
  area: string | undefined;
  zipCode: string | undefined;
  funds: number;
  isLocked: boolean;
  isEnabled: boolean;
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  accountTransfer: {
    email: string | undefined;
    amount: number;
    accountNumber: string;
    type: string;
    phoneNumber: string | undefined;
  };
  token: string | null;
  authenticated: boolean;
  expiresIn: number;
}
