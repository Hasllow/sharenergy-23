import { UserType } from "../../../components/Users/types/UserTypes";
import { cleanString } from "./cleanString";

const cleanUser = (user: UserType): UserType => {
  const cpfCleaned = cleanString(user.cpf);
  const phoneCleaned = cleanString(user.phone);
  const zipCleaned = cleanString(user.address.zip);

  const userClean: UserType = {
    ...user,
    cpf: cpfCleaned,
    phone: phoneCleaned,
    address: {
      ...user.address,
      zip: zipCleaned,
    },
  };

  return userClean;
};

export default cleanUser;
