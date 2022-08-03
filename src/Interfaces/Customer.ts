interface Transaction {
  id: number;
  type: string;
  dateOfTransaction: string;
  amount: number;
  location: string;
}

export interface CustomerDetails {
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
  transactions: Transaction[];
  token: string | null;
  authenticated: boolean;
  expiresIn: number;
}
