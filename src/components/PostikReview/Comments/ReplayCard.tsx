import { Button, Input, Stack } from "@mui/joy";
import { CommentAdd } from "./commentsApiSlice";

const ReplayCard = (props: {
  setFormState: React.Dispatch<React.SetStateAction<CommentAdd>>;
  handleAddComment: (
    event: React.FormEvent,
    params: CommentAdd,
  ) => Promise<void>;
}) => {
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.setFormState((prev) => ({ ...prev, CommentText: value }));
  };
  return (
    <Stack spacing={1}>
      <Input onChange={handleChange} />
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="plain">Отмена</Button>
        {/*<Button onClick={props.handleAddComment}>Ответить</Button>*/}
      </Stack>
    </Stack>
  );
};

export default ReplayCard;
