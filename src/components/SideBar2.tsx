import { Button, List, ListItem, ListItemButton } from "@mui/joy";
import { useAuth } from "../lib/hooks/useAuth";
import Link from "next/link";
import { memo } from "react";

const SideBar2 = () => {
  const auth = useAuth();
  return (
    <List>
      {auth.user ? (
        <ListItem>
          <Button component={Link} href="/postik/add" className="action-button">
            Добавить постик
          </Button>
          <button className="action-button">dasd</button>
        </ListItem>
      ) : (
        ""
      )}
    </List>
  );
};

export default memo(SideBar2);
