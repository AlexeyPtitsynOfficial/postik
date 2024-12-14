import { render } from "@testing-library/react";
import PostikCard from "./PostikCard";
import { Postik } from "./postikiApiSlice";
import { renderWithProviders } from "../../utils/test-utils";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

TimeAgo.setDefaultLocale("ru");

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("PostikCard tests", () => {
  test("render PostikCard", async () => {
    const postik: Postik = {
      id: "",
      CategoryID: "",
      UserID: "",
      AuthorName: "Alex",
      Title: "test title",
      Description: "test desc",
      Files: [],
      ImagesUrls: [
        {
          URL: "",
          order: 1,
        },
      ],
      LikesCount: 0,
      CommentsCount: 0,
      createdAt: new Date(),
    };
    renderWithProviders(<PostikCard postik={postik} />);
  });
});
