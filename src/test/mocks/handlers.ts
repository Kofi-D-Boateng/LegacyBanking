import { randomBytes } from "crypto";
import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw/lib";
import { API_VERSION } from "../../components/UI/Constants/Constants";
import { BankDetails } from "../../types/Bank";
import { LoginCredentials } from "../../types/Credentials";
import { CustomerDetails } from "../../types/CustomerDetails";

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

// const customer: CustomerDetails = {
//   accountNum: "1200" + randomBytes(10).toString("base64"),
//   routingNum: "5000" + randomBytes(10).toString("base64"),
//   fName: "John",
//   lName: "Doe",
//   email: "email@email.com",
//   funds: 150000.15,
//   country: "United States",
//   area: "Texas",
//   zipCode: "78342",
//   isEnabled: true,
//   isLocked: false,
//   token: "",
//   authenticated: true,
//   expiresIn: 100000000,
//   transactions: [],
// };

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
          isEnabled: true,
          isLocked: false,
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
      // customer["token"] = token;
      if (token) {
        // return res(ctx.status(200), ctx.json(customer));
      }
      return res(ctx.status(400));
    }
  ),
];
