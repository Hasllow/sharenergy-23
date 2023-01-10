import { UserType } from "../../components/Users/types/UserTypes";

export const isUserValid = (user: UserType) => {
  if (
    user.name.length < 1 ||
    user.email.length < 3 ||
    user.cpf.length < 11 ||
    user.phone.length < 11 ||
    user.address.street.length < 5 ||
    user.address.city.length < 2 ||
    user.address.state.length < 1 ||
    user.address.zip.length < 8
  )
    return false;
  return true;
};
