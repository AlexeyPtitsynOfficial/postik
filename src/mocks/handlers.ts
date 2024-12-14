import { http, HttpResponse } from "msw";
import { Postik } from "../components/Postiki/postikiApiSlice";

export const handlers = [
  http.get("http://localhost:5000/postiki", () => {
    return HttpResponse.json<Postik[]>([
      {
        id: "",
        CategoryID: "",
        UserID: "",
        AuthorName: "Alex",
        Title: "test1",
        Description: "test desc",
        Files: [],
        ImagesUrls: [],
        LikesCount: 0,
        CommentsCount: 0,
        createdAt: new Date(),
      },
    ]);
  }),
];
