import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";

const theme: {} = createTheme({
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

const ROOT = ReactDOM.createRoot(
  (document.getElementById("root") as Element) || DocumentFragment
);
ROOT.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
