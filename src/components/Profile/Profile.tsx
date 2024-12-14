import * as React from "react";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import AspectRatio from "@mui/joy/AspectRatio";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import {
  useCheckSubscriptionQuery,
  useGetProfilePostiksQuery,
  useGetProfileQuery,
} from "./profileApiSlice";
import { Skeleton } from "@mui/lab";
import { useAuth } from "../../lib/hooks/useAuth";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "@mui/joy";
import { Link, useLocation } from "react-router-dom";
import ProfilePostiks from "./ProfilePostiks";
import {
  SubscribeParams,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../Subscription/subscriptionsApiSlice";

const Profile = () => {
  const auth = useAuth();
  const { state } = useLocation();
  const { data: profile } = useGetProfileQuery(
    { id: state.UserID },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [params, setParams] = React.useState<SubscribeParams>({
    UserID: auth.user?.id,
    UserIDSubscription: state.UserID,
  });

  const {
    data: checkSubscription,
    refetch: refetchCheckSubscription,
    isLoading: isLoadingCheck,
  } = useCheckSubscriptionQuery(state.UserID, {
    refetchOnMountOrArgChange: true,
  });
  const [subscribe, { isLoading: isLoadingSubscribe }] = useSubscribeMutation();
  const [unsubscribe, { isLoading: isLoadingUnsubscribe }] =
    useUnsubscribeMutation(state.UserID);

  const handleSubscribeClick = async () => {
    try {
      const result = await subscribe(params).unwrap();
      refetchCheckSubscription();
    } catch {}
  };

  const handleUnsubscribeClick = async () => {
    try {
      const result = await unsubscribe(state.UserID).unwrap();
      refetchCheckSubscription();
    } catch {}
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "600px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={1}>
            <AspectRatio
              ratio="1"
              maxHeight={108}
              sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <IconButton
              aria-label="upload new picture"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{
                bgcolor: "background.body",
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                left: 185,
                top: 180,
                boxShadow: "sm",
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Typography level="title-sm">
              {profile ? profile.UserName : ""}
            </Typography>
            <Typography level="h4">
              {profile ? profile.FirstName + " " + profile.LastName : ""}
            </Typography>
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 2, lg: 2 }}
              justifyContent="space-evenly"
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "stretch",
                textDecoration: "none",
              }}
            >
              <Stack
                sx={{ alignItems: "center", textDecoration: "none" }}
                component={Link}
                to={"/postiki"}
              >
                <Typography>{profile?.PostiksNumber}</Typography>
                <Typography>Постиков</Typography>
              </Stack>
              <Stack
                sx={{ alignItems: "center", textDecoration: "none" }}
                component={Link}
                to={"/subscriptions"}
              >
                <Typography>{profile?.SubscriptionsNumber}</Typography>
                <Typography>подписок</Typography>
              </Stack>
              <Stack
                sx={{ alignItems: "center", textDecoration: "none" }}
                component={Link}
                to={"/subscriptions"}
              >
                <Typography>{profile?.SubscribersNumber}</Typography>
                <Typography>подписчиков</Typography>
              </Stack>
            </Stack>
            <Stack>
              {auth.user?.id === state.UserID ? (
                ""
              ) : isLoadingCheck ? (
                ""
              ) : checkSubscription ? (
                <Button
                  size="sm"
                  loading={isLoadingUnsubscribe}
                  onClick={handleUnsubscribeClick}
                >
                  Отписаться
                </Button>
              ) : (
                <Button
                  size="sm"
                  loading={isLoadingSubscribe}
                  onClick={handleSubscribeClick}
                >
                  Подписаться
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Tabs defaultValue={0}>
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: "xl",
              bgcolor: "background.level1",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            <Tab disableIndicator value={0}>
              Постики
            </Tab>
            <Tab disableIndicator value={1}>
              Сохранения
            </Tab>
            <Tab disableIndicator value={2}>
              Отметки
            </Tab>
          </TabList>

          <TabPanel value={0}>
            <ProfilePostiks UserID={String(state.UserID)} />
          </TabPanel>
        </Tabs>
      </Stack>
    </Box>
  );
};

export default Profile;
