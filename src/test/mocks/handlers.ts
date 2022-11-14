import { randomBytes } from "crypto";
import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw/lib";
import { API_VERSION } from "../../components/UI/Constants/Constants";
import { Bank, Credentials, customer } from "../../setupTests";
import { BankDetails } from "../../types/Bank";
import { LoginCredentials } from "../../types/Credentials";
import { CustomerDetails } from "../../types/CustomerDetails";

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
