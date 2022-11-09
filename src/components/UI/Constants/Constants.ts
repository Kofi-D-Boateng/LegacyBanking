import { MonthsMap } from "../../../types/Maps";

// BACKEND URL
const API_VERSION: string | undefined =
  process.env.REACT_APP_API_VERSION || "api/v2";
const BUFFERTIME: number =
  parseInt(process.env.REACT_APP_BUFFERTIME!) || 10000 * 6 * 5;

// PROFILE STRING COMPARISON
const DEBITTRASFER: string = "Debit transfer";
const TRANSFER: string = "TRANSFER";
const DEPOSIT: string = "DEPOSIT";
const WITHDRAWAL: string = "WITHDRAWL";
const PURCHASE: string = "PURCHASE";
const REFUND: string = "REFUND";

// ACCOUNT TYPES
const CREDIT: string = "CREDIT";
const DEBIT: string = "DEBIT";

// CREDIT LINES
const EMERALD_CREDIT_LINE: number = 5000.0;
const BLACK_CREDIT_LINE: number = 100000.0;
const PLATINUM_CREDIT_LINE: number = 10000.0;

// ROUTES
const MAINPROFILE: string = "profile";
const SUMMARY: string = "account-summary";
const CREDITSCORE: string = "credit-score";
const LOANS: string = "personal-loans";
const PAYMENT: string = "payments";
const PROFILE: string = "/profile/*";
const HOME: string = "/";
const ABOUT: string = "/about";
const LOCATIONS: string = "/locations";
const INVESTMENTS: string = "/investments/*";
const CONTACT: string = "/contact";
const SIGNUP: string = "/signup";
const LOGIN: string = "/login";
const INSIGHT: string = "/insight";
const STARTUPS: string = "/startups";
const DISABLED: string = "/error/locked-account";
const VERIFYACCOUNT: string = "/confirm-account";
const REDIRECT: string = "*";

// MODAL VALUES
const SECURITY: string = "Account Security";
const STATEMENT: string = "Statement";
const PAPERLESS: string = "Paperless";
const MONEYTRANSFER: string = "Money Transfer";
const ACCOUNTNUMBER: string = "Full account numbers";
const LOCKACCOUNT: string = "Lock your account";
const LOCKCARD: string = "Lock your card";

// BUTTON VALUES
const FORWARD: string = "forward";
const BACKWARD: string = "backward";
const LOCKEDCARD: string = "Locked Card";
const LOCKEDACCOUNT: string = "Locked Account";

// SOCIAL LINKS
const TWITTER: string = "www.twitter.com";
const FACEBOOK: string = "www.facebook.com";
const INSTAGRAM: string = "www.instagram.com";
const LINKEDIN: string = "www.linkedin.com";

// MESSAGES
const LOCKEDCARDMSG: string =
  "Your card has been recently locked by you or for fraudulent activities. Please check your email for steps on access to a new card";
const LOCKEDACCOUNTMSG: string =
  "Your account has been temporarily locked. Please check your email in regards for next steps on gaining access to your account.";
const SECURITYERRORMSG: string =
  "We are sorry, there was an error processing your request on our end.";

// MISC
const ReactLeafLetTitleLayer: { att: string; url: string } = {
  att: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const MonthMap: MonthsMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export {
  ReactLeafLetTitleLayer,
  DEBITTRASFER,
  DEPOSIT,
  TRANSFER,
  WITHDRAWAL,
  SUMMARY,
  CREDITSCORE,
  LOANS,
  PAYMENT,
  MAINPROFILE,
  ABOUT,
  CONTACT,
  HOME,
  INVESTMENTS,
  LOCATIONS,
  PROFILE,
  REDIRECT,
  SIGNUP,
  LOGIN,
  SECURITY,
  BACKWARD,
  FORWARD,
  MONEYTRANSFER,
  PAPERLESS,
  STATEMENT,
  ACCOUNTNUMBER,
  LOCKACCOUNT,
  LOCKCARD,
  LOCKEDACCOUNT,
  LOCKEDCARD,
  LOCKEDACCOUNTMSG,
  LOCKEDCARDMSG,
  SECURITYERRORMSG,
  INSIGHT,
  STARTUPS,
  DISABLED,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  TWITTER,
  BUFFERTIME,
  VERIFYACCOUNT,
  API_VERSION,
  PURCHASE,
  REFUND,
  CREDIT,
  DEBIT,
  MonthMap,
  BLACK_CREDIT_LINE,
  EMERALD_CREDIT_LINE,
  PLATINUM_CREDIT_LINE,
};
