"use client";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import "./styles/styles.scss";
import StoreProvider from "./StoreProvider";
import MyApolloProvider from "./GraphQL/MyApolloProvider";
import { useState } from "react";
import Box from "@mui/joy/Box";

import Navigation from "../components/Navigation";
import Layout from "../components/Layout";
import Header from "../components/Header/Header";
import NavigationBottom from "../components/NavigationBottom";
import Sidebar from "../components/SideBar2";
import { usePathname } from "next/navigation";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

import localFont from "next/font/local";
import { Metadata } from "next";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

TimeAgo.setDefaultLocale("ru");

const nunito = localFont({
  src: "./fonts/Nunito-VariableFont_wght.woff2",
  variable: "--nunito",
  weight: "100 900",
});

/*export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <MyApolloProvider>
            <CssVarsProvider>
              <CssBaseline />
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
                      xs: "minmax(200px, 1fr)",
                      sm:
                        pathname === "/messages"
                          ? "1fr"
                          : "minmax(120px, 200px) minmax(450px, 1fr)",
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
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 2,
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      {children}
                    </Box>
                  </Layout.Main>
                  <Layout.SidePane
                    sx={{
                      display: {
                        md: pathname === "/messages" ? "none" : "initial",
                      },
                    }}
                  >
                    <Sidebar />
                  </Layout.SidePane>
                </Layout.Root>
              </Box>
            </CssVarsProvider>
          </MyApolloProvider>
        </StoreProvider>
      </body>
    </html>
  );
}