import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ListItem, ListItemButton, ListItemIcon, Paper } from "@mui/material";

import CardUser from "./CardUser";
import { ListItemUserProps } from "./types/UserTypes";

import styles from "./ListItemUser.module.css";

const ListItemUser = ({ user, onClickEdit, onClickDelete }: ListItemUserProps) => {
  const handleOnClickEdit = () => {
    onClickEdit(user);
  };

  const handleOnClickDelete = () => {
    onClickDelete(user);
  };
  return (
    <ListItem key={user.id} sx={{ padding: 0, flexDirection: "column", alignItems: "stretch", marginBottom: "12px" }}>
      <Paper elevation={3} sx={{ display: "flex", padding: "16px 8px", color: "primary.main" }}>
        <CardUser user={user} />
        <div className={styles.buttonsList}>
          <ListItemButton onClick={handleOnClickEdit}>
            <ListItemIcon sx={{ justifyContent: "center" }}>
              <EditIcon color={"info"} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={handleOnClickDelete}>
            <ListItemIcon sx={{ justifyContent: "center" }}>
              <DeleteIcon color={"error"} />
            </ListItemIcon>
          </ListItemButton>
        </div>
      </Paper>
    </ListItem>
  );
};

export default ListItemUser;
