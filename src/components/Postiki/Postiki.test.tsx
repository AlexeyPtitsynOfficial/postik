import { renderWithProviders } from "../../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";

import Postiki from "./Postiki";
import { api } from "../../app/api";
import { setupStore } from "../../lib/store";

describe("Postiki tests", () => {
  /*test("render list of postiks", async () => {
    renderWithProviders(<Postiki />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/test/i)).toBeInTheDocument();
  });*/

  /*test("uses preloaded state to render", () => {
  const initialPostik = [
    {
      ID: "",
      UserID: "",
      Title: "тест",
      Description: "описание",
      LikesCount: 1,
      CommentsCount: 2,
    },
  ];

  const { getByText } = renderWithProviders(<Postiki />, {
    preloadedState: {
      api: initialPostik,
    },
  });
});*/

  /*test("Sets up initial state state state with actions", () => {
  const store = setupStore();
  store.dispatch(
    addPostik({
      ID: "",
      UserID: "",
      Title: "тест",
      Description: "описание",
      LikesCount: 1,
      CommentsCount: 2,
    })
  );
});*/

  test("render errors", () => {});
});
