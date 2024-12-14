import { ChatProps, MessageProps, UserProps } from "./DataTypes";
import AvatarWithStatus from "./AvatarWthStatus";
import React from "react";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { ListItemButtonProps } from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import { toggleMessagesPane } from "./utils/utils";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ListDivider from "@mui/joy/ListDivider";

import CircleIcon from "@mui/icons-material/Circle";

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: UserProps;
  messages: MessageProps[];
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { id, sender, messages, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id, sender, messages });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: "column",
            alignItems: "initial",
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={sender.online} src={sender.avatar} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{sender.name}</Typography>
              <Typography level="body-sm">{sender.username}</Typography>
            </Box>
            <Box sx={{ lineHeight: 1.5, textAlign: "right" }}>
              {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )}
              <Typography
                level="body-xs"
                display={{ xs: "none", md: "block" }}
                noWrap
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: "-webkit-box",
              WebKitLineClamp: "2",
              WebKitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {messages[0].content}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
};

export default ChatListItem;
