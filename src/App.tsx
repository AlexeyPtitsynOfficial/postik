import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import MainPage from "./components/MainPage";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";
import Postiki from "./components/Postiki/Postiki";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import EditPostikDialog from "./components/Postiki/EditPostikDialog";
import Search from "./components/Search/Search";
import Subscriptions from "./components/Subscription/Subscriptions";
import PostikReview from "./components/PostikReview/PostikReview";

export const App = () => {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Postiki />} />
            <Route path="login">
              <Route index element={<Login />} />
            </Route>
            <Route path="signup">
              <Route index element={<SignUp />} />
            </Route>
            <Route path="profile">
              <Route index element={<Profile />} />
            </Route>
            <Route path="postiki">
              <Route index element={<Postiki />} />
              <Route
                path=":UserID"
                element={<EditPostikDialog postik={undefined} />}
              />
            </Route>
            <Route path="postik">
              <Route index element={<PostikReview />} />
            </Route>
            <Route path="messages">
              <Route index element={<Messages />} />
            </Route>
            <Route path="search">
              <Route index element={<Search />} />
            </Route>
            <Route path="subscriptions">
              <Route index element={<Subscriptions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
};
