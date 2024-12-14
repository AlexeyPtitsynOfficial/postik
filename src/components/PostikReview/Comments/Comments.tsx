import { Button, FormControl, FormLabel, Stack, Textarea } from "@mui/joy";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  Comment,
  CommentAdd,
} from "./commentsApiSlice";
import CommentCard from "./CommentCard";
import React, { memo } from "react";
import { useAuth } from "../../../lib/hooks/useAuth";

const Comments = (props: { postikID: string }) => {
  const postID = props.postikID;
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsQuery(
    postID,
    { refetchOnMountOrArgChange: true },
  );
  const [addComment, { isLoading: isLoadingAdd }] = useAddCommentMutation();
  const [formState, setFormState] = React.useState<CommentAdd>({
    ParentID: null,
    PostikID: props.postikID,
    CommentText: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event: React.FormEvent, params: CommentAdd) => {
    event.preventDefault();
    try {
      await addComment(params);
    } catch (error) {}
  };

  const commentsTree = (commentData: Comment[]): Comment[] => {
    const commentMap: Record<string, Comment> = {};

    commentData.forEach(
      (comment: Comment) => (commentMap[comment.ID] = comment),
    );

    commentData.forEach((comment: Comment) => {
      if (comment.ParentID !== null) {
        const parent: Comment = commentMap[comment.ParentID];
        (parent.SubComments = parent.SubComments || []).push(comment);
      }
    });

    return commentData.filter((comment: Comment) => {
      return comment.ParentID === null;
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        width: { xs: "100%", md: "100%", lg: "80%" },
        justifyContent: "stretch",
        alignItems: "stretch",
      }}
    >
      <form onSubmit={(e) => handleSubmit(e, formState)}>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel>Комментарий</FormLabel>
            <Textarea
              name="CommentText"
              placeholder="Type anything…"
              minRows={4}
              onChange={handleChange}
            />
          </FormControl>
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" loading={isLoadingAdd}>
              Оставить Комментарий
            </Button>
          </Stack>
        </Stack>
      </form>
      {isLoadingComments
        ? ""
        : commentsTree(comments || [])?.map((comment: Comment) => (
            <CommentCard
              key={comment.ID}
              comment={comment}
              handleAddComment={handleSubmit}
            />
          ))}
    </Stack>
  );
};

export default memo(
  Comments,
  (prev: { postikID: string }, next: { postikID: string }) => {
    if (prev.postikID === next.postikID) return false;
    else return true;
  },
);
