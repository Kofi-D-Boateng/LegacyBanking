// BACKEND URL
const API_VERSION: string | undefined = process.env.API_VERSION || "api/v1";

const BUFFERTIME: number = parseInt(process.env.BUFFERTIME!) || 10000 * 6 * 5;

// PROFILE STRING COMPARISON
const DEBITTRASFER: string = "Debit transfer";
const TRANSFER: string = "transfer";
const ACHDEBIT: string = "ACH Debit";
const WITHDRAWAL: string = "withdrawal";

// ROUTES
const MAINPROFILE: string = "";
const SUMMARY: string = "account-summary";
const CREDITSCORE: string = "credit-score";
const LOANS: string = "personal-loans";
const PAYMENT: string = "payments";
const PROFILE: string = "/profile/**";
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

export {
  DEBITTRASFER,
  ACHDEBIT,
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
};
