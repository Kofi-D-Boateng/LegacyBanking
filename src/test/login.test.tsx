import { ThemeProvider } from "@emotion/react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import Login from "../pages/Login";
import { Suspense } from "react";
import LoadingSpinner from "../components/UI/Modals/LoadingSpinner/LoadingSpinner";
import { LoginCredentials } from "../types/Credentials";
import { theme } from "../setupTests";

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
              <Login isMobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const username = screen.getByPlaceholderText(/enter email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submit = await waitFor(() =>
      screen.findByRole("button", { name: /Login/i })
    );
    userEvent.click(username);
    userEvent.type(username, Credentials.email as string);
    userEvent.click(password);
    userEvent.type(password, Credentials.password as string);
    userEvent.dblClick(submit);
    expect(submit).not.toBeInTheDocument();
  });

  test("Faulty login", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Login isMobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const username = screen.getByPlaceholderText(/enter email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submit = await waitFor(() =>
      screen.findByRole("button", { name: /Login/i })
    );
    userEvent.click(username);
    userEvent.type(username, Credentials.email as string);
    userEvent.click(password);
    userEvent.type(password, "wrong password");
    userEvent.dblClick(submit);
    const TextMatch = await waitFor(() =>
      screen.findByText(/Invalid email or password/i, {
        exact: false,
      })
    );
    expect(TextMatch).toBeInTheDocument();
  });
});
