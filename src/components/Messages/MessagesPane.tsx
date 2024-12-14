import { useEffect, useState } from "react";
import { ChatProps, MessageProps } from "./DataTypes";
import MessagePaneHeader from "./MessagePaneHeader";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import MessageInput from "./MessageInput";
import Stack from "@mui/joy/Stack";

import ChatBubble from "./ChatBubble";
import AvatarWithStatus from "./AvatarWthStatus";

type MessagesPaneProps = {
  chat: ChatProps;
};

const MessagesPane = (props: MessagesPaneProps) => {
  const { chat } = props;
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState("");

  useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  return (
    <Sheet
      sx={{
        height: "calc(100dvh - var(--Header-height))",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.level1",
      }}
    >
      <MessagePaneHeader sender={chat.sender} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === "You";
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {message.sender !== "You" && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          const newID = chatMessages.length + 1;
          const newIDString = newID.toString();
          setChatMessages([
            ...chatMessages,
            {
              id: newIDString,
              sender: "You",
              content: textAreaValue,
              timestamp: "Just now",
            },
          ]);
        }}
      />
    </Sheet>
  );
};

export default MessagesPane;
