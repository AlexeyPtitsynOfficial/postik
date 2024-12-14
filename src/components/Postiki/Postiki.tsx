"use client";
import Stack from "@mui/joy/Stack";
import { Postik, useGetPostikiQuery } from "./postikiApiSlice";
import PostikCard from "./PostikCard";
import { useDispatch } from "react-redux";

const Postiki = () => {
  const { data: postiki, isLoading } =
    useGetPostikiQuery(/*{
    refetchOnMountOrArgChange: true,
  }*/);

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

export default Postiki;
