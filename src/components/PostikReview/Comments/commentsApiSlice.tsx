import { api } from "../../../app/api";

export interface Comment {
  ID: string;
  PostikID: string;
  UserID: string;
  ParentID: string;
  UserName: string;
  CommentText: string;
  CreatedAt: Date;
  SubComments: Comment[];
}

export interface CommentAdd {
  ParentID: string | null;
  PostikID: string;
  CommentText: string;
}
const commentsApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Comment[], string>({
      query: (id) => `comment/${id}`,
    }),

    addComment: build.mutation<void, CommentAdd>({
      query: (params) => ({ url: `comment`, method: "PUT", body: params }),
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApiSlice;
