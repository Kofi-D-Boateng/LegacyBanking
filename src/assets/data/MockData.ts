export const MockStatements: {
  key: number;
  date: string;
  amount: number;
  amountPaid: number;
}[] = [
  { key: 1, date: "2022-02-05", amount: 200.52, amountPaid: 200.52 },
  { key: 2, date: "2022-03-05", amount: 1100.52, amountPaid: 1100.52 },
  { key: 3, date: "2022-04-05", amount: 280.52, amountPaid: 280.52 },
];

export const MockStatementsTitles: { key: number; title: string }[] = [
  { key: 1, title: "Date" },
  { key: 2, title: "Amount" },
  { key: 3, title: "Amount Paid" },
];
