import Header from "./Header";
import { renderWithProviders } from "../../utils/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/dom";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Header tests", () => {
  test("Header render", async () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: /Postik/i })).toBeInTheDocument();
    //expect(screen.getByText("Drawer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "search" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /sign in/i }));

    await waitFor(() => {
      screen.getByText("Авторизация");
    });

    expect(screen.getByText("Авторизация")).toBeInTheDocument();
  });
});
