import { fireEvent, screen } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";
import EditPostikDialog from "./EditPostikDialog";
import * as useAuth from "../../lib/hooks/useAuth";

jest.mock("../../lib/hooks/useAuth", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../lib/hooks/useAuth"),
    useAuth: jest.fn().mockReturnValue({
      user: {
        id: "",
        UserName: "Roberto Firmino",
        FirstName: "",
        LastName: "",
        Email: "",
        exp: 0,
        Role: "",
        sub: "",
      },
      update: (user: any) => null,
      initialized: true,
    }),
  };
});

describe("Edit postik tests", () => {
  test("should render", () => {
    /*jest.mock("../../lib/hooks/useAuth", () => {
      return {
        __esModule: true,
        ...jest.requireActual("../../lib/hooks/useAuth"),
        useAuth: jest.fn().mockReturnValue({
          user: {
            id: "",
            UserName: "Roberto Firmino",
            FirstName: "",
            LastName: "",
            Email: "",
            exp: 0,
            Role: "",
            sub: "",
          },
          update: (user: any) => null,
          initialized: true,
        }),
      };
    });*/

    jest.spyOn(useAuth, "useAuth").mockReturnValue({
      user: {
        id: "sdfs",
        UserName: "Roberto Firmino",
        FirstName: "",
        LastName: "",
        Email: "",
        exp: 0,
        Role: "",
        sub: "",
      },
    });

    renderWithProviders(<EditPostikDialog postik={undefined} />);

    expect(screen.getByText(/Редактирование постика/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Опубликовать/i }));
    //expect(screen.getByRole("circle")).toBeInTheDocument();
  });
});
