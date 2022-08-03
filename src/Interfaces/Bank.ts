interface Branch {
  name: string;
  country: string;
  state: string;
  zipcode: string;
  totalHoldings: number;
  latitude: number;
  longitude: number;
}

export interface BankDetails {
  name: string;
  country: string;
  area: string;
  zipcode: string;
  totalHoldings: number;
  branches: Branch[];
}
