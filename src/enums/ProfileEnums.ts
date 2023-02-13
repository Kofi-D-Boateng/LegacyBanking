export enum AccountType {
  CHECKING = "CHECKING",
  CREDIT = "CREDIT",
  SAVINGS = "SAVINGS",
}

export enum CardType{
  CREDIT = "CREDIT",
  DEBIT = "DEBIT"
}

export enum CreditType {
  PLATINUM = "PLATINUM",
  BLACK = "BLACK",
  EMERALD = "EMERALD",
  NONE = "NONE"
}

export enum CreditLine {
  BLACK_CREDIT_LINE = 100000.0,
  EMERALD_CREDIT_LINE = 5000.0,
  PLATINUM_CREDIT_LINE = 10000.0,
  NONE = 0.0
}

export enum TransactionType {
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  WITHDRAWL = "WITHDRAWL",
  PURCHASE = "PURCHASE",
  REFUND = "REFUND",
}

export enum TransactionEnv{
  ONLINE = "ONLINE-TRANSACTION",
  ATM = "ATM-TRANSACTION",
  MOBILE = "MOBILE-TRANSACTION",
  VENDOR = "VENDOR-TRANSACTION"
}

export enum ProfileModal {
  SECURITY = "Account Security",
  STATEMENT = "Statement",
  PAPERLESS = "Paperless",
  MONEYTRANSFER = "Money Transfer",
  ACCOUNTNUMBER = "Full account numbers",
  LOCKACCOUNT = "Lock your account",
  LOCKCARD = "Lock your card",
}
