import { useState } from "react";
import Box from "@mui/joy/Box";

import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Layout from "./Layout";
import Header from "./Header/Header";
import NavigationBottom from "./NavigationBottom";
import Sidebar from "./SideBar2";

const MainPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <Box>
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <NavigationBottom />
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm:
              pathname === "/messages"
                ? "1fr"
                : "minmax(80px, 200px) minmax(450px, 1fr)",
            md:
              pathname === "/messages"
                ? "1fr"
                : "minmax(160px, 300px) minmax(600px, 1fr) minmax(200px, 220px)",
          },
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav
          sx={{
            display: {
              sm: pathname === "/messages" ? "none" : "initial",
              md: pathname === "/messages" ? "none" : "initial",
            },
          }}
        >
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 2,
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Outlet />
          </Box>
        </Layout.Main>
        <Layout.SidePane
          sx={{
            display: { md: pathname === "/messages" ? "none" : "initial" },
          }}
        >
          <Sidebar />
        </Layout.SidePane>
      </Layout.Root>
    </Box>
  );
};

export default MainPage;
