import { ThemeProvider } from "@emotion/react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { theme } from "../setupTests";
import { store } from "../store/store";

describe("Navigation test suite. Profile exclusive", () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  test("link navigation", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    const links: HTMLElement[] = await waitFor(() =>
      screen.findAllByRole("link")
    );
    const aboutPageBtn = links[1];
    userEvent.click(aboutPageBtn);
    const aboutPage = await waitFor(() =>
      screen.findByText(/Purpose and values/i, {
        exact: false,
      })
    );
    expect(aboutPage).toBeInTheDocument();
  });
});
