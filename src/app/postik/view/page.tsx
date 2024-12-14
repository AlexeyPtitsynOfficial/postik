"use client";
import { Stack } from "@mui/joy";
import PostikCard from "../../../components/Postiki/PostikCard";
import Comments from "../../../components/PostikReview/Comments/Comments";
import { Postik } from "../../../components/Postiki/postikiApiSlice";
import { FunctionComponent } from "react";
import { useSearchParams } from "next/navigation";

const PostikReview: FunctionComponent = () => {
  const searchParams = useSearchParams();
  const postik = JSON.parse(searchParams.get("postik")!) as Postik;
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
