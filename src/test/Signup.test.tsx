import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { setupServer, SetupServerApi } from "msw/node";
import { rest } from "msw";
import { API_VERSION } from "../components/UI/Constants/Constants";
import Signup from "../pages/Signup";
import { Suspense } from "react";
import LoadingSpinner from "../components/UI/Modals/LoadingSpinner/LoadingSpinner";
import { UserSignUp } from "../types/Signup";

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
  rest.post(`${API_VERSION}/authentication/registration`, (req, res, ctx) => {
    console.log(req.body);
    // if (req.bodyUsed) {
    //   return res(ctx.status(200), ctx.json({ isSaved: true }));
    // } else {
    //   return res(ctx.status(400), ctx.json({ isSaved: false }));
    // }
    return res(ctx.status(200), ctx.json({ isSaved: true }));
  })
);

const SignupForm: UserSignUp = {
  firstName: "Kofi",
  lastName: "Boateng",
  email: "someEmail@gmail.com",
  country: "United States",
  state: "Texas",
  zipcode: "76012",
  dob: "09/11/1997",
  phoneNumber: "8179940932",
  socialSecurity: "234125432",
  password: "Password1!",
};

describe("Signup test suite", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterAll(() => server.resetHandlers());

  test("Signup page renders", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Signup isMobile={false} API_VERSION={API_VERSION} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    const htmlElement: HTMLElement = screen.getByText(/Please Signup/i, {
      exact: false,
    });
    expect(htmlElement).toBeInTheDocument();
  });

  test("Succesfull signup", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Signup isMobile={false} API_VERSION={API_VERSION} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const Date = screen.getByPlaceholderText(/enter date/i, { exact: false });

    const [
      firstName,
      lastName,
      email,
      country,
      state,
      zipcode,
      socialSecurity,
      phoneNumber,
      Password,
      confirmPassword,
    ] = screen.getAllByRole("textbox");
    const Btn = screen.getByRole("button", {
      name: /Submit/i,
      exact: false,
    });

    userEvent.click(firstName);
    userEvent.type(firstName, SignupForm.firstName as string);

    userEvent.click(lastName);
    userEvent.type(lastName, SignupForm.lastName as string);

    userEvent.click(Date);
    userEvent.type(Date, SignupForm.dob as string);

    userEvent.click(email);
    userEvent.type(email, SignupForm.email as string);

    userEvent.click(country);
    userEvent.type(country, SignupForm.country as string);

    userEvent.click(state);
    userEvent.type(state, SignupForm.state as string);

    userEvent.click(zipcode);
    userEvent.type(zipcode, SignupForm.zipcode as string);

    userEvent.click(socialSecurity);
    userEvent.type(socialSecurity, SignupForm.socialSecurity as string);

    userEvent.click(phoneNumber);
    userEvent.type(phoneNumber, SignupForm.phoneNumber as string);

    userEvent.click(Password);
    userEvent.type(Password, SignupForm.password as string);

    userEvent.click(confirmPassword);
    userEvent.type(confirmPassword, SignupForm.password as string);

    userEvent.click(Btn);

    // const loginPage = await screen.findByText(
    //   /Please login/i,
    //   { exact: false },
    //   { timeout: 1500 }
    // );

    // await waitFor(() => expect(loginPage).toBeInTheDocument());
  });
});
