import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { setupServer, SetupServerApi } from "msw/node";
import { rest } from "msw";
import { API_VERSION } from "../components/UI/Constants/Constants";
import { BankDetails } from "../types/Bank";
import { Suspense } from "react";
import LoadingSpinner from "../components/UI/Modals/LoadingSpinner/LoadingSpinner";
import Locations from "../pages/Locations";

const theme = createTheme({
  palette: {
    primary: {
      main: "#03a9f4",
    },
    secondary: {
      main: "#FEFDFC",
    },
  },
  typography: {
    fontFamily: "Noto JP Sans",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

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

const server: SetupServerApi = setupServer(
  rest.get(`/${API_VERSION}/bank/info`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Bank));
  })
);

describe("Locations test suite", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterAll(() => server.resetHandlers());

  test("Location page renders with bank info", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Locations isMobile={false} API_VERSION={API_VERSION} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });
});
