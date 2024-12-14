import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { Postik, PostikImage } from "./postikiApiSlice";

import CommentsIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { memo } from "react";
import Link from "next/link";
import Carousel from "../Carousel/Carousel";
import ReactTimeAgo from "react-time-ago";

const PostikCard = (props: { postik: Postik }) => {
  const { postik } = props;
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        alignSelf: "center",
        maxWidth: 600,
      }}
      key={postik.id}
    >
      <Box>
        <Stack spacing={1}>
          <Typography level="title-md">{postik.Title}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              sx={{ maxWidth: "20px", maxHeight: "20px" }}
            />
            <Typography level="body-xs">{postik.AuthorName}</Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ position: "relative", ml: "-16px", mr: "-16px" }}>
        <Carousel imagesUrls={postik.ImagesUrls} />
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
      <CardContent>
        <Typography level="title-md">
          {/*<Link to="#multiple-actions">{postik.Description}</Link>*/}
        </Typography>
        <Typography level="body-sm">
          {/*<Link to="#multiple-actions">Якутск</Link>*/}
        </Typography>
      </CardContent>
      <CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{ mb: 0, alignSelf: "flex-end" }}
        >
          <Typography level="body-xs">6.3k views</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">
            <ReactTimeAgo date={postik.createdAt} locale="ru-RU" />
          </Typography>
        </CardContent>
      </CardOverflow>
      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end" }}>
          <Stack direction="row" spacing={2}>
            <IconButton size="sm" variant="outlined" color="neutral">
              <ShareIcon />
            </IconButton>
            {
              <Link
                href={{
                  pathname: "/postik/view",
                  query: { postik: JSON.stringify(postik) },
                }}
              >
                <IconButton size="sm" variant="outlined" color="neutral">
                  <CommentsIcon />
                </IconButton>
              </Link>
            }
          </Stack>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default memo(
  PostikCard,
  (prev: { postik: Postik }, next: { postik: Postik }) => {
    if (prev.postik.id === next.postik.id) return false;
    else return true;
  },
);
