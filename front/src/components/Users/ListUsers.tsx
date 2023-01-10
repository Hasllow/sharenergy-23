import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AlertColor, Button, List } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { deleteUser } from "../../api/Users/deleteUser";
import { getUsers } from "../../api/Users/getUsers";

import ContainerLayout from "../../layout/ContainerLayout";
import DeleteDialog from "./DeleteDialog";
import FeedbackAlert from "./FeedbackAlert";

import FormUsers from "./FormUsers";
import ListItemUser from "./ListItemUser";
import { UserType } from "./types/UserTypes";

const ListUsers = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [users, setUsers] = useState<UserType[] | undefined>([]);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  //Feedback States
  const [openFeedBackAlert, setOpenFeedbackAlert] = useState<boolean>(false);
  const [typeFeedBack, setTypeFeedBack] = useState<AlertColor>("error");
  const [messageFeedback, setMessageFeedback] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
    setOpenDeleteModal(false);
    setOpenFeedbackAlert(false);
  };
  const handleAddUser = () => {
    setEditStatus(false);
    setUserInfo(null);
    setOpen((prev) => !prev);
  };
  const handleEditUser = (user: UserType) => {
    setEditStatus(true);
    setUserInfo(user);
    setOpen((prev) => !prev);
  };

  const handleDeleteUser = (user: UserType) => {
    setUserInfo(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async (id: string) => {
    const res = await deleteUser(id);
    setMessageFeedback(res.detail);
    setOpenFeedbackAlert(true);
    res.status === 200 ? setTypeFeedBack("success") : setTypeFeedBack("error");

    fetchUsers();
  };

  const fetchUsers = async () => {
    const usersFromApi = await getUsers();
    if (usersFromApi.data) setUsers(usersFromApi.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const listUsers =
    users &&
    users.map((user) => (
      <ListItemUser user={user} onClickEdit={handleEditUser} onClickDelete={handleDeleteUser} key={user.id} />
    ));

  return (
    <ContainerLayout>
      <Button
        variant={"contained"}
        endIcon={<AddCircleIcon />}
        size={"large"}
        onClick={handleAddUser}
        sx={{ marginBottom: "24px" }}
      >
        Add User
      </Button>
      {open ? (
        <FormUsers
          openForm={open}
          onCloseForm={handleClose}
          editStatus={editStatus}
          userInfo={userInfo}
          refreshUserInfo={fetchUsers}
        />
      ) : undefined}

      {openDeleteModal ? (
        <DeleteDialog
          openDeleteModal={openDeleteModal}
          onCloseModal={handleClose}
          onAgree={handleConfirmDelete}
          userInfo={userInfo}
        />
      ) : undefined}

      {openFeedBackAlert && <FeedbackAlert type={typeFeedBack} onCloseAlert={handleClose} message={messageFeedback} />}

      <Container maxWidth={"md"} sx={{ padding: 0 }}>
        <List sx={{ width: "100%" }}>{users && users.length > 0 && listUsers}</List>
      </Container>
    </ContainerLayout>
  );
};

export default ListUsers;
