import { AspectRatio } from "@mui/joy";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { memo } from "react";
import { ProfilePost } from "./profileApiSlice";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  textAlign: "center",
  color: theme.vars.palette.text.secondary,
}));

const ProfilePostik = (props: { post: ProfilePost }) => {
  const { post } = props;
  return (
    <Item>
      <AspectRatio ratio="1" maxHeight={256} sx={{ flex: 1, minWidth: 108 }}>
        <img src={post.ImagesUrls[0].URL} loading="lazy" alt="" />
      </AspectRatio>
    </Item>
  );
};
export default memo(
  ProfilePostik,
  (prev: { post: ProfilePost }, next: { post: ProfilePost }) => {
    if (prev.post.id === next.post.id) return false;
    else return true;
  },
);
