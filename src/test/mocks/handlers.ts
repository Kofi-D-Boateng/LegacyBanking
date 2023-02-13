import { rest, RestHandler } from "msw/lib";
import { API_VERSION } from "../../components/UI/Constants/Constants";
import { Bank, Credentials, customer } from "../../setupTests";

export const handlers: RestHandler[] = [
  rest.post(`${API_VERSION}/customer/login`, async (req, res, ctx) => {
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
  rest.get(
    `${API_VERSION}/customer/profile`,
    async (req, res, ctx) => {
      const token = req.headers.get("authorization");
      console.log(token)
      // localStorage.setItem("token")  token;
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
            notifications: [],
          })
        );
      }
      return res(ctx.status(400));
    }
  ),
];
