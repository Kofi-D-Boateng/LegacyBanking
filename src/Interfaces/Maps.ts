export interface DateAmountHash {
  [date: string]: number;
}

export interface DateAmount {
  date: string;
  amount: number;
}

export interface MonthsMap {
  [date: number]: string;
}

export interface LocationMap {
  country: string;
  state: string;
  x: number;
  y: number;
}
