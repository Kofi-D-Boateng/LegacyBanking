// PROFILE STRING COMPARISON
const DEBITTRASFER: string = "Debit transfer";
const COMPARE: { key: number; title: string }[] = [
  { key: 1, title: DEBITTRASFER },
  { key: 2, title: "transfer" },
  { key: 3, title: "ACH Debit" },
  { key: 4, title: "withdrawal" },
  { key: 5, title: "Debit transfer" },
];

// ROUTES
const MAINPROFILE: string = "";
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
const REDIRECT: string = "*";
export {
  DEBITTRASFER,
  COMPARE,
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
};
