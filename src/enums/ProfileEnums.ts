export enum AccountType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  SAVINGS = "SAVINGS",
}

export enum CreditType {
  PLATINUM = "PLATINUM",
  BLACK = "BLACK",
  EMERALD = "EMERALD",
}

export enum CreditLine {
  BLACK_CREDIT_LINE = 100000.0,
  EMERALD_CREDIT_LINE = 5000.0,
  PLATINUM_CREDIT_LINE = 10000.0,
}

export enum TransactionType {
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  WITHDRAWL = "WITHDRAWL",
  PURCHASE = "PURCHASE",
  REFUND = "REFUND",
}

export enum ProfileModal {
  SECURITY = "Account Security",
  STATEMENT = "statement",
  PAPERLESS = "paperless",
  MONEYTRANSFER = "Money Transfer",
  ACCOUNTNUMBER = "Full account numbers",
  LOCKACCOUNT = "Lock your account",
  LOCKCARD = "Lock your card",
}
