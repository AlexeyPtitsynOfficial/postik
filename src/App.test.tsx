import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { renderWithProviders } from "./utils/test-utils";
import { usePathname } from "next/navigation";

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

test("render app", () => {
  renderWithProviders(<App />);
  const element = screen.getByPlaceholderText(/Поиск…/i);
  expect(element).toBeInTheDocument();
});
