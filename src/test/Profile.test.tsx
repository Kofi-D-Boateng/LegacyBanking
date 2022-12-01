import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { store } from "../store/store";
import { API_VERSION } from "../components/UI/Constants/Constants";
import { Suspense } from "react";
import LoadingSpinner from "../components/UI/Modals/LoadingSpinner/LoadingSpinner";
import Profile from "../pages/Profile";
import { CustomerDetails } from "../types/CustomerDetails";
import { randomBytes } from "crypto";
import { theme } from "../setupTests";

const token = randomBytes(16).toString("hex");
const timestamp = new Date().getTime();
const isActivated = true;

const customer: CustomerDetails = {
  token: token,
  authenticated: token ? true : false,
  expiresIn: timestamp,
  fName: "",
  lName: "",
  email: "",
  country: "",
  area: "",
  zipCode: "",
  isActivated: isActivated,
  transactions: [],
  accounts: [],
  cards: [],
  getInfo: true,
};

describe("Profile Test Suite", () => {
  test("Profile Loads correctly", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile mobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const TextMatch = await waitFor(() =>
      screen.findByText(/Full Account Number/i, {
        exact: false,
      })
    );
    expect(TextMatch).toBeInTheDocument();
  });

  test("Modals open correctly", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile mobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const SecurityBtn = await waitFor(() =>
      screen.findByRole("button", { name: "Account Security", exact: true })
    );
    userEvent.click(SecurityBtn);
    const TextMatch = await waitFor(() =>
      screen.findByText(/Account Security/, { exact: true })
    );
    expect(TextMatch).toBeInTheDocument();
  });

  test("Open account activity to display transactions", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile mobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const activityBtns = await waitFor(() => screen.findAllByRole("button"));
    const chevron = activityBtns.find((btn) => {
      return btn.id === "account-btn";
    });
    if (chevron) {
      userEvent.click(chevron);
    }
    const increaseBtn = await waitFor(() =>
      screen.findByRole("button", {
        name: "See more activity",
      })
    );
    expect(increaseBtn).toBeInTheDocument();
  });

  test("Page change to Summary", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile mobile={false} />
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const summaryLink = screen.getByRole("link");
    userEvent.click(summaryLink);
    expect(summaryLink).not.toBeInTheDocument();

    const TextMatch = screen.getByText("You have spent $0.00 this month", {
      exact: true,
    });
    expect(TextMatch).toBeInTheDocument();
  });

  // test("Sending a transfer", async () => {
  //   render(
  //     <Provider store={store}>
  //       <ThemeProvider theme={theme}>
  //         <BrowserRouter>
  //           <Suspense fallback={<LoadingSpinner />}>
  //             <Profile
  //
  //
  //               mobile={false}
  //             />
  //           </Suspense>
  //         </BrowserRouter>
  //       </ThemeProvider>
  //     </Provider>
  //   );
  //   userEvent.click(
  //     screen.getByRole("button", {
  //       name: "Money Transfer",
  //     })
  //   );
  //   expect(
  //     screen.getByRole("button", {
  //       name: "Money Transfer",
  //     })
  //   ).toBeInTheDocument();
  //   const TextField = await waitFor(() =>
  //     screen.findByLabelText("Send By", {}, { interval: 3000 })
  //   );
  //   console.log(TextField);
  //   userEvent.click(TextField);
  // });
});
