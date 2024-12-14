import { parseAndCheckHttpResponse } from "@apollo/client";
import { api } from "../../app/api";

export interface ProfileRequest {
  id: string | undefined;
}

export interface Avatar {
  id: string;
  URL: string;
}

export interface Profile {
  ID: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Avatars: Avatar[];
  PostiksNumber: number;
  SubscribersNumber: number;
  SubscriptionsNumber: number;
}

export interface ProfilePostImage {
  URL: string;
}

export interface ProfilePost {
  id: string;
  ImagesUrls: ProfilePostImage[];
}

export interface CheckSubscription {
  ID: string;
  UserIDSubscription: string;
}

type ProfilePosts = ProfilePost[];

const profileApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<Profile, ProfileRequest>({
      query: (params) => ({
        url: `profile/${params.id}`,
        method: "GET",
      }),
    }),
    getProfilePostiks: build.query<ProfilePosts, ProfileRequest>({
      query: (params) => ({
        url: `profile/postiks/${params.id}`,
        method: "GET",
      }),
    }),
    checkSubscription: build.query<boolean, CheckSubscription>({
      query: (params) => ({
        url: `profile/check_subscription/`,
        method: "POST",
        body: params,
      }),
    }),
    getAvatars: build.query<Avatar[], ProfileRequest>({
      query: (params) => ({
        url: `profile/avatar/${params.id}`,
      }),
    }),
    uploadAvatar: build.mutation<void, FormData>({
      query: (params) => ({
        url: `profile/upload_avatar/`,
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetProfilePostiksQuery,
  useCheckSubscriptionQuery,
  useGetAvatarsQuery,
  useUploadAvatarMutation,
} = profileApiSlice;
