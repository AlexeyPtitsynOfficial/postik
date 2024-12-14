import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import {
  Postik,
  PostikAddRequest,
  useAddPostikMutation,
} from "./postikiApiSlice";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import { selectCurrentUser } from "../Auth/authSlice";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import UploadFile, { FileWithPreview } from "../UploadFile";
import { useAuth } from "../../lib/hooks/useAuth";

const EditPostikDialog = (props?: { postik: Postik | undefined }) => {
  const [open, setOpen] = useState<boolean>(true);
  const auth = useAuth();
  const [addPostik, { isLoading }] = useAddPostikMutation();
  const [formState, setFormState] = useState<Postik | PostikAddRequest>(
    props?.postik || {
      CategoryID: "",
      UserID: auth.user!.id!,
      AuthorName: auth.user!.UserName!,
      Title: "",
      Description: "",
      Files: [],
    },
  );

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      //await addPostik(formState).unwrap();
      setOpen(false);
    } catch {}
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Редактирование постика</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Stack direction="row" spacing={2}>
              <UploadFile files={files} setFiles={setFiles} />
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Заголовок</FormLabel>
                  <Input type="text" name="Title" onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Описание</FormLabel>
                  <Textarea
                    name="Description"
                    placeholder="Type anything…"
                    minRows={4}
                    onChange={handleChange}
                  />
                </FormControl>

                <Button type="submit" onClick={onSubmit} loading={isLoading}>
                  Опубликовать
                </Button>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default EditPostikDialog;
