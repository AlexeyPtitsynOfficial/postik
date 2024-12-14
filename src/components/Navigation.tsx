"use client";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";

import Button from "@mui/joy/Button";
import { selectCurrentUser } from "./Auth/authSlice";
import { useAuth } from "../lib/hooks/useAuth";
import Link from "next/link";
import { memo } from "react";

const Navigation = () => {
  const auth = useAuth();
  //console.log(auth.user);
  return (
    <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
          Меню
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
            textDecoration: "none",
          }}
        >
          {auth.user ? (
            <Box>
              <ListItem>
                <ListItemButton
                  component={Link}
                  href={{
                    pathname: "/profile",
                    query: { id: auth.user.id },
                  }}
                >
                  <ListItemDecorator>
                    <AccountCircleRoundedIcon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Профиль</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} href="/messages">
                  <ListItemDecorator>
                    <QuestionAnswerRoundedIcon fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Сообщения</ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  component={Link}
                  href={{
                    pathname: "/subscriptions",
                    query: { id: auth.user?.id },
                  }}
                >
                  <ListItemDecorator>
                    <PeopleAltRounded fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Подписки</ListItemContent>
                </ListItemButton>
              </ListItem>
            </Box>
          ) : (
            ""
          )}

          <ListItem>
            <ListItemButton component={Link} href="/postik">
              <ListItemDecorator>
                <ArticleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Постики</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
      <ListItem nested sx={{ mt: 2 }}>
        <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
          Тэги
        </ListSubheader>
        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            "--ListItemDecorator-size": "32px",
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "primary.500",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Котики</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "danger.500",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Работа</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "warning.400",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Путешествие</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "success.400",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Билеты</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
};

export default memo(Navigation);
