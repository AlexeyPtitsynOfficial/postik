import { api } from "../../app/api";

export interface Subscriber {
  id: string;
  UserName: string;
}

export type Subscription = {
  id: string;
  UserName: string;
};

export interface SubscribeParams {
  UserID: string | undefined;
  UserIDSubscription: string;
}

export interface UnsubscribeParams {
  id: string | undefined;
}

const subscriptionsApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getSubscribers: build.query<Subscriber[], void>({
      query: (id) => `/subscription/subscribers${id}`,
    }),
    getSubscriptions: build.query<Subscription[], string>({
      query: (id) => `/subscription/subscriptions${id}`,
    }),
    subscribe: build.mutation<void, SubscribeParams>({
      query: (params) => ({
        url: `profile/subscribe`,
        method: "POST",
        body: params,
      }),
    }),
    unsubscribe: build.mutation<void, SubscribeParams>({
      query: (params) => ({
        url: `profile/unsubscribe`,
        method: "DELETE",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useGetSubscriptionsQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
  util: { getRunningQueriesThunk },
} = subscriptionsApiSlice;

export const { getSubscriptions, getSubscribers } =
  subscriptionsApiSlice.endpoints;
