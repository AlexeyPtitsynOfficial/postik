import { api } from "../../app/api";
import { Postik } from "../Postiki/postikiApiSlice";

export interface SearchRequest {
  SearchText: string;
  TabIndex: number;
}

export interface SearchPeopleResponse {
  id: string;
  TypeID: number;
  UserName: string;
  SubscribersNumber: number;
}

const searchApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    search: build.query<Postik[] | SearchPeopleResponse[], SearchRequest>({
      query: (params) => ({
        url: `search/${params.SearchText}/${params.TabIndex}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApiSlice;
