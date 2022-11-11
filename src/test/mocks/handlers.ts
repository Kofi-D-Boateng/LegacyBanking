import { randomBytes } from "crypto";
import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw/lib";
import { API_VERSION } from "../../components/UI/Constants/Constants";
import { BankDetails } from "../../types/Bank";
import { LoginCredentials } from "../../types/Credentials";
import { CustomerDetails } from "../../types/CustomerDetails";

const token = randomBytes(16).toString("hex");
const timestamp = new Date();
const isActivated = true;

const Bank: BankDetails = {
  name: "Legacy Bank",
  country: "United States",
  area: "New York",
  totalHoldings: 1000000000,
  zipcode: "75231",
  branches: [
    {
      name: "Legacy Banking International",
      country: "Japan",
      state: "Tokyo",
      zipcode: "200151",
      totalHoldings: 50000000.35,
      latitude: 35.6762,
      longitude: 139.6503,
    },
  ],
};

const Credentials: LoginCredentials = {
  email: "something@email.com",
  password: "pass123",
};

const customer: CustomerDetails = {
  token: token,
  authenticated: token ? true : false,
  expiresIn: timestamp.getTime(),
  fName: "Kofi",
  lName: "Boateng",
  email: "email1@email.com",
  country: "The United States",
  area: "Texas",
  zipCode: "76762",
  isActivated: isActivated,
  transactions: [
    {
      id: 1,
      transactionType: "DEPOSIT",
      amount: 1500.16,
      dateOfTransaction: timestamp.toISOString(),
      dateTransactionPosted: timestamp.toISOString(),
      location: "ONLINE",
      accountNumber: "",
      cardType: "",
      merchantDescription: "",
      merchantName: "",
      recipient: "",
    },
  ],
  accounts: [
    {
      id: 1,
      accountNumber: "1200876342",
      routingNumber: "5300245231",
      annualPercentageRate: 28.0,
      bankAccountType: "CREDIT",
      capital: 10000.0,
      isEnable: true,
      minimumBalance: 0.0,
      minimumPayment: 0.0,
      usedCredit: 500.25,
    },
  ],
  cards: [
    {
      id: 1,
      cardNumber: "6534678800232915",
      cardVerificationCode: "013",
      creditCardType: "PLATINUM",
      expirationDate: timestamp.toISOString(),
      isLocked: false,
      type: "CREDIT",
    },
  ],
  getInfo: true,
};

export const handlers: RestHandler[] = [
  rest.post(`${API_VERSION}/authentication/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email != Credentials.email) {
      return res(ctx.status(400));
    } else if (password != Credentials.password) {
      return res(ctx.status(400));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          token: "abdb23231232jdsaWEDwdxaCDA",
          expiresIn: 100000,
          isActivated: true,
        })
      );
    }
  }),
  rest.get(`/${API_VERSION}/bank/info`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Bank));
  }),
  rest.post(`${API_VERSION}/authentication/registration`, (req, res, ctx) => {
    console.log(req.json());
    // if (req.bodyUsed) {
    //   return res(ctx.status(200), ctx.json({ isSaved: true }));
    // } else {
    //   return res(ctx.status(400), ctx.json({ isSaved: false }));
    // }
    return res(ctx.status(200), ctx.json({ isSaved: true }));
  }),
  rest.get(`/${API_VERSION}/bank/info`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Bank));
  }),
  rest.get(
    `${API_VERSION}/authentication/profile/info`,
    async (req, res, ctx) => {
      const token = req.headers.get("authorization");
      customer["token"] = token;
      if (token) {
        return res(
          ctx.status(200),
          ctx.json({
            fName: customer.fName,
            lName: customer.lName,
            email: customer.email,
            country: customer.country,
            state: customer.area,
            transactions: customer.transactions,
            zipCode: customer.zipCode,
            accounts: customer.accounts,
            cards: customer.cards,
            isActivated: customer.isActivated,
            notis: [],
          })
        );
      }
      return res(ctx.status(400));
    }
  ),
];
