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

// const customer: CustomerDetails = {
//   accountNum: "",
//   routingNum: "",
//   fName: "",
//   lName: "",
//   email: "",
//   funds: 0,
//   country: "",
//   area: "",
//   zipCode: "",
//   isEnabled: true,
//   isLocked: false,
//   token: randomBytes(16).toString("hex"),
//   authenticated: false,
//   expiresIn: 0,
//   transactions: [],
// };

describe("Profile Test Suite", () => {
  test("Profile Loads correctly", async () => {
    // render(
    //   <Provider store={store}>
    //     <ThemeProvider theme={theme}>
    //       <BrowserRouter>
    //         <Suspense fallback={<LoadingSpinner />}>
    //           <Profile
    //             API_VERSION={API_VERSION}
    //             Location={window.location}
    //             customer={customer}
    //             mobile={false}
    //           />
    //         </Suspense>
    //       </BrowserRouter>
    //     </ThemeProvider>
    //   </Provider>
    // );
    const TextMatch = await screen.findByText(
      /Summary/i,
      { exact: false },
      { interval: 5000 }
    );
    expect(TextMatch).toBeInTheDocument;
  });
});
