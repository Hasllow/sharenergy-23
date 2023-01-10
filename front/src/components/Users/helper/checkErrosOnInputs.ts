import { UserType } from "../types/UserTypes";

export type ErrorsOnInput = {
  name: boolean;
  email: boolean;
  cpf: boolean;
  phone: boolean;
  id: boolean;
  address: {
    street: boolean;
    city: boolean;
    state: boolean;
    zip: boolean;
  };
};

export type ReturnCheckErrosOnInputs = {
  userErrors: ErrorsOnInput;
  haveError: boolean;
};

const checkErrosOnInputs = (userInfo: UserType): ReturnCheckErrosOnInputs => {
  const errorsOnInput: ReturnCheckErrosOnInputs = {
    userErrors: {
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
    },
    haveError: false,
  };

  if (userInfo.name.length < 2) {
    errorsOnInput.userErrors.name = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.email.length < 2) {
    errorsOnInput.userErrors.email = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.cpf.length < 14) {
    errorsOnInput.userErrors.cpf = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.phone.length < 15) {
    errorsOnInput.userErrors.phone = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.address.street.length < 5) {
    errorsOnInput.userErrors.address.street = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.address.city.length < 2) {
    errorsOnInput.userErrors.address.city = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.address.state.length < 2) {
    errorsOnInput.userErrors.address.state = true;
    errorsOnInput.haveError = true;
  }

  if (userInfo.address.zip.length < 9) {
    errorsOnInput.userErrors.address.zip = true;
    errorsOnInput.haveError = true;
  }

  return errorsOnInput;
};

export default checkErrosOnInputs;
