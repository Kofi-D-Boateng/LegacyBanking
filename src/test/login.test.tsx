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
import Login from "../pages/Login";
import "@testing-library/jest-dom/extend-expect";

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

const server: SetupServerApi = setupServer(
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
  })
);

describe("Login test suite. Profile exclusive", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterAll(() => server.resetHandlers());

  test("login attempt that will land on suspense", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Login API_VERSION={API_VERSION} isMobile={false} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const email = "something@email.com";
    const pw = "pass123";
    const username = screen.getByPlaceholderText(/enter email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submit = screen.getByRole("button", { name: /Login/i });
    userEvent.click(username);
    userEvent.type(username, email);
    userEvent.click(password);
    userEvent.type(password, pw);
    userEvent.dblClick(submit);
    const progressbar = await screen.findByRole("progressbar");
    console.log(progressbar);
    await waitFor(() => expect(progressbar).toBeInTheDocument());
  });
});
