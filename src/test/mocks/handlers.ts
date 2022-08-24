import { DefaultBodyType, MockedRequest, rest, RestHandler } from "msw";
import { API_VERSION } from "../../components/UI/Constants/Constants";
import { BankDetails } from "../../types/Bank";

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

export const handlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  rest.post(`/${API_VERSION}/authentication/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "abdb23231232jdsaWEDwdxaCDA",
        expiresIn: 100000,
        isEnabled: true,
        isLocked: false,
      })
    );
  }),
  rest.get(`/${API_VERSION}/bank/info`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Bank));
  }),
  rest.post(`${API_VERSION}/authentication/registration`, (req, res, ctx) => {
    console.log(req.body);
    // if (req.bodyUsed) {
    //   return res(ctx.status(200), ctx.json({ isSaved: true }));
    // } else {
    //   return res(ctx.status(400), ctx.json({ isSaved: false }));
    // }
    return res(ctx.status(200), ctx.json({ isSaved: true }));
  }),
];
