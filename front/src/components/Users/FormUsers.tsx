import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { createUser } from "../../api/Users/createUser";
import { updateUser } from "../../api/Users/updateUser";
import FeedbackAlert from "./FeedbackAlert";
import arrayOfInputsWithErrors from "./helper/arrayOfInputsWithErrors";

import checkErrosOnInputs, { ErrorsOnInput } from "./helper/checkErrosOnInputs";
import { transformZipString } from "./helper/transformAddressString";
import transformCpfString from "./helper/transformCpfString";
import transformPhoneString from "./helper/transformPhoneString";
import { FormType, UserType } from "./types/UserTypes";

const FormUsers = ({ openForm, onCloseForm, editStatus, userInfo, refreshUserInfo }: FormType) => {
  const emptyUser: UserType = {
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  };

  const initialErroState = {
    name: false,
    email: false,
    cpf: false,
    phone: false,
    id: false,
    address: {
      street: false,
      city: false,
      state: false,
      zip: false,
    },
  };

  const [user, setUser] = useState<UserType>(userInfo ? userInfo : emptyUser);
  const [errorState, setErrorState] = useState<ErrorsOnInput>(initialErroState);
  const onError = useRef(false);

  //Feedback States
  const [openFeedBackAlert, setOpenFeedbackAlert] = useState<boolean>(false);
  const [typeFeedBack, setTypeFeedBack] = useState<AlertColor>("error");
  const [messageFeedback, setMessageFeedback] = useState<string | undefined>(undefined);

  //Feedback callbacks
  const handleCloseFeedbackAlert = () => {
    setOpenFeedbackAlert(false);
    if (typeFeedBack === "success") {
      onCloseForm();
      refreshUserInfo();
    }
  };

  useEffect(() => {
    if (userInfo) {
      setUser((prevState) => {
        return {
          ...prevState,
          cpf: transformCpfString(prevState.cpf),
          phone: transformPhoneString(prevState.phone),
          address: { ...prevState.address, zip: transformZipString(prevState.address.zip) },
        };
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (arrayOfInputsWithErrors(errorState).length === 0) setOpenFeedbackAlert(false);
  }, [errorState]);

  const handleCancel = () => {
    setErrorState(initialErroState);
    setUser(emptyUser);
    onError.current = false;
    onCloseForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onError.current = false;

    const { userErrors, haveError } = checkErrosOnInputs(user);
    setErrorState(userErrors);
    onError.current = haveError;

    if (onError.current) {
      setOpenFeedbackAlert(true);
      setTypeFeedBack("error");
      return;
    }

    if (editStatus) {
      const res = await updateUser(user);
      setMessageFeedback(res.detail);
      setOpenFeedbackAlert(true);

      if (res.status === 200) setTypeFeedBack("success");
    } else {
      const res = await createUser(user);
      setMessageFeedback(res.detail);
      setOpenFeedbackAlert(true);

      if (res.status === 200) setTypeFeedBack("success");
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value });
    setErrorState({ ...errorState, name: false });
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: event.target.value });
    setErrorState({ ...errorState, email: false });
  };

  const onCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, cpf: event.target.value });
    setErrorState({ ...errorState, cpf: false });
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, phone: event.target.value });
    setErrorState({ ...errorState, phone: false });
  };

  const onStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, address: { ...user.address, street: event.target.value } });
    setErrorState({ ...errorState, address: { ...errorState.address, street: false } });
  };

  const onCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, address: { ...user.address, city: event.target.value } });
    setErrorState({ ...errorState, address: { ...errorState.address, city: false } });
  };

  const onStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, address: { ...user.address, state: event.target.value } });
    setErrorState({ ...errorState, address: { ...errorState.address, state: false } });
  };

  const onZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, address: { ...user.address, zip: event.target.value } });
    setErrorState({ ...errorState, address: { ...errorState.address, zip: false } });
  };

  return (
    <>
      <Dialog open={openForm} onClose={onCloseForm}>
        {openFeedBackAlert && (
          <FeedbackAlert
            type={typeFeedBack}
            onCloseAlert={handleCloseFeedbackAlert}
            userErrors={errorState}
            message={messageFeedback}
          />
        )}

        {typeFeedBack !== "success" && (
          <>
            <DialogTitle>{editStatus ? "Edit User" : "Add User"}</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText>
                  {editStatus ? `Edit ${user.name} info.` : "Fill the form to add a new user."}
                </DialogContentText>

                <TextField
                  variant="standard"
                  label={"Name"}
                  value={user.name}
                  onChange={onNameChange}
                  fullWidth
                  margin="dense"
                  required
                  error={errorState.name}
                />
                <TextField
                  variant="standard"
                  label={"Email"}
                  value={user.email}
                  onChange={onEmailChange}
                  type="email"
                  fullWidth
                  margin="dense"
                  required
                  error={errorState.email}
                />
                <InputMask mask="999.999.999-99" maskPlaceholder="" value={user.cpf} onChange={onCPFChange}>
                  <TextField
                    variant="standard"
                    fullWidth
                    margin="dense"
                    label={"Cpf"}
                    required
                    error={errorState.cpf}
                  />
                </InputMask>
                <InputMask mask="(99) 99999-9999" maskPlaceholder="" value={user.phone} onChange={onPhoneChange}>
                  <TextField
                    variant="standard"
                    label={"Phone"}
                    fullWidth
                    margin="dense"
                    required
                    error={errorState.phone}
                  />
                </InputMask>
                <TextField
                  variant="standard"
                  label={"Street"}
                  value={user.address.street}
                  onChange={onStreetChange}
                  fullWidth
                  margin="dense"
                  required
                  error={errorState.address.street}
                />
                <TextField
                  variant="standard"
                  label={"City"}
                  value={user.address.city}
                  onChange={onCityChange}
                  fullWidth
                  margin="dense"
                  required
                  error={errorState.address.city}
                />
                <InputMask mask="aa" maskPlaceholder="" value={user.address.state} onChange={onStateChange}>
                  <TextField
                    variant="standard"
                    label={"State"}
                    fullWidth
                    margin="dense"
                    required
                    error={errorState.address.state}
                  />
                </InputMask>
                <InputMask mask="99999-999" maskPlaceholder="" value={user.address.zip} onChange={onZipChange}>
                  <TextField
                    variant="standard"
                    label={"Zip Code"}
                    fullWidth
                    margin="dense"
                    required
                    error={errorState.address.zip}
                  />
                </InputMask>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit}>
                  {editStatus ? "Edit" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </>
        )}
      </Dialog>
    </>
  );
};

export default FormUsers;
