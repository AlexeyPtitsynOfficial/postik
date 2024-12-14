"use client";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Cropper, { Area, Point } from "react-easy-crop";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export interface FileWithPreview extends File {
  preview?: string;
}

const UploadFile = (props: {
  files: FileWithPreview[];
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
}) => {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview>();
  const maxFiles = 4;

  const onDrop = useCallback((acceptedFiles: FileWithPreview[]) => {
    if (acceptedFiles?.length) {
      props.setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: maxFiles,
    noClick: true,
    noKeyboard: true,
  });

  const removeFile = (name: string) => {
    props.setFiles((files) => files.filter((file) => file.name !== name));
  };

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(2);
  const cropHeight = 0;
  const cropSize = { width: 500, height: 500 };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <Stack spacing={1}>
      <Sheet>
        {props.files.length == 0 ? (
          <div {...getRootProps()}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                border: "2px dashed gray",
                backgroundColor: "lightgray",
                borderRadius: "5px",
                p: "1em",
                width: "500px",
                height: "500px",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography>Drop the files here ...</Typography>
              ) : (
                <Typography>
                  Drag n drop some files here, or click to select files
                </Typography>
              )}
              <Button onClick={open}>Выбрать из компьютера</Button>
            </Stack>
          </div>
        ) : (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              width: "500px",
              height: "500px",
            }}
          >
            <Cropper
              image={selectedFile?.preview}
              objectFit="cover"
              cropSize={cropSize}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Stack>
        )}
      </Sheet>
      <Stack direction="row" spacing={1}>
        {props.files.map((file: FileWithPreview) => (
          <Sheet
            key={file.name}
            onClick={() => setSelectedFile(file)}
            onKeyDown={() => setSelectedFile(file)}
          >
            <IconButton
              size="md"
              variant="plain"
              color="neutral"
              sx={{
                right: "0px",
                position: "absolute",
                padding: "0",
              }}
              onClick={() => removeFile(file.name)}
            >
              <CancelRoundedIcon />
            </IconButton>
            <img
              src={file.preview}
              width={70}
              height={70}
              style={{ objectFit: "cover" }}
              alt="sd"
            />
          </Sheet>
        ))}
        {props.files.length !== 0 && props.files.length < maxFiles ? (
          <IconButton sx={{ width: "70px", height: "70px" }} onClick={open}>
            <AddCircleRoundedIcon />
          </IconButton>
        ) : undefined}
      </Stack>
    </Stack>
  );
};

export default memo(UploadFile);
