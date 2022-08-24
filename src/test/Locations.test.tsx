import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import { API_VERSION } from "../components/UI/Constants/Constants";
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

describe("Locations test suite", () => {
  test("Location page renders with bank info", async () => {
    // render(
    //   <Provider store={store}>
    //     <ThemeProvider theme={theme}>
    //       <BrowserRouter>
    //         <Suspense fallback={<LoadingSpinner />}>
    //           <Locations isMobile={false} API_VERSION={API_VERSION} />
    //         </Suspense>
    //       </BrowserRouter>
    //     </ThemeProvider>
    //   </Provider>
    // );
  });
});
