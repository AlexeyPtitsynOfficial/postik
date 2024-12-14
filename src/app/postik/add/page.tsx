"use client";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import {
  Postik,
  PostikAddRequest,
  useAddPostikMutation,
  useUploadImagesMutation,
} from "../../../components/Postiki/postikiApiSlice";
import { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import UploadFile, { FileWithPreview } from "../../../components/UploadFile";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useRouter } from "next/navigation";

const EditPostikDialog = (/*props: { postik: Postik }*/) => {
  const [open, setOpen] = useState<boolean>(true);
  const auth = useAuth();
  const router = useRouter();
  const [addPostik, { isLoading }] = useAddPostikMutation();
  const [uploadImages, { isLoading: isLoadingImages }] =
    useUploadImagesMutation();

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [formState, setFormState] = useState<Postik | PostikAddRequest>(
    /*props?.postik || */ {
      CategoryID: "6a7a7301-7d24-449c-8340-bb1139bbf908",
      UserID: auth.user!.id!,
      AuthorName: auth.user!.UserName!,
      Title: "",
      Description: "",
      Files: [],
    },
  );

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    setFormState((prev) => ({ ...prev, Files: files }));
  }, [files]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      /*formData.append("CategoryID", formState.CategoryID);
      formData.append("UserID", formState.UserID);
      formData.append("AuthorName", formState.AuthorName);
      formData.append("Title", formState.Title);
      formData.append("Description", formState.Description);*/

      const postik = await addPostik(formState).unwrap();
      formData.append("id", postik.id);
      formData.append("type", "postik");
      for (const file of formState.Files) {
        formData.append("Files", file);
      }
      await uploadImages(formData).unwrap();
      setOpen(false);
      router.push("/postik");
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
