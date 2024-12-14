"use client";
import Stack from "@mui/joy/Stack";
import {
  Postik,
  useGetPostikiQuery,
} from "../../components/Postiki/postikiApiSlice";
import PostikCard from "../../components/Postiki/PostikCard";
import { useDispatch } from "react-redux";
import { memo } from "react";

const Postiki = () => {
  const { data: postiki, isLoading } = useGetPostikiQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading && !postiki) {
    return <div>Loading</div>;
  }

  return (
    <Stack
      spacing={4}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {postiki?.map((postik: Postik) => (
        <PostikCard key={postik.id} postik={postik} />
      ))}
    </Stack>
  );
};

export default memo(Postiki);
