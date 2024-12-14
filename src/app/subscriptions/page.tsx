"use server";
import { Box, List, Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import {
  getRunningQueriesThunk,
  getSubscriptions,
  Subscriber,
  Subscription,
  useGetSubscribersQuery,
  useGetSubscriptionsQuery,
} from "../../components/Subscription/subscriptionsApiSlice";
import { useAuth } from "../../lib/hooks/useAuth";
import SubscriptionListItem from "../../components/Subscription/SubscripionListItem";
//import { wrapper } from "../../lib/store";
import { BaseSubscriptionOptions } from "@apollo/client";
import { NextPage } from "next";

const Subscriptions = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams; //(await params).id;
  const userID = id;
  //console.log(params);
  //const auth = useAuth();
  //const { data: subscribers, isLoading: isLoadingSubscribers } =
  //useGetSubscribersQuery();
  //const { data: subscriptions, isLoading: isLoadingSubscriptions } =
  //  useGetSubscriptionsQuery(auth.user!.id);

  const res2 = await fetch(
    `http://localhost:5000/subscription/subscriptions/${userID}`,
    { next: { tags: ["subscriptions"], revalidate: 60 } },
  );
  const subscriptions = await res2.json();

  const res = await fetch(
    `http://localhost:5000/subscription/subscribers/${userID}`,
    { next: { tags: ["subscribers"], revalidate: 60 } },
  );
  const subscribers = await res.json();

  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "100%", lg: "75%" },
      }}
    >
      <Tabs>
        <TabList>
          <Tab value={0}>Подписки</Tab>
          <Tab value={1}>Подписчики</Tab>
        </TabList>
        <Box>
          <TabPanel value={0}>
            <List>
              {subscriptions?.map((item: Subscription) => (
                <SubscriptionListItem
                  key={item.id}
                  UserID={userID}
                  UserIDSubscription={item.id}
                  userName={item.UserName}
                  subscribersNumber={0}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={1}>
            <List>
              {subscribers?.map((item: Subscriber) => (
                <SubscriptionListItem
                  key={item.id}
                  UserID={userID}
                  UserIDSubscription={item.id}
                  userName={item.UserName}
                  subscribersNumber={0}
                />
              ))}
            </List>
          </TabPanel>
        </Box>
      </Tabs>
    </Stack>
  );
};

export default Subscriptions;
