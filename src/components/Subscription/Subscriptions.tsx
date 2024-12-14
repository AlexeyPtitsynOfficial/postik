import { Box, List, Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import {
  Subscriber,
  useGetSubscribersQuery,
  useGetSubscriptionsQuery,
} from "./subscriptionsApiSlice";
import { useAuth } from "../../lib/hooks/useAuth";
import SubscriptionListItem from "./SubscripionListItem";

const Subscriptions = () => {
  const { data: subscribers, isLoading: isLoadingSubscribers } =
    useGetSubscribersQuery();
  const { data: subscriptions, isLoading: isLoadingSubscriptions } =
    useGetSubscriptionsQuery("");

  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "100%", lg: "75%" },
      }}
    >
      <Tabs>
        <TabList>
          <Tab>Подписки</Tab>
          <Tab>Подписчики</Tab>
        </TabList>
        <Box>
          <TabPanel>
            <List>
              {subscriptions?.map((item) => (
                <SubscriptionListItem
                  key={item.id}
                  UserID={item.id}
                  UserIDSubscription={item.id}
                  userName={item.UserName}
                  subscribersNumber={0}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel>
            <List>
              {subscribers?.map((item: Subscriber) => (
                <SubscriptionListItem
                  key={item.id}
                  UserID={item.id}
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
