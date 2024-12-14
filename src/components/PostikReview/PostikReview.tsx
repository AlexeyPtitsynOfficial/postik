import { Stack } from "@mui/joy";
import PostikCard from "../Postiki/PostikCard";
import Comments from "./Comments/Comments";
import { useLocation } from "react-router-dom";
import { Postik } from "../Postiki/postikiApiSlice";
import { FunctionComponent } from "react";

const PostikReview: FunctionComponent = () => {
  const { state } = useLocation();
  const postik = state.postik as Postik;
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PostikCard postik={postik} />
      <Comments postikID={postik.id} />
    </Stack>
  );
};

export default PostikReview;
