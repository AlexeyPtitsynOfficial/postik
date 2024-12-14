"use client";
import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
} from "@mui/joy";
import UploadFile, { FileWithPreview } from "../../../components/UploadFile";
import { useState } from "react";
import { useUploadAvatarMutation } from "../../../components/Profile/profileApiSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { NextPage } from "next";

const EditAvatar: NextPage = () => {
  const [open, setOpen] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const userID: string = searchParams.get("id")!;

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const router = useRouter();
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", userID);
      formData.append("type", "avatar");
      for (const file of files) {
        formData.append("Files", file);
      }
      const res = await uploadAvatar(formData).unwrap();
      router.push(`/profile?id=${userID}`);
    } catch (error) {}
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Аватар</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <UploadFile files={files} setFiles={setFiles} />
            <Button type="submit" loading={isLoading}>
              Сохранить
            </Button>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default EditAvatar;
