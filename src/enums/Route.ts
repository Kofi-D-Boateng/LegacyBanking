enum AppRoute {
  MAINPROFILE = "profile",
  SUMMARY = "account-summary",
  PROFILE = "/profile/*",
  HOME = "/",
  ABOUT = "/about",
  LOCATIONS = "/locations",
  INVESTMENTS = "/investments/*",
  CONTACT = "/contact",
  SIGNUP = "/signup",
  LOGIN = "/login",
  INSIGHT = "/insight",
  STARTUPS = "/startups",
  DISABLED = "/error/locked-account",
  VERIFYACCOUNT = "/confirm-account",
  REDIRECT = "*",
}

export default AppRoute;
