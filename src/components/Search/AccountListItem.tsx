"use client";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  Stack,
  Typography,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";

type AccountListItemProps = ListItemButtonProps & {
  UserID: string;
  userName: string;
  subscribersNumber: number;
};

const AccountListItem = (props: AccountListItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile?id=${props.UserID}`);
  };

  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <Stack direction="row" spacing={2}>
          <Avatar></Avatar>
          <Stack direction="column">
            <Typography level="title-sm">{props.userName}</Typography>
            <Typography level="body-sm">
              {props.subscribersNumber} подписчика
            </Typography>
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default AccountListItem;
