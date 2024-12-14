import { api } from "../../app/api";
import { FileWithPreview } from "../UploadFile";

export interface Postik {
  id: string;
  CategoryID: string;
  UserID: string;
  AuthorName: string;
  Title: string;
  Description: string;
  Files: FileWithPreview[];
  ImagesUrls: PostikImage[];
  LikesCount: number;
  CommentsCount: number;
  createdAt: Date;
}

export interface PostikImage {
  URL: string;
  order: number;
}

export interface PostikAddRequest {
  CategoryID: string;
  UserID: string;
  AuthorName: string;
  Title: string;
  Description: string;
  Files: FileWithPreview[];
}

type PostikiResponse = Postik[];

const postikiApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getPostiki: build.query<PostikiResponse, void>({
      query: () => "/postik",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Postiki" as const, id })),
              { type: "Postiki", ID: "LIST" },
            ]
          : [{ type: "Postiki", ID: "LIST" }],
    }),
    getPostik: build.query<Postik, string>({
      query: (id) => `/postik/${id}`,
    }),
    addPostik: build.mutation<Postik, PostikAddRequest>({
      query: (data) => ({
        url: "/postik",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Postiki", id: "LIST" }],
    }),
    uploadImages: build.mutation<void, FormData>({
      query: (data) => ({
        url: "/postik/uploadimages",
        method: "POST",
        body: data,
      }),
    }),
    updatePostik: build.mutation<PostikiResponse, Postik>({
      query: (data) => ({
        url: `/postiki/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Postiki", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostikiQuery,
  useAddPostikMutation,
  useUploadImagesMutation,
  useUpdatePostikMutation,
} = postikiApiSlice;
