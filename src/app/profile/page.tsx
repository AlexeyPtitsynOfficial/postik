"use client";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import AspectRatio from "@mui/joy/AspectRatio";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/joy/IconButton";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import {
  CheckSubscription,
  useCheckSubscriptionQuery,
  useGetProfilePostiksQuery,
  useGetProfileQuery,
} from "../../components/Profile/profileApiSlice";
import { Skeleton } from "@mui/lab";
import { useAuth } from "../../lib/hooks/useAuth";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "@mui/joy";
import Link from "next/link";
import ProfilePostiks from "../../components/Profile/ProfilePostiks";
import {
  SubscribeParams,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../../components/Subscription/subscriptionsApiSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { NextPage } from "next";
import { revalidateTag, revalidatePath } from "next/cache";

const Profile: NextPage = () => {
  const router = useRouter();
  const auth = useAuth();
  //const { state } = useLocation();
  const searchParams = useSearchParams();
  const userID = searchParams.get("id")!;

  const { data: profile } = useGetProfileQuery(
    { id: userID },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [queryparams, setQueryParams] = React.useState<SubscribeParams>({
    UserID: auth.user?.id,
    UserIDSubscription: userID,
  });

  const {
    data: checkSubscription,
    refetch: refetchCheckSubscription,
    isLoading: isLoadingCheck,
  } = useCheckSubscriptionQuery(
    { ID: auth.user!.id, UserIDSubscription: userID },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [subscribe, { isLoading: isLoadingSubscribe }] = useSubscribeMutation();
  const [unsubscribe, { isLoading: isLoadingUnsubscribe }] =
    useUnsubscribeMutation();

  const handleSubscribeClick = async () => {
    try {
      const result = await subscribe(queryparams).unwrap();
      refetchCheckSubscription();
      revalidateTag("subscriptions");
      revalidatePath("/subscriptions", "page");
    } catch {}
  };

  const handleUnsubscribeClick = async () => {
    try {
      const result = await unsubscribe({
        UserID: auth.user?.id,
        UserIDSubscription: userID,
      }).unwrap();
      refetchCheckSubscription();
      revalidateTag("subscriptions");
      revalidatePath("/subscriptions", "page");
    } catch {}
  };

  const handleEditAvatar = () => {
    router.push("/profile/editavatar?id=" + auth.user?.id);
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
          <Box sx={{ position: "relative" }}>
            <AspectRatio
              ratio="1"
              maxHeight={108}
              sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
            >
              <img
                src={profile?.Avatars[0].URL}
                srcSet={profile?.Avatars[0].URL}
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
                bottom: 0,
                right: 0,
                zIndex: 2,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                boxShadow: "sm",
              }}
              onClick={handleEditAvatar}
            >
              <EditRoundedIcon />
            </IconButton>
          </Box>
          <Stack sx={{ width: "100%", position: "relative" }} spacing={1}>
            <Typography level="h4" sx={{ pl: "10px" }}>
              {profile ? "@" + profile.UserName : ""}
            </Typography>
            {/*<Typography level="h4" sx={{ pl: "10px" }}>
              {profile && ( profile.FirstName) ? profile.FirstName + " " + profile.LastName : ""}
            </Typography>*/}
            <IconButton
              aria-label="edit profile"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{
                bgcolor: "background.body",
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 3,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                boxShadow: "sm",
              }}
            >
              <SettingsRoundedIcon />
            </IconButton>
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
                href={"/postik"}
              >
                <Typography>{profile?.PostiksNumber}</Typography>
                <Typography>Постиков</Typography>
              </Stack>
              <Stack
                sx={{ alignItems: "center", textDecoration: "none" }}
                component={Link}
                href={"/subscriptions"}
              >
                <Typography>{/*profile?.SubscriptionsNumber*/}23</Typography>
                <Typography>подписок</Typography>
              </Stack>
              <Stack
                sx={{ alignItems: "center", textDecoration: "none" }}
                component={Link}
                href={"/subscriptions"}
              >
                <Typography>{/*profile?.SubscribersNumber*/}142</Typography>
                <Typography>подписчиков</Typography>
              </Stack>
            </Stack>
            <Stack>
              {auth.user?.id === userID ? (
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
            <ProfilePostiks UserID={String(userID)} />
          </TabPanel>
        </Tabs>
      </Stack>
    </Box>
  );
};

export default Profile;
