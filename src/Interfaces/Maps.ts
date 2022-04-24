export interface DateAmountHash {
  [date: string]: number;
}

export interface DateAmountType {
  date: string;
  amount: number;
  type: string;
}

export interface MonthsMap {
  [date: number]: string;
}
