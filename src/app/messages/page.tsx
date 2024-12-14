"use client";
import { useState } from "react";
import styles from "../styles/pages/messages.module.scss";
import { ChatProps } from "../../components/Messages/DataTypes";
import { chats } from "../../components/Messages/data";

import Sheet from "@mui/joy/Sheet";
import MessagesPane from "../../components/Messages/MessagesPane";
import ChatsPane from "../../components/Messages/ChatsPane";
import { NextPage } from "next";

const Messages: NextPage = () => {
  const [selectedChat, setSelectedChat] = useState<ChatProps>(chats[0]);
  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        //pt: { xs: "var(--Header-height)", sm: 0 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(10%, 200px)) 1fr",
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: "fixed", sm: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
            sm: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 100,
          width: "100%",
          top: 52,
        }}
      >
        <ChatsPane
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane chat={selectedChat} />
    </Sheet>
  );
};

export default Messages;
