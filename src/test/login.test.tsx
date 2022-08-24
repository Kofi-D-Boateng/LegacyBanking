import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { API_VERSION } from "../components/UI/Constants/Constants";
import Login from "../pages/Login";
import { Suspense } from "react";
import LoadingSpinner from "../components/UI/Modals/LoadingSpinner/LoadingSpinner";
import { LoginCredentials } from "../types/Credentials";

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

const Credentials: LoginCredentials = {
  email: "something@email.com",
  password: "pass123",
};

describe("Login test suite. Profile exclusive", () => {
  test("login attempt that will land on suspense", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Login API_VERSION={API_VERSION} isMobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const username = screen.getByPlaceholderText(/enter email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submit = screen.getByRole("button", { name: /Login/i });
    userEvent.click(username);
    userEvent.type(username, Credentials.email as string);
    userEvent.click(password);
    userEvent.type(password, Credentials.password as string);
    userEvent.dblClick(submit);
    await waitFor(() => expect(submit).not.toBeInTheDocument);
  });

  test("Faulty login", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Login API_VERSION={API_VERSION} isMobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });
});
