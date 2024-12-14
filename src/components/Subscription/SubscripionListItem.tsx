"use server";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { redirect } from "next/navigation";

type SubscriptionListItemProps = ListItemButtonProps & {
  UserID: string;
  UserIDSubscription: string;
  userName: string;
  subscribersNumber: number;
};

const SubscriptionListItem = (props: SubscriptionListItemProps) => {
  const handleUnsubscribeClick = async (e: FormData) => {
    "use server";
    const data = new FormData();
    data.append(
      "json",
      JSON.stringify({
        UserID: props.UserID,
        UserIDSubscription: props.UserIDSubscription,
      }),
    );
    const res = await fetch("http://localhost:5000/profile/unsubscribe/", {
      method: "DELETE",
      body: data,
    });
    redirect(`/subscriptions?id=${props.UserID}`);
  };

  return (
    <form action={handleUnsubscribeClick}>
      <ListItem>
        <ListItemButton
          component={Link}
          href={`/profile?id=${props.UserIDSubscription}`}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar />
              <Stack direction="column">
                <Typography level="title-sm">{props.userName}</Typography>
                <Typography level="body-sm">
                  {props.subscribersNumber} подписчика
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </ListItemButton>
        <Button size="sm" type="submit">
          Отписаться
        </Button>
      </ListItem>
    </form>
  );
};

export default SubscriptionListItem;
