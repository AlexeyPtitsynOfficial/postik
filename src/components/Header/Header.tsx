"use client";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import Navigation from "../Navigation";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUser, logOut } from "../Auth/authSlice";
import { useAuth } from "../../lib/hooks/useAuth";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { memo } from "react";
import { useSession } from "next-auth/react";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Изменить тему" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  //const auth = useAuth();

  const session = useSession();
  const user = session!.data!.user;

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchSubmit = async ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    router.replace("/search");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?SearchText=${event.currentTarget.value}&TabIndex=0`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <GlobalStyles
        styles={() => ({
          ":root": {
            "--Header-height": "100px",
          },
        })}
      />
      {/*<Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            borderRadius: "50%",
          }}
        >
          <LanguageRoundedIcon />
        </IconButton>
      </Stack>*/}
      <Box
        sx={{
          display: "inline-flex",
        }}
      >
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
          sx={{
            display: {
              xs: "inline-flex",
              sm: pathname === "/messages" ? "inline-flex" : "none",
            },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Box>
          <Button
            variant="plain"
            color="neutral"
            aria-pressed="true"
            component="a"
            href="/"
            size="sm"
            sx={{ alignSelf: "center" }}
          >
            Postik
          </Button>
        </Box>
        <Drawer
          sx={{
            display: {
              xs: "inline-flex",
              sm: pathname === "/messages" ? "inline-flex" : "none",
            },
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Postik</DialogTitle>
          <Box sx={{ px: 1 }}>
            <Navigation />
          </Box>
        </Drawer>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          variant="outlined"
          placeholder="Поиск…"
          onKeyDown={handleKeyDown}
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.level1" }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: "center",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          aria-label="search"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "center",
          }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <Dropdown>
          <MenuButton
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ alignSelf: "center" }}
          >
            <LanguageRoundedIcon />
          </MenuButton>
          <Menu sx={{ zIndex: 99999 }}>
            <MenuItem>Русский</MenuItem>
            <MenuItem>English</MenuItem>
          </Menu>
        </Dropdown>
        <ColorSchemeToggle />
        {user ? (
          <Dropdown id="dropdown">
            <MenuButton
              variant="plain"
              size="sm"
              sx={{
                maxWidth: "32px",
                maxHeight: "32px",
                borderRadius: "9999999px",
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/40?img=62"
                srcSet="https://i.pravatar.cc/80?img=62"
                sx={{ maxWidth: "32px", maxHeight: "32px" }}
              />
            </MenuButton>
            <Menu
              placement="bottom-end"
              size="sm"
              sx={{
                zIndex: "99999",
                p: 1,
                gap: 1,
                "--ListItem-radius": "var(--joy-radius-sm)",
              }}
            >
              <MenuItem>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src="https://i.pravatar.cc/40?img=2"
                    srcSet="https://i.pravatar.cc/80?img=2"
                    sx={{ borderRadius: "50%" }}
                  />
                  <Box sx={{ ml: 1.5 }}>
                    <Typography level="title-sm" textColor="text.primary">
                      {user.UserName}
                    </Typography>
                    <Typography level="body-xs" textColor="text.tertiary">
                      {/*user.sub*/}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <ListDivider />
              <MenuItem>
                <HelpRoundedIcon />
                Help
              </MenuItem>
              <MenuItem>
                <SettingsRoundedIcon />
                Settings
              </MenuItem>
              <ListDivider />
              <MenuItem
                component="a"
                href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
              >
                Sourcecode
                <OpenInNewRoundedIcon />
              </MenuItem>
              <ListDivider />
              <MenuItem onClick={() => dispatch(logOut())}>
                <LogoutRoundedIcon />
                Log out
              </MenuItem>
            </Menu>
          </Dropdown>
        ) : (
          <Button variant="plain">
            <Link href="localhost:3001/auth/signin">Sign in</Link>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default memo(Header);
