import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import ProfileRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";

const NavigationBottom = () => {
  return (
    <Stack
      id="tab-bar"
      direction="row"
      justifyContent="space-around"
      spacing={1}
      sx={{
        display: { xs: "flex", sm: "none" },
        zIndex: "999",
        bottom: 0,
        position: "fixed",
        width: "100dvw",
        py: 2,
        backgroundColor: "background.body",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Button
        variant="plain"
        color="neutral"
        component="a"
        href="/profile"
        size="sm"
        startDecorator={<ProfileRoundedIcon />}
        sx={{ flexDirection: "column", "--Button-gap": 0 }}
      >
        Профиль
      </Button>
      <Button
        variant="plain"
        color="neutral"
        component="a"
        href="/postiki/"
        size="sm"
        startDecorator={<EmailRoundedIcon />}
        sx={{ flexDirection: "column", "--Button-gap": 0 }}
      >
        Постики
      </Button>
      <Button
        variant="plain"
        color="neutral"
        component="a"
        href="/messages/"
        size="sm"
        startDecorator={<QuestionAnswerRoundedIcon />}
        sx={{ flexDirection: "column", "--Button-gap": 0 }}
      >
        Сообщения
      </Button>
      <Button
        variant="plain"
        color="neutral"
        aria-pressed="true"
        component="a"
        href="/subscribes/"
        size="sm"
        startDecorator={<FolderRoundedIcon />}
        sx={{ flexDirection: "column", "--Button-gap": 0 }}
      >
        Подписки
      </Button>
    </Stack>
  );
};

export default NavigationBottom;
