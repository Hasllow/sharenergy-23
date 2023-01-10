import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserType } from "./types/UserTypes";

type DeleteModalType = {
  userInfo: UserType | null;
  openDeleteModal: boolean;
  onCloseModal: () => void;
  onAgree: (id: string) => void;
};

export default function DeleteDialog({ openDeleteModal, onCloseModal, onAgree, userInfo }: DeleteModalType) {
  const handleClose = () => {
    onCloseModal();
  };

  const handleAgree = () => {
    userInfo && userInfo.id && onAgree(userInfo.id);
    onCloseModal();
  };

  return (
    <Dialog
      open={openDeleteModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete ${userInfo?.name} info?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will delete permanently all the information about the user.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
