import { Avatar, Button, Stack, Typography } from "@mui/joy";
import { Comment, CommentAdd } from "./commentsApiSlice";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplayCard from "./ReplayCard";
import React from "react";

const CommentCard = (props: {
  comment: Comment;
  handleAddComment: (
    event: React.FormEvent,
    params: CommentAdd,
  ) => Promise<void>;
}) => {
  const { comment } = props;

  const [replay, setReplay] = React.useState<boolean>(false);
  const [formState, setFormState] = React.useState<CommentAdd>({
    ParentID: comment.ID,
    PostikID: comment.PostikID,
    CommentText: "",
  });

  const handleReplay = () => {
    setFormState((prev) => ({ ...prev, ParentID: comment.ID }));
    setReplay(true);
  };

  const nestedComments = (comment.SubComments || []).map((comment) => {
    return (
      <CommentCard
        key={comment.ID}
        comment={comment}
        handleAddComment={props.handleAddComment}
      />
    );
  });

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Avatar />
      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="end">
          <Typography level="title-sm">{comment.UserName}</Typography>
          <Typography level="body-xs">
            {moment(comment.CreatedAt).fromNow()}
          </Typography>
        </Stack>
        <Typography level="body-sm">{comment.CommentText}</Typography>
        <Stack direction="row" spacing={2}>
          <FavoriteIcon />
          <Button variant="plain" onClick={handleReplay}>
            Ответить
          </Button>
        </Stack>
        {replay ? (
          <ReplayCard
            setFormState={setFormState}
            handleAddComment={(e: React.FormEvent) =>
              props.handleAddComment(e, formState)
            }
          />
        ) : (
          ""
        )}
        {nestedComments}
      </Stack>
    </Stack>
  );
};

export default CommentCard;
